import { Router } from "express";

import { blogCreationDtoSchema, blogQueryDtoSchema } from "@/core/dtos/blog.dto";
import { blogsHaveEmoticonsQueryDtoSchema } from "@/core/dtos/blogs-have-emoticons-query.dto";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";
import {
  validateParamObjectId,
  validateRequestBodyWithSchema,
  validateRequestQueryWithSchema,
} from "@/utils/funcs/validate-request";

import { PARAM_NAME, routePaths } from "../../routes/route-paths";
import { BlogController } from "./controllers/blog.controller";

const router = Router();

router.get(
  routePaths.blogs.url,
  validateRequestQueryWithSchema(blogQueryDtoSchema),
  BlogController.getBlogs,
);
router.get(
  routePaths.blogs.children.blogsHaveEmoticons.url,
  requireAuthorizationMiddleware,
  validateRequestQueryWithSchema(blogsHaveEmoticonsQueryDtoSchema),
  BlogController.getBlogsHaveEmoticons,
);

// Need to move dynamic URL to the bottom of all the route, to avoid Express understand the others as an dynamic URL.
router.get(
  routePaths.blogs.children.detail.url,
  validateParamObjectId(PARAM_NAME.BLOG_ID_PARAM_NAME),
  BlogController.getBlogById,
);

router.post(
  routePaths.blogs.url,
  requireAuthorizationMiddleware,
  validateRequestBodyWithSchema(blogCreationDtoSchema),
  BlogController.createBlog,
);

export const blogRoutes = router;
