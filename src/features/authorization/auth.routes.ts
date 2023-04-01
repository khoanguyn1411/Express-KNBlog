import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { AuthController } from "./controllers/auth-controller";

const router = Router();
router.post(routePaths.auth.children.login.url, AuthController.login);

export const authRoutes = router;
