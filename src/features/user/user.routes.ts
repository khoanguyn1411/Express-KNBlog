import { Router } from "express";

import { userUpdateDtoSchema } from "@/core/dtos/user.dto";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";
import { validateRequestBodyWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { UserController } from "./controllers/user.controller";

const router = Router();
router.get(routePaths.users.children.profile.url, UserController.getProfile);
router.get(routePaths.users.url, UserController.getUsers);
router.get(routePaths.users.children.detail.url, UserController.getUserById);
router.post(
  routePaths.users.children.detail.url,
  requireAuthorizationMiddleware,
  validateRequestBodyWithSchema(userUpdateDtoSchema),
  UserController.updateUser,
);

export const userRoutes = router;
