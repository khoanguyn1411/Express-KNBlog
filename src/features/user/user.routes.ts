import { Router } from "express";

import { userUpdateDtoSchema } from "@/core/dtos/user.dto";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";
import {
  validateParamObjectId,
  validateRequestBodyWithSchema,
} from "@/utils/funcs/validate-request";

import { PARAM_NAME, routePaths } from "../../routes/route-paths";
import { UserController } from "./controllers/user.controller";

const router = Router();

router.get(routePaths.users.children.profile.url, UserController.getProfile);

router.get(routePaths.users.url, UserController.getUsers);
router.get(
  routePaths.users.children.detail.url,
  validateParamObjectId(PARAM_NAME.USER_ID_PARAM_NAME),
  UserController.getUserById,
);
router.post(
  routePaths.users.children.detail.url,
  requireAuthorizationMiddleware,
  validateParamObjectId(PARAM_NAME.USER_ID_PARAM_NAME),
  validateRequestBodyWithSchema(userUpdateDtoSchema),
  UserController.updateUser,
);

export const userRoutes = router;
