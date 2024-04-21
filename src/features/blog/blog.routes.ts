import { Router } from "express";

import { blogCreationDtoSchema } from "@/core/dtos/blog.dto";
import { validateRequestWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { BlogController } from "./controllers/blog.controller";

const router = Router();
router.get(routePaths.blogs.url, BlogController.getBlogs);
router.post(
  routePaths.blogs.url,
  validateRequestWithSchema(blogCreationDtoSchema),
  BlogController.createBlog,
);

export const blogRoutes = router;
