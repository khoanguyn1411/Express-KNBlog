import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { BlogController } from "./controllers/blog.controller";
import { BlogMiddleware } from "./middlewares/blog.middleware";

const router = Router();
router.get(routePaths.blogs.url, BlogController.getBlogs);
router.post(routePaths.blogs.url, BlogMiddleware.createBlog, BlogController.createBlog);

export const blogRoutes = router;
