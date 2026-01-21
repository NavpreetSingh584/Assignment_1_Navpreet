import request from "supertest";
// import supertest request object

import { Response } from "supertest";
// import supertest Response type

import app from "../src/app";
// import express application and server

describe("POST /api/v1/portfolio/performance", () => {
  it("should return portfolio calculation results", async () => {
    // create POST request with valid payload
    const response: Response = await request(app)
      .post("/api/v1/portfolio/performance")
      .send({ initialInvestment: 10000, currentValue: 12000 });

    // assert response status OK and result object to have specified properties
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("profitOrLoss");
    expect(response.body).toHaveProperty("percentageChange");
    expect(response.body).toHaveProperty("performanceSummary");
  });

  it("should return 400 for invalid input", async () => {
    // create POST request with invalid payload
    const response: Response = await request(app)
      .post("/api/v1/portfolio/performance")
      .send({ initialInvestment: 0, currentValue: 12000 });

    // assert bad request response
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
