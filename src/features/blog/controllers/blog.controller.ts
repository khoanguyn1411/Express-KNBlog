import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { BlogCreationDto, BlogParamDto, BlogQueryDto } from "@/core/dtos/blog.dto";
import { blogMapper } from "@/core/mapper/blog.mapper";
import { Blog, IBlog } from "@/core/models/blog";
import { Pagination } from "@/core/models/pagination";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { mapAndCreatePaginationFor } from "@/utils/funcs/map-and-create-pagination";
import { AppRequest } from "@/utils/types/request";

export namespace BlogController {
  export async function createBlog(
    req: AppRequest<BlogCreationDto>,
    res: Response<IBlog | ResponseErrorType<IBlog>>,
  ): Promise<void> {
    const user = await tokenHandlerService.decodeAccessTokenFromHeader(req);
    assertNonNull(user);
    const blogCreationData = blogMapper.fromCreationDto(req.body);
    const newBlog = await Blog.Model.create({ ...blogCreationData, writtenBy: user._id });
    const blogData = await newBlog.populate(Blog.ShortPopulation);
    res.status(SuccessCode.Created).send(blogData);
  }

  export async function getBlogs(
    req: AppRequest<unknown, BlogQueryDto>,
    res: Response<Pagination<IBlog>>,
  ): Promise<void> {
    const pagination = await mapAndCreatePaginationFor(
      () => Blog.Model.find({}).populate(Blog.ShortPopulation),
      req,
    );
    res.status(SuccessCode.Accepted).send(pagination);
  }

  export async function getBlog(
    req: AppRequest<unknown, unknown, BlogParamDto>,
    res: Response<IBlog | ResponseErrorType>,
  ): Promise<void> {
    const blog = await Blog.Model.findById(req.params.blogId).populate(Blog.ShortPopulation);
    if (blog == null) {
      res
        .status(ErrorCode.NotFound)
        .send(generateErrorWithCode(ErrorCode.NotFound, { nonFieldError: "Invalid blog ID." }));
      return;
    }
    res.status(SuccessCode.Accepted).send(blog);
  }
}
