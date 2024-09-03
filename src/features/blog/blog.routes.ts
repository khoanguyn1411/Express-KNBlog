import { Router } from "express";

import { blogCreationDtoSchema, blogQueryDtoSchema } from "@/core/dtos/blog.dto";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";
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
router.get(routePaths.blogs.children.detail.url, BlogController.getBlogById);
router.post(
  routePaths.blogs.url,
  requireAuthorizationMiddleware,
  validateRequestBodyWithSchema(blogCreationDtoSchema),
  BlogController.createBlog,
);

export const blogRoutes = router;
