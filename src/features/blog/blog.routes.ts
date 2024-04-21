import { Router } from "express";

import { blogCreationDtoSchema } from "@/core/dtos/blog.dto";
import { validateRequestBodyWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { BlogController } from "./controllers/blog.controller";
import { BlogMiddleware } from "./middlewares/blog.middleware";

const router = Router();
router.get(routePaths.blogs.url, BlogMiddleware.getBlogs, BlogController.getBlogs);
router.post(
  routePaths.blogs.url,
  validateRequestBodyWithSchema(blogCreationDtoSchema),
  BlogController.createBlog,
);

export const blogRoutes = router;
