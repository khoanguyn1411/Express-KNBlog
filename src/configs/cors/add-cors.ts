import cors from "cors";
import { Express } from "express";

export function addCors(app: Express) {
  app.use(cors());
}
