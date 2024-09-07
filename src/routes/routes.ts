import { Express } from "express";

import { authRoutes } from "@/features/authorization/auth.routes";
import { blogEmoticonRoutes } from "@/features/blog-emoticon/blog-emoticon.routes";
import { uploadRoutes } from "@/features/file-uploader/file-uploader.routes";
import { swaggerRoutes } from "@/features/swagger/swagger.routes";

import { blogRoutes } from "../features/blog/blog.routes";
import { userRoutes } from "../features/user/user.routes";

export function connectRoutes(app: Express) {
  const routes = [
    userRoutes,
    blogRoutes,
    authRoutes,
    uploadRoutes,
    blogEmoticonRoutes,
    swaggerRoutes,
  ];
  app.use(routes);
}
