import express from "express";

import { APP_PORT } from "./src/configs/app/app.config";
import { connectDb } from "./src/configs/db/connect-db";
import { connectRoutes } from "./src/routes/routes-path";

const app = express();

connectDb();
connectRoutes(app);

app.listen(APP_PORT, () => {
  console.log(`KNBlog is listening on port ${APP_PORT}`);
});
