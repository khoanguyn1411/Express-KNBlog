import bodyParser from "body-parser";
import express from "express";

import { connectEnv } from "@/configs/connect-env";

import { APP_PORT } from "./src/configs/app/app.config";
import { addCors } from "./src/configs/cors/add-cors";
import { connectDatabase } from "./src/configs/db/connect-database";
import { connectRoutes } from "./src/routes/routes";

// Init all environment variables.
connectEnv();

// Init app.
const app = express();

// Add CORS config to allow access from FE app.
addCors(app);

// Body parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect and run database.
connectDatabase();

// Add routes.
connectRoutes(app);

app.listen(APP_PORT, () => {
  console.info(`KNBlog is listening on port ${APP_PORT}`);
});
