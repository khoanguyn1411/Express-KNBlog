import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { AuthController } from "./controllers/auth-controller";
import { TokenController } from "./controllers/token-controller";

const router = Router();
const authUrl = routePaths.auth.children;
router.post(authUrl.login.url, AuthController.login);
router.post(authUrl.token.children.refresh.url, TokenController.refresh);

export const authRoutes = router;
