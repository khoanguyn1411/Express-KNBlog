import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { AuthController } from "./controllers/auth.controller";
import { TokenController } from "./controllers/token.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { TokenMiddleware } from "./middlewares/token.middleware";

const router = Router();
const authUrl = routePaths.auth.children;

router.post(authUrl.login.url, AuthMiddleware.login, AuthController.login);
router.post(authUrl.token.children.refresh.url, TokenMiddleware.refresh, TokenController.refresh);

export const authRoutes = router;
