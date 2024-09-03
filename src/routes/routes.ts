import { Express } from "express";

import { authRoutes } from "@/features/authorization/auth.routes";
import { uploadRoutes } from "@/features/file-uploader/file-uploader.routes";

import { blogRoutes } from "../features/blog/blog.routes";
import { userRoutes } from "../features/user/user.routes";

export function connectRoutes(app: Express) {
  const routes = [userRoutes, blogRoutes, authRoutes, uploadRoutes];
  app.use(routes);
}
