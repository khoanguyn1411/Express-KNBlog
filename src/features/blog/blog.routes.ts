import { Router } from "express";

import { blogCreationDtoSchema, blogQueryDtoSchema } from "@/core/dtos/blog.dto";
import {
  validateRequestBodyWithSchema,
  validateRequestQueryWithSchema,
} from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { BlogController } from "./controllers/blog.controller";

const router = Router();
router.get(
  routePaths.blogs.url,
  validateRequestQueryWithSchema(blogQueryDtoSchema),
  BlogController.getBlogs,
);
router.get(routePaths.blogDetail.url, BlogController.getBlogById);
router.post(
  routePaths.blogs.url,
  validateRequestBodyWithSchema(blogCreationDtoSchema),
  BlogController.createBlog,
);

export const blogRoutes = router;
