import bodyParser from "body-parser";
import express from "express";

import { connectEnv } from "@/configs/connect-env";

import { APP_PORT } from "./src/configs/app/app.config";
import { addCors } from "./src/configs/cors/add-cors";
import { connectDatabase } from "./src/configs/db/connect-database";
import { connectRoutes } from "./src/routes/routes";

connectEnv();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDatabase();
connectRoutes(app);
addCors(app);

app.listen(APP_PORT, () => {
  console.info(`KNBlog is listening on port ${APP_PORT}`);
});
