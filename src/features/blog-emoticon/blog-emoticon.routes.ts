import { Router } from "express";

import { blogEmoticonCreationDtoSchema } from "@/core/dtos/blog-emoticon.dto";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";
import { routePaths } from "@/routes/route-paths";
import { validateRequestBodyWithSchema } from "@/utils/funcs/validate-request";

import { BlogEmoticonController } from "./controllers/blog-emoticon.controller";

const router = Router();

router.post(
  routePaths.blogEmoticon.url,
  validateRequestBodyWithSchema(blogEmoticonCreationDtoSchema),
  BlogEmoticonController.addEmoticon,
);
router.delete(routePaths.blogEmoticon.children.detail.url, BlogEmoticonController.removeEmoticon);

export const blogEmoticonRoutes = router.all("*", requireAuthorizationMiddleware);
