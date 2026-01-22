import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";
// import portfolio function

describe("calculatePortfolioPerformance", () => {
  it("should calculate profit and percentage change for a gain", () => {
    // Arrange
    const initialInvestment: number = 10000;
    const currentValue: number = 12000;

    // Act
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);

    // Assert
    expect(result.profitOrLoss).toBe(2000);
    expect(result.percentageChange).toBe(20);
  });

  it("should calculate profit and percentage change for a loss", () => {
    // Arrange
    const initialInvestment: number = 10000;
    const currentValue: number = 8000;

    // Act
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);

    // Assert
    expect(result.profitOrLoss).toBe(-2000);
    expect(result.percentageChange).toBe(-20);
  });

  it("should return 0 values for break-even", () => {
    // Arrange
    const initialInvestment: number = 10000;
    const currentValue: number = 10000;

    // Act
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);

    // Assert
    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBe(0);
  });
});
