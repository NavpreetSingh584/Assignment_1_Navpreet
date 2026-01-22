// Primary data type annotations
const currencySymbol: string = "$";

/**
 * Portfolio performance result contract
 */
export interface PortfolioPerformanceResult {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

/**
 * Rounds to 2 decimal places
 * @param value - input number
 * @returns rounded number
 */
const round2 = (value: number): number => {
  return Math.round(value * 100) / 100;
};

/**
 * Builds summary message based on profit/loss sign (NO if)
 * @param profitOrLoss - profit or loss amount
 * @param percentageChange - percent change
 * @returns summary string
 */
const buildSummary = (profitOrLoss: number, percentageChange: number): string => {
  const sign: number = Math.sign(profitOrLoss);

  return sign > 0
    ? `The portfolio gained ${currencySymbol}${round2(profitOrLoss).toFixed(2)} (${round2(
        percentageChange
      ).toFixed(2)}%).`
    : sign < 0
    ? `The portfolio lost ${currencySymbol}${round2(Math.abs(profitOrLoss)).toFixed(2)} (${round2(
        percentageChange
      ).toFixed(2)}%).`
    : "The portfolio broke even (0.00%).";
};

/**
 * Calculates portfolio performance (NO if-statements)
 * @param initialInvestment - initial amount
 * @param currentValue - current amount
 * @returns PortfolioPerformanceResult
 */
export const calculatePortfolioPerformance = (
  initialInvestment: number,
  currentValue: number
): PortfolioPerformanceResult => {
  const profitOrLoss: number = currentValue - initialInvestment;
  const percentageChange: number = (profitOrLoss / initialInvestment) * 100;

  const performanceSummary: string = buildSummary(profitOrLoss, percentageChange);

  return {
    initialInvestment: round2(initialInvestment),
    currentValue: round2(currentValue),
    profitOrLoss: round2(profitOrLoss),
    percentageChange: round2(percentageChange),
    performanceSummary
  };
};