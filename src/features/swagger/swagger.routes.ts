import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import { routePaths } from "@/routes/route-paths";

// Swagger definition
const swaggerDefinition: swaggerJSDoc.Options["swaggerDefinition"] = {
  openapi: "3.0.0",
  info: {
    title: "My Express API",
    version: "1.0.0",
    description: "API documentation for my Express application",
  },
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc({ swaggerDefinition, apis: ["./features/*.routes.ts"] });

const router = Router();

router.use(routePaths.docs.url, serve, setup(swaggerSpec));

export const swaggerRoutes = router.all("*");
