import { Express } from "express";

import { userRoutes } from "../features/user/user.routes";

export function connectRoutes(app: Express) {
  return app.use(userRoutes);
}
