import { Router } from "express";

import { blogEmoticonCreationDtoSchema } from "@/core/dtos/blog-emoticon.dto";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";
import { PARAM_NAME, routePaths } from "@/routes/route-paths";
import {
  validateParamObjectId,
  validateRequestBodyWithSchema,
} from "@/utils/funcs/validate-request";

import { BlogEmoticonController } from "./controllers/blog-emoticon.controller";

const router = Router();

router.post(
  routePaths.blogEmoticon.url,
  validateRequestBodyWithSchema(blogEmoticonCreationDtoSchema),
  BlogEmoticonController.addEmoticon,
);
router.delete(
  routePaths.blogEmoticon.children.detail.url,
  validateParamObjectId(PARAM_NAME.BLOG_ID_PARAM_NAME),
  BlogEmoticonController.removeEmoticon,
);

export const blogEmoticonRoutes = router.all("*", requireAuthorizationMiddleware);
