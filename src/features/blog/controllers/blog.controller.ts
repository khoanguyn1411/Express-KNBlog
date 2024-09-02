import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { BlogDB, MBlog } from "@/core/db-models/blog.db";
import { BlogCreationDto, BlogQueryDto } from "@/core/dtos/blog.dto";
import { blogMapper } from "@/core/mapper/blog.mapper";
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

    const filters = createFilters<MBlog>({
      title: searchService.createSearchFor(queryParamFromDto.search),
      writtenBy: queryParamFromDto.userId,
    });

    const pagination = await createPagination(() => {
      return BlogDB.Model.find(filters).populate(BlogDB.ShortPopulation);
    }, queryParamFromDto);

    res.status(SuccessCode.Accepted).send(pagination);
  }

  export async function getBlogById(
    req: AppRequest<unknown, unknown, ParamName>,
    res: Response<MBlog | ResponseErrorType>,
  ): Promise<void> {
    const blog = await BlogDB.Model.findById(req.params.blogId).populate(BlogDB.ShortPopulation);
    if (blog == null) {
      res
        .status(ErrorCode.NotFound)
        .send(generateErrorWithCode(ErrorCode.NotFound, { nonFieldErrors: ["Invalid blog ID."] }));
      return;
    }
    res.status(SuccessCode.Accepted).send(blog);
  }
}
