import { Router, Request, Response } from "express";
// import router + types

import { calculatePortfolioPerformance } from "../../../portfolio/portfolioPerformance";
// import function

// Primary data type annotations
const router: Router = Router();

/**
 * Parses query params into numbers
 * @param query - request query
 * @returns parsed values
 */
const parseQuery = (query: unknown): { initialInvestment: number; currentValue: number } => {
  const raw = query as { initialInvestment?: unknown; currentValue?: unknown };

  const initialInvestment: number = Number(raw.initialInvestment);
  const currentValue: number = Number(raw.currentValue);

  return { initialInvestment, currentValue };
};

/**
 * Validates input values
 * @param initialInvestment - initial amount
 * @param currentValue - current amount
 * @returns boolean
 */
const isValidInput = (initialInvestment: number, currentValue: number): boolean => {
  const validNumbers: boolean = Number.isFinite(initialInvestment) && Number.isFinite(currentValue);
  const validInitial: boolean = initialInvestment > 0;

  return validNumbers && validInitial;
};

// GET /api/v1/portfolio/performance?initialInvestment=10000&currentValue=11500
router.get("/performance", (req: Request, res: Response) => {
  // parse values from query string
  const { initialInvestment, currentValue } = parseQuery(req.query);

  // validate inputs
  if (!isValidInput(initialInvestment, currentValue)) {
    return res.status(400).json({
      message: "Invalid query parameters"
    });
  }

  // calculate and return result
  const result = calculatePortfolioPerformance(initialInvestment, currentValue);
  return res.status(200).json(result);
});

export default router;
