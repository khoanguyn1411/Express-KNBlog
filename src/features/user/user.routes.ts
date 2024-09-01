import { Router } from "express";

import { routePaths } from "../../routes/route-paths";
import { UserController } from "./controllers/user.controller";

const router = Router();
router.get(routePaths.users.children.profile.url, UserController.getProfile);
router.get(routePaths.users.url, UserController.getUsers);

export const userRoutes = router;
