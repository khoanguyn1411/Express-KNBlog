import express from "express";

import { APP_PORT } from "./src/configs/app/app.config";
import { connectDatabase } from "./src/configs/db/connect-database";
import { connectRoutes } from "./src/routes/routes";

const app = express();

connectDatabase();
connectRoutes(app);

app.listen(APP_PORT, () => {
  console.log(`KNBlog is listening on port ${APP_PORT}`);
});
