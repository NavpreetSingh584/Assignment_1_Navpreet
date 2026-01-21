
import express, { Application, Request, Response } from "express";
// import express and types

import healthRoutes from "../src/api/v1/routes/healthRoutes";
// import health routes

import portfolioRoutes from "../src/api/v1/routes/portfolioRoutes";
// import portfolio routes

// Primary data type annotations
const apiVersion: string = "v1";

/**
 * Creates and configures the Express application
 * @returns Express Application
 */
const createApp = (): Application => {
  const app: Application = express();

  // middleware: parse JSON
  app.use(express.json());

  // root endpoint
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Hello, world!");
  });

  // mount API endpoints
  app.use(`/api/${apiVersion}/health`, healthRoutes);
  app.use(`/api/${apiVersion}/portfolio`, portfolioRoutes);

  return app;
};

const app: Application = createApp();

export default app;
