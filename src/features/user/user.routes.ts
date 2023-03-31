import { Router } from "express";

import { UserController } from "./controllers/user-controller";

const router = Router();
router.get("/user/profile/", UserController.getUserProfile);
export const userRoutes = router;
