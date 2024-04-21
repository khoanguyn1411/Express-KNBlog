import Joi from "joi";

import { BlogDto } from "@/core/dtos/blog.dto";

export namespace BlogSchema {
  export const createBlog = Joi.object<BlogDto>({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
}
