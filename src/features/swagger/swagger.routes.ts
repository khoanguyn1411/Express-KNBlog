/* eslint-disable prettier/prettier */
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

import { routePaths } from "@/routes/route-paths";

import SwaggerJson from "./swagger.json";

const router = Router();

/**
 * Use this config if want to use swagger as JS docs.
 * @see https://www.npmjs.com/package/swagger-jsdoc?activeTab=readme
 * @example
 */
  //   // Swagger definition
  // const swaggerDefinition: swaggerJSDoc.Options["definition"] = {
  //   openapi: "3.0.0",
  //   info: {
  //     title: "My Express API",
  //     version: "1.0.0",
  //     description: "API documentation for my Express application",
  //   },
  // };

  //   // Initialize swagger-jsdoc
  // const swaggerSpec = swaggerJSDoc({
  //   definition: swaggerDefinition,
  //   apis: ["../**/*.routes.ts"],
  // });
router.use(routePaths.docs.url, serve, setup(SwaggerJson));

export const swaggerRoutes = router.all("*");
