export const demoUser = {
  id: 'demo-user-1',
  name: 'Arjun Shah',
  email: 'demo@fintwin.local',
  currency: 'INR',
};

export const demoAccounts = [
  {
    id: 'acct-salary',
    userId: demoUser.id,
    name: 'HDFC Salary Account',
    type: 'SAVINGS',
    institution: 'HDFC Bank',
    balance: 182500,
    currency: 'INR',
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'acct-emergency',
    userId: demoUser.id,
    name: 'Emergency Fund',
    type: 'SAVINGS',
    institution: 'ICICI Bank',
    balance: 620000,
    currency: 'INR',
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'acct-cash',
    userId: demoUser.id,
    name: 'Everyday Cash',
    type: 'CASH',
    institution: null,
    balance: 100000,
    currency: 'INR',
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'acct-credit',
    userId: demoUser.id,
    name: 'Visa Signature',
    type: 'CREDIT_CARD',
    institution: 'Axis Bank',
    balance: 42000,
    currency: 'INR',
    isActive: true,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
];

export const demoTransactions = [
  { id: 'txn-1', userId: demoUser.id, accountId: 'acct-salary', categoryId: 'cat-salary', type: 'INCOME', amount: 160000, description: 'Monthly salary', merchant: 'Apex Logistics', transactionDate: '2026-10-01T09:00:00.000Z', createdAt: '2026-10-01T09:00:00.000Z', updatedAt: '2026-10-01T09:00:00.000Z', category: { name: 'Salary' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-2', userId: demoUser.id, accountId: 'acct-salary', categoryId: 'cat-housing', type: 'EXPENSE', amount: 24500, description: 'Apartment rent', merchant: 'Greenwood Residency', transactionDate: '2026-10-02T11:00:00.000Z', createdAt: '2026-10-02T11:00:00.000Z', updatedAt: '2026-10-02T11:00:00.000Z', category: { name: 'Housing' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-3', userId: demoUser.id, accountId: 'acct-salary', categoryId: 'cat-food', type: 'EXPENSE', amount: 12840, description: 'Groceries and dining', merchant: 'Fresh Basket', transactionDate: '2026-10-03T18:30:00.000Z', createdAt: '2026-10-03T18:30:00.000Z', updatedAt: '2026-10-03T18:30:00.000Z', category: { name: 'Food & Dining' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-4', userId: demoUser.id, accountId: 'acct-salary', categoryId: 'cat-travel', type: 'EXPENSE', amount: 8200, description: 'Fuel and commute', merchant: 'FuelHub', transactionDate: '2026-10-04T08:00:00.000Z', createdAt: '2026-10-04T08:00:00.000Z', updatedAt: '2026-10-04T08:00:00.000Z', category: { name: 'Transport' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-5', userId: demoUser.id, accountId: 'acct-salary', categoryId: 'cat-subscriptions', type: 'EXPENSE', amount: 2149, description: 'Streaming bundle', merchant: 'Netflix', transactionDate: '2026-10-06T12:00:00.000Z', createdAt: '2026-10-06T12:00:00.000Z', updatedAt: '2026-10-06T12:00:00.000Z', category: { name: 'Subscriptions' }, account: { name: 'HDFC Salary Account' } },
];

export const demoGoals = [
  { id: 'goal-emergency', userId: demoUser.id, name: 'Emergency Fund', currentAmount: 620000, targetAmount: 600000, targetDate: '2026-10-01T00:00:00.000Z', status: 'COMPLETED', progress: 100 },
  { id: 'goal-car', userId: demoUser.id, name: 'Car Upgrade', currentAmount: 450000, targetAmount: 800000, targetDate: '2027-03-01T00:00:00.000Z', status: 'ACTIVE', progress: 56 },
  { id: 'goal-house', userId: demoUser.id, name: 'House Purchase', currentAmount: 1200000, targetAmount: 6000000, targetDate: '2030-12-01T00:00:00.000Z', status: 'ACTIVE', progress: 20 },
  { id: 'goal-networth', userId: demoUser.id, name: '₹1 Crore Net Worth', currentAmount: 4260500, targetAmount: 10000000, targetDate: '2035-01-01T00:00:00.000Z', status: 'ACTIVE', progress: 43 },
];

export const demoInvestments = [
  { id: 'inv-1', userId: demoUser.id, name: 'Nifty 50 Index Fund', type: 'MUTUAL_FUND', currentValue: 1278225, investedAmount: 1100000, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2026-10-10T00:00:00.000Z' },
  { id: 'inv-2', userId: demoUser.id, name: 'Direct Equity Portfolio', type: 'STOCK', currentValue: 568100, investedAmount: 520000, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2026-10-10T00:00:00.000Z' },
  { id: 'inv-3', userId: demoUser.id, name: 'Debt Fund & Bonds', type: 'BOND', currentValue: 426075, investedAmount: 400000, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2026-10-10T00:00:00.000Z' },
  { id: 'inv-4', userId: demoUser.id, name: 'EPF and PPF', type: 'EPF_PPF', currentValue: 284050, investedAmount: 250000, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2026-10-10T00:00:00.000Z' },
];

export const demoSubscriptions = [
  { id: 'sub-netflix', userId: demoUser.id, name: 'Netflix', amount: 649, billingCycle: 'MONTHLY', nextBillingDate: '2026-10-20T00:00:00.000Z', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2026-10-10T00:00:00.000Z' },
  { id: 'sub-spotify', userId: demoUser.id, name: 'Spotify', amount: 119, billingCycle: 'MONTHLY', nextBillingDate: '2026-10-23T00:00:00.000Z', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2026-10-10T00:00:00.000Z' },
  { id: 'sub-gym', userId: demoUser.id, name: 'Gym Membership', amount: 2499, billingCycle: 'MONTHLY', nextBillingDate: '2026-10-27T00:00:00.000Z', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2026-10-10T00:00:00.000Z' },
];

export const demoDashboard = {
  summary: {
    netWorth: 4260500,
    monthlyIncome: 160000,
    monthlySpending: 78230,
    savingsRate: 51.1,
    emergencyFund: 620000,
    financialHealthScore: 89,
    financialHealthRating: 'Very Good',
  },
  netWorthHistory: [
    { month: 'Jan', label: 'Jan 2025', value: 31.2 },
    { month: 'Feb', label: 'Feb 2025', value: 32.6 },
    { month: 'Mar', label: 'Mar 2025', value: 33.1 },
    { month: 'Apr', label: 'Apr 2025', value: 34.7 },
    { month: 'May', label: 'May 2025', value: 35.2 },
    { month: 'Jun', label: 'Jun 2025', value: 36.8 },
    { month: 'Jul', label: 'Jul 2025', value: 36.1 },
    { month: 'Aug', label: 'Aug 2025', value: 38.4 },
    { month: 'Sep', label: 'Sep 2025', value: 39.7 },
    { month: 'Oct', label: 'Oct 2025', value: 41.1 },
    { month: 'Nov', label: 'Nov 2025', value: 41.9 },
    { month: 'Dec', label: 'Dec 2025', value: 42.6 },
  ],
  spendingCategories: [
    { name: 'Housing', amount: 24500, percentage: 31, color: '#3f7770' },
    { name: 'Food & Dining', amount: 12840, percentage: 16, color: '#7fa6a2' },
    { name: 'Transport', amount: 8200, percentage: 11, color: '#c89d5d' },
    { name: 'Shopping', amount: 7600, percentage: 10, color: '#d9866c' },
    { name: 'Utilities', amount: 7200, percentage: 9, color: '#88a9b2' },
    { name: 'Other', amount: 2000, percentage: 3, color: '#9aa5a1' },
  ],
  assetAllocation: [
    { name: 'MUTUAL_FUND', value: 1278225, percentage: 30, color: '#3f7770' },
    { name: 'STOCK', value: 568100, percentage: 13, color: '#7b8fc5' },
    { name: 'BOND', value: 426075, percentage: 10, color: '#b59766' },
    { name: 'EPF_PPF', value: 284050, percentage: 7, color: '#e0a583' },
    { name: 'REAL_ESTATE', value: 142025, percentage: 3, color: '#8ea499' },
  ],
  goals: demoGoals,
  upcomingPayments: [
    { id: 'liability-home', name: 'Home Loan EMI', amount: 34120, dueDate: '2026-10-14T00:00:00.000Z', kind: 'payment', status: 'upcoming' },
    { id: 'liability-car', name: 'Car Loan EMI', amount: 12430, dueDate: '2026-10-17T00:00:00.000Z', kind: 'payment', status: 'upcoming' },
    { id: 'sub-netflix', name: 'Netflix', amount: 649, dueDate: '2026-10-20T00:00:00.000Z', kind: 'subscription', status: 'subscription' },
  ],
  insights: [
    { id: 'dining-alert', type: 'UNUSUAL_SPENDING', title: 'Dining drift', message: 'Dining spend is 18% above your recent average.', severity: 'warning' },
    { id: 'savings-success', type: 'SAVINGS_PROGRESS', title: 'Savings momentum', message: 'Your savings rate is comfortably above the 25% target.', severity: 'success' },
    { id: 'sub-summary', type: 'SUBSCRIPTION_SUMMARY', title: 'Subscription tune-up', message: 'You have 3 active subscriptions, costing ₹3,267/month.', severity: 'info' },
  ],
};
