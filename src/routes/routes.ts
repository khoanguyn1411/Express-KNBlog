import { Express, Router } from "express";

import { authRoutes } from "@/features/authorization/auth.routes";
import { requireAuthorization } from "@/middlewares/require-authorization.middleware";

import { blogRoutes } from "../features/blog/blog.routes";
import { userRoutes } from "../features/user/user.routes";

const router = Router();
const allRoutesGuards = router.all("*", requireAuthorization);

export function connectRoutes(app: Express) {
  const routes = [allRoutesGuards, userRoutes, blogRoutes, authRoutes];
  app.use(...routes);
}
