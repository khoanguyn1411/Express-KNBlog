import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { BlogController } from "./controllers/blog-controller";

const router = Router();
router.get(routePaths.blogs.url, BlogController.getBlogs);

export const blogRoutes = router;
