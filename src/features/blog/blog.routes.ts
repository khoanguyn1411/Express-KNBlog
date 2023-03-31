import { Router } from "express";

import { BlogController } from "./controllers/blog-controller";

const router = Router();
router.get("/blogs/", BlogController.getBlogs);

export const blogRoutes = router;
