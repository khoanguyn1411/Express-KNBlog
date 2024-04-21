import { Router } from "express";

import { validateRequestWithSchema } from "@/utils/funcs/validate-request";

import { routePaths } from "../../routes/route-paths";
import { AuthController } from "./controllers/auth.controller";
import { TokenController } from "./controllers/token.controller";
import { AuthSchema } from "./shemas/auth.schema";
import { TokenSchema } from "./shemas/token.schema";

const router = Router();
const authUrl = routePaths.auth.children;

router.post(authUrl.login.url, validateRequestWithSchema(AuthSchema.login), AuthController.login);
router.post(
  authUrl.token.children.refresh.url,
  validateRequestWithSchema(TokenSchema.refresh),
  TokenController.refresh,
);

export const authRoutes = router;
