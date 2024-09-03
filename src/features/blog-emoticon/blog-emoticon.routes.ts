import { Router } from "express";

import { routePaths } from "@/routes/route-paths";

import { BlogEmoticonController } from "./controllers/blog-emoticon.controller";

const router = Router();

router.get(routePaths.blogEmoticon.url, BlogEmoticonController.addEmoticon);
router.get(routePaths.blogEmoticon.url, BlogEmoticonController.removeEmoticon);

export const blogEmoticonRoutes = router;
