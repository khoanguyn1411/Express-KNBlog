import { Response } from "express";
import { ObjectId } from "mongodb";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { BlogDB, MBlog } from "@/core/db-models/blog.db";
import { BlogEmoticonDB } from "@/core/db-models/blog-emoticon.db";
import { BlogCreationDto, BlogQueryDto } from "@/core/dtos/blog.dto";
import { blogMapper } from "@/core/mapper/blog.mapper";
import { BlogsHaveEmoticonsQuery } from "@/core/models/blogs-have-emoticons-query";
import { Pagination } from "@/core/models/pagination";
import { ParamName } from "@/routes/route-paths";
import { searchService } from "@/services/search.service";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { createFilters } from "@/utils/funcs/create-filters";
import { createPagination } from "@/utils/funcs/create-pagination";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { AppRequest } from "@/utils/types/request";

export namespace BlogController {
  export async function createBlog(
    req: AppRequest<BlogCreationDto>,
    res: Response<MBlog | ResponseErrorType<MBlog>>,
  ): Promise<void> {
    const user = await tokenHandlerService.getUserFromHeaderToken(req);
    assertNonNull(user);
    const blogCreationData = blogMapper.fromCreationDto(req.body);
    const newBlog = await BlogDB.Model.create({ ...blogCreationData, writtenBy: user._id });
    const blogData = await newBlog.populate(BlogDB.ShortPopulation);
    res.status(SuccessCode.Created).send(blogData);
  }

  export async function getBlogs(
    req: AppRequest<unknown, BlogQueryDto>,
    res: Response<Pagination<MBlog>>,
  ): Promise<void> {
    const queryParamFromDto = blogMapper.fromQueryDto(req.query);
    const user = await tokenHandlerService.getUserFromHeaderToken(req);

    const filters = createFilters<MBlog>({
      ...searchService.builtFullTextSearchQuery(queryParamFromDto.search),
      writtenBy: queryParamFromDto.userId ? new ObjectId(queryParamFromDto.userId) : null,
    });

    const pagination = await createPagination(() => {
      return BlogDB.Model.find(filters, undefined, { lean: true }).populate(BlogDB.ShortPopulation);
    }, queryParamFromDto);

    const aggregatedResults = await Promise.all(
      pagination.results.map((blog) => BlogDB.getAggregatedResult(blog, user)),
    );

    res.status(SuccessCode.Accepted).send({ ...pagination, results: aggregatedResults });
  }

  export async function getBlogById(
    req: AppRequest<unknown, unknown, ParamName>,
    res: Response<MBlog | ResponseErrorType>,
  ): Promise<void> {
    const blog = await BlogDB.Model.findById(req.params.blogId, undefined, { lean: true }).populate(
      BlogDB.ShortPopulation,
    );
    const user = await tokenHandlerService.getUserFromHeaderToken(req);

    if (blog == null) {
      res
        .status(ErrorCode.NotFound)
        .send(generateErrorWithCode({ code: ErrorCode.NotFound, message: "Blog not found." }));
      return;
    }
    const aggregatedResult = await BlogDB.getAggregatedResult(blog, user);
    res.status(SuccessCode.Accepted).send(aggregatedResult);
  }

  export async function getBlogsHaveEmoticons(
    req: AppRequest<unknown, BlogsHaveEmoticonsQuery>,
    res: Response<MBlog["_id"][]>,
  ): Promise<void> {
    const user = await tokenHandlerService.getUserFromHeaderToken(req);
    assertNonNull(user);

    const blogsId = req.query.blogIds;

    const emoticonRequests = await Promise.all(
      blogsId.map((blogId) =>
        BlogEmoticonDB.Model.findOne({ blog: blogId, user: user._id }, undefined, { lean: true }),
      ),
    );

    const cleanedEmoticons = emoticonRequests
      .filter((emoticon) => emoticon != null)
      .map((emoticon) => {
        assertNonNull(emoticon);
        return emoticon.blog._id;
      });

    res.status(SuccessCode.Accepted).send(cleanedEmoticons);
  }
}
