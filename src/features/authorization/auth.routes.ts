import { Router } from "express";

import { loginDtoSchema } from "@/core/dtos/login.dto";
import { refreshTokenDtoSchema } from "@/core/dtos/token.dto";
import { validateRequestBodyWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { AuthController } from "./controllers/auth.controller";
import { TokenController } from "./controllers/token.controller";

const router = Router();
const authUrl = routePaths.auth.children;

router.post(authUrl.login.url, validateRequestBodyWithSchema(loginDtoSchema), AuthController.login);
router.post(authUrl.logout.url, AuthController.logout);
router.post(
  authUrl.token.children.refresh.url,
  validateRequestBodyWithSchema(refreshTokenDtoSchema),
  TokenController.refresh,
);

export const authRoutes = router;
