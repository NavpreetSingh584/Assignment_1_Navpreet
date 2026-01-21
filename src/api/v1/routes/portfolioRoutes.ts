import { Router, Request, Response } from "express";
// import router + types

import { calculatePortfolioPerformance } from "../../../portfolio/portfolioPerformance";
// import function

// Primary data type annotations
const router: Router = Router();

/**
 * Parses request body into numbers
 * @param body - request body
 * @returns parsed values
 */
const parseBody = (body: unknown): { initialInvestment: number; currentValue: number } => {
  const raw = body as { initialInvestment?: unknown; currentValue?: unknown };

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

// POST /api/v1/portfolio/performance
router.post("/performance", (req: Request, res: Response) => {
  const { initialInvestment, currentValue } = parseBody(req.body);

  if (!isValidInput(initialInvestment, currentValue)) {
    return res.status(400).json({
      message: "Invalid input. initialInvestment must be > 0 and values must be numbers."
    });
  }

  const result = calculatePortfolioPerformance(initialInvestment, currentValue);
  return res.status(200).json(result);
});

export default router;
