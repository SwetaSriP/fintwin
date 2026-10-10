export interface AmountRecord { name: string; amount: number }

export function calculateSavingsRate(income: number, spending: number) {
  if (income <= 0) return 0;
  return Number((((income - spending) / income) * 100).toFixed(1));
}

export function calculateGoalProgress(currentAmount: number, targetAmount: number) {
  if (targetAmount <= 0) return 0;
  return Math.min(100, Math.round((currentAmount / targetAmount) * 100));
}

export function groupAmounts(records: AmountRecord[]) {
  const totals = new Map<string, number>();
  for (const record of records) totals.set(record.name, (totals.get(record.name) ?? 0) + record.amount);
  const total = [...totals.values()].reduce((sum, amount) => sum + amount, 0);
  return [...totals.entries()].map(([name, amount]) => ({ name, amount, percentage: total > 0 ? Number(((amount / total) * 100).toFixed(1)) : 0 })).sort((a, b) => b.amount - a.amount);
}

export function calculateNetWorth(accounts: number[], investments: number[], assets: number[], liabilities: number[]) {
  return accounts.reduce((sum, amount) => sum + amount, 0) + investments.reduce((sum, amount) => sum + amount, 0) + assets.reduce((sum, amount) => sum + amount, 0) - liabilities.reduce((sum, amount) => sum + amount, 0);
}

export interface HealthInputs {
  savingsRate: number;
  emergencyCoverageMonths: number;
  monthlyIncome: number;
  monthlyDebtPayments: number;
  investmentRatio: number;
  averageGoalProgress: number;
  expenseStability: number;
}

export function calculateFinancialHealth(input: HealthInputs) {
  const savingsPoints = Math.min(25, Math.max(0, input.savingsRate / 30 * 25));
  const emergencyPoints = Math.min(20, Math.max(0, input.emergencyCoverageMonths / 6 * 20));
  const debtRatio = input.monthlyIncome > 0 ? input.monthlyDebtPayments / input.monthlyIncome : 1;
  const debtPoints = Math.min(20, Math.max(0, (1 - debtRatio / 0.45) * 20));
  const investmentPoints = Math.min(15, Math.max(0, input.investmentRatio * 15));
  const goalPoints = Math.min(10, Math.max(0, input.averageGoalProgress * 10));
  const stabilityPoints = Math.min(10, Math.max(0, input.expenseStability * 10));
  const score = Math.round(savingsPoints + emergencyPoints + debtPoints + investmentPoints + goalPoints + stabilityPoints);
  const rating = score >= 90 ? 'Excellent' : score >= 75 ? 'Very Good' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Attention' : 'Critical';
  return { score: Math.min(100, Math.max(0, score)), rating };
}
