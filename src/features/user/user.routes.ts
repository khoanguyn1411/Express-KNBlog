import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { UserController } from "./controllers/user.controller";

const router = Router();
router.get(routePaths.user.children.profile.url, UserController.getProfile);

export const userRoutes = router;
