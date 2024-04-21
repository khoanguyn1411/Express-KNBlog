import { Request, Response } from "express";

import { SuccessCode } from "@/configs/app/code.config";
import { BlogCreationDto } from "@/core/dtos/blog.dto";
import { blogMapper } from "@/core/mapper/blog.mapper";
import { Blog, IBlog } from "@/core/models/blog";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { ResponseErrorType } from "@/utils/funcs/generate-error";
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

  export async function getBlogs(_: Request, res: Response<IBlog[]>): Promise<void> {
    const blogs = await Blog.find({});
    res.status(SuccessCode.Accepted).send(blogs);
  }
}
