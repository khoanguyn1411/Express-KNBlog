import { Router } from "express";

import { userUpdateDtoSchema } from "@/core/dtos/user.dto";
import { validateRequestBodyWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { UserController } from "./controllers/user.controller";

const router = Router();
router.get(routePaths.users.children.profile.url, UserController.getProfile);
router.get(routePaths.users.url, UserController.getUsers);
router.post(
  routePaths.users.children.detail.url,
  validateRequestBodyWithSchema(userUpdateDtoSchema),
  UserController.updateUser,
);

export const userRoutes = router;
