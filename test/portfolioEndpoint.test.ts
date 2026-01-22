import request from "supertest";
// import supertest request object

import { Response } from "supertest";
// import supertest Response type

import app from "../src/app";
// import express application and server

describe("GET /api/v1/portfolio/performance", () => {
  it("should return portfolio calculation results", async () => {
    // create GET request with valid query parameters
    const response: Response = await request(app)
      .get("/api/v1/portfolio/performance")
      .query({ initialInvestment: 10000, currentValue: 12000 });

    // assert response status OK and result object to have specified properties
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("profitOrLoss");
    expect(response.body).toHaveProperty("percentageChange");
    expect(response.body).toHaveProperty("performanceSummary");
  });

  it("should return 400 for invalid input", async () => {
    // create GET request with invalid query parameters
    const response: Response = await request(app)
      .get("/api/v1/portfolio/performance")
      .query({ initialInvestment: 0, currentValue: 12000 });

    // assert bad request response
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
