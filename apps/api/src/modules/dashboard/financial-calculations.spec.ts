import { calculateFinancialHealth, calculateGoalProgress, calculateNetWorth, calculateSavingsRate, groupAmounts } from './financial-calculations';

describe('financial calculations', () => {
  it('calculates savings rate safely', () => {
    expect(calculateSavingsRate(160000, 78230)).toBe(51.1);
    expect(calculateSavingsRate(0, 100)).toBe(0);
  });

  it('calculates net worth from source values', () => {
    expect(calculateNetWorth([900000], [2840500], [1250000], [730000])).toBe(4260500);
  });

  it('groups spending and derives percentages', () => {
    expect(groupAmounts([{ name: 'Housing', amount: 750 }, { name: 'Food', amount: 250 }])).toEqual([
      { name: 'Housing', amount: 750, percentage: 75 },
      { name: 'Food', amount: 250, percentage: 25 },
    ]);
  });

  it('clamps goal progress to a complete goal', () => {
    expect(calculateGoalProgress(120, 100)).toBe(100);
    expect(calculateGoalProgress(20, 100)).toBe(20);
  });

  it('returns a bounded, explainable health result', () => {
    const result = calculateFinancialHealth({ savingsRate: 35, emergencyCoverageMonths: 8, monthlyIncome: 160000, monthlyDebtPayments: 30000, investmentRatio: 0.6, averageGoalProgress: 0.45, expenseStability: 0.9 });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.rating).toBe('Very Good');
  });
});
