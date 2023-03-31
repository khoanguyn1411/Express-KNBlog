import express from "express";

import { APP_PORT } from "./src/configs/app.config";

const app = express();

app.listen(APP_PORT, () => {
  console.log(`KNBlog is listening on port ${APP_PORT}`);
});
