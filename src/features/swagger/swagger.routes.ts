import { Router } from "express";
import { version } from "package.json";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import { routePaths } from "@/routes/route-paths";

import SwaggerJson from "./swagger.json";

const router = Router();

// Swagger definition
const swaggerDefinition: swaggerJSDoc.Options["swaggerDefinition"] = {
  openapi: "3.0.0",
  info: {
    title: "KNBLOG API",
    version: version,
    description: "API documentation for KNBLOG backend application",
  },
};

/**
 * Use this config if want to use swagger as JS docs.
 * @see https://www.npmjs.com/package/swagger-jsdoc?activeTab=readme
 * @example
 */
// Initialize swagger-jsdoc
// const swaggerSpec = swaggerJSDoc({
//   definition: swaggerDefinition,
//   apis: ["../**/*.routes.ts"],
// });

router.use(routePaths.docs.url, serve, setup({ ...SwaggerJson, ...swaggerDefinition }));

export const swaggerRoutes = router.all("*");
