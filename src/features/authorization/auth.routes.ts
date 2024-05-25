import { Router } from "express";

import { GoogleLoginDataDtoSchema } from "@/core/dtos/google-login-data.dto";
import { LoginDataDtoSchema } from "@/core/dtos/login-data.dto";
import { RegisterDataDtoSchema } from "@/core/dtos/register-data.dto";
import { refreshTokenDtoSchema } from "@/core/dtos/token.dto";
import { validateRequestBodyWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { AuthController } from "./controllers/auth.controller";
import { TokenController } from "./controllers/token.controller";

const router = Router();
const authUrl = routePaths.auth.children;

router.post(
  authUrl.googleLogin.url,
  validateRequestBodyWithSchema(GoogleLoginDataDtoSchema),
  AuthController.loginWithGoogle,
);
router.post(
  authUrl.login.url,
  validateRequestBodyWithSchema(LoginDataDtoSchema),
  AuthController.login,
);
router.post(
  authUrl.register.url,
  validateRequestBodyWithSchema(RegisterDataDtoSchema),
  AuthController.register,
);
router.post(authUrl.logout.url, AuthController.logout);
router.post(
  authUrl.token.children.refresh.url,
  validateRequestBodyWithSchema(refreshTokenDtoSchema),
  TokenController.refresh,
);

export const authRoutes = router;
