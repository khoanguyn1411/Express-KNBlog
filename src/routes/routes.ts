import { Express } from "express";

import { authRoutes } from "@/features/authorization/auth.routes";

import { blogRoutes } from "../features/blog/blog.routes";
import { userRoutes } from "../features/user/user.routes";

export function connectRoutes(app: Express) {
  return app.use(userRoutes, blogRoutes, authRoutes);
}
