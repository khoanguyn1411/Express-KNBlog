import { Express, Router } from "express";

import { authRoutes } from "@/features/authorization/auth.routes";
import { uploadRoutes } from "@/features/file-uploader/file-uploader.routes";
import { requireAuthorizationMiddleware } from "@/middlewares/require-authorization.middleware";

import { blogRoutes } from "../features/blog/blog.routes";
import { userRoutes } from "../features/user/user.routes";

const router = Router();
const routesGuards = router.all("*", requireAuthorizationMiddleware);

export function connectRoutes(app: Express) {
  const routes = [userRoutes, blogRoutes, authRoutes, uploadRoutes];
  app.use(routesGuards, ...routes);
}
