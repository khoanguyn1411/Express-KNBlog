import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { BlogCreationDto, BlogParamDto } from "@/core/dtos/blog.dto";
import { PaginationDto } from "@/core/dtos/pagination.dto";
import { blogMapper } from "@/core/mapper/blog.mapper";
import { Blog, IBlog } from "@/core/models/blog";
import { Pagination } from "@/core/models/pagination";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { createPagination } from "@/utils/funcs/create-pagination";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { AppRequest } from "@/utils/types/request";

export namespace BlogController {
  export async function createBlog(
    req: AppRequest<BlogCreationDto>,
    res: Response<IBlog | ResponseErrorType<IBlog>>,
  ): Promise<void> {
    const user = await tokenHandlerService.decodeAccessTokenFromHeader(req);
    assertNonNull(user);
    const newBlog = await blogMapper.fromDto({ ...req.body, writtenBy: user._id }).save();
    res.status(SuccessCode.Created).send(newBlog);
  }

  export async function getBlogs(
    req: AppRequest<unknown, PaginationDto>,
    res: Response<Pagination<IBlog>>,
  ): Promise<void> {
    const pagination = await createPagination(() => Blog.find({}), req);
    res.status(SuccessCode.Accepted).send(pagination);
  }

  export async function getBlog(
    req: AppRequest<unknown, unknown, BlogParamDto>,
    res: Response<IBlog | ResponseErrorType>,
  ): Promise<void> {
    const blog = await Blog.findById(req.params.blogId);
    if (blog == null) {
      res
        .status(ErrorCode.NotFound)
        .send(generateErrorWithCode(ErrorCode.NotFound, { nonFieldError: "Invalid blog ID." }));
      return;
    }
    res.status(SuccessCode.Accepted).send(blog);
  }
}
