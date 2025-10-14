import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cross API",
      version: "1.0.0",
      description: "API documentation for the Cross fleet management system",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },

    ],
  },
  apis: ["./src/routes/*.ts"], // path to route files
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};