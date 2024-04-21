import { Router } from "express";

import { validateRequestWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { BlogController } from "./controllers/blog.controller";
import { BlogSchema } from "./shemas/blog.schema";

const router = Router();
router.get(routePaths.blogs.url, BlogController.getBlogs);
router.post(
  routePaths.blogs.url,
  validateRequestWithSchema(BlogSchema.createBlog),
  BlogController.createBlog,
);

export const blogRoutes = router;
