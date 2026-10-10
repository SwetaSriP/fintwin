const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const snapshotValues = [3120000, 3260000, 3310000, 3470000, 3520000, 3680000, 3610000, 3840000, 3970000, 4110000, 4190000, 4260500];
const expensePlan = [
  ['Housing', 24500], ['Food & Dining', 12840], ['Transport', 8200], ['Shopping', 7600],
  ['Utilities', 7200], ['Subscriptions', 2149], ['Healthcare', 2100], ['Travel', 1641], ['Other', 2000],
];

function monthDate(index, day = 5) {
  const year = index < 2 ? 2025 : 2026;
  const month = index < 2 ? index + 10 : index - 2;
  return new Date(Date.UTC(year, month, day, 9));
}

async function main() {
  const email = 'demo@fintwin.local';
  await prisma.user.deleteMany({ where: { email } });
  const user = await prisma.user.create({ data: { name: 'Karan Mehta', email, currency: 'INR' } });

  const accounts = {};
  for (const account of [
    { key: 'salary', name: 'HDFC Salary Account', type: 'SAVINGS', institution: 'HDFC Bank', balance: '180000' },
    { key: 'emergency', name: 'Emergency Fund', type: 'SAVINGS', institution: 'ICICI Bank', balance: '620000' },
    { key: 'cash', name: 'Everyday Cash', type: 'CASH', institution: null, balance: '100000' },
  ]) {
    accounts[account.key] = await prisma.account.create({ data: { userId: user.id, name: account.name, type: account.type, institution: account.institution, balance: account.balance, currency: 'INR' } });
  }

  const categoryNames = [
    ['Salary', 'INCOME'], ['Freelance', 'INCOME'], ['Interest', 'INCOME'], ['Other Income', 'INCOME'],
    ['Housing', 'EXPENSE'], ['Food & Dining', 'EXPENSE'], ['Transport', 'EXPENSE'], ['Shopping', 'EXPENSE'],
    ['Utilities', 'EXPENSE'], ['Subscriptions', 'EXPENSE'], ['Healthcare', 'EXPENSE'], ['Travel', 'EXPENSE'],
    ['Education', 'EXPENSE'], ['Insurance', 'EXPENSE'], ['Other', 'EXPENSE'],
  ];
  const categories = {};
  for (const [name, type] of categoryNames) {
    categories[name] = await prisma.category.create({ data: { userId: user.id, name, type } });
  }

  const transactions = [];
  for (let index = 0; index < 12; index += 1) {
    transactions.push({ userId: user.id, accountId: accounts.salary.id, categoryId: categories.Salary.id, type: 'INCOME', amount: '160000', description: 'Monthly salary', merchant: 'Karan Mehta employer', transactionDate: monthDate(index, 1) });
    for (const [name, baseAmount] of expensePlan) {
      const factor = index === 11 ? 1 : 0.92 + ((index * 7) % 9) / 100;
      const amount = Math.round(baseAmount * factor);
      transactions.push({ userId: user.id, accountId: accounts.salary.id, categoryId: categories[name].id, type: 'EXPENSE', amount: String(amount), description: `${name} expense`, merchant: name, transactionDate: monthDate(index, 7 + (index % 12)) });
    }
    if (index % 4 === 1) transactions.push({ userId: user.id, accountId: accounts.salary.id, categoryId: categories.Travel.id, type: 'EXPENSE', amount: '8500', description: 'Weekend travel', merchant: 'Travel booking', transactionDate: monthDate(index, 20) });
    if (index % 3 === 0) transactions.push({ userId: user.id, accountId: accounts.salary.id, categoryId: categories.Freelance.id, type: 'INCOME', amount: '12000', description: 'Freelance project', merchant: 'Independent project', transactionDate: monthDate(index, 18) });
  }
  await prisma.transaction.createMany({ data: transactions });

  await prisma.goal.createMany({ data: [
    { userId: user.id, name: 'Emergency Fund', currentAmount: '620000', targetAmount: '600000', targetDate: new Date('2026-10-01'), status: 'COMPLETED' },
    { userId: user.id, name: 'Car Upgrade', currentAmount: '450000', targetAmount: '800000', targetDate: new Date('2027-03-01'), status: 'ACTIVE' },
    { userId: user.id, name: 'House Purchase', currentAmount: '1200000', targetAmount: '6000000', targetDate: new Date('2030-12-01'), status: 'ACTIVE' },
    { userId: user.id, name: '₹1 Crore Net Worth', currentAmount: '4260500', targetAmount: '10000000', targetDate: new Date('2035-01-01'), status: 'ACTIVE' },
  ] });

  await prisma.investment.createMany({ data: [
    { userId: user.id, name: 'Nifty 50 Index Fund', type: 'MUTUAL_FUND', currentValue: '1278225', investedAmount: '1100000' },
    { userId: user.id, name: 'Direct Equity Portfolio', type: 'STOCK', currentValue: '568100', investedAmount: '520000' },
    { userId: user.id, name: 'Debt Fund & Bonds', type: 'BOND', currentValue: '426075', investedAmount: '400000' },
    { userId: user.id, name: 'EPF and PPF', type: 'EPF_PPF', currentValue: '284050', investedAmount: '250000' },
    { userId: user.id, name: 'Digital Gold', type: 'GOLD', currentValue: '142025', investedAmount: '120000' },
    { userId: user.id, name: 'Fractional Real Estate', type: 'REAL_ESTATE', currentValue: '142025', investedAmount: '130000' },
  ] });

  await prisma.asset.createMany({ data: [
    { userId: user.id, name: 'Family Apartment', type: 'PROPERTY', currentValue: '800000' },
    { userId: user.id, name: 'Honda City', type: 'VEHICLE', currentValue: '450000' },
  ] });

  await prisma.liability.createMany({ data: [
    { userId: user.id, name: 'Home Loan', type: 'HOME_LOAN', outstandingAmount: '630000', interestRate: '8.25', emiAmount: '34120', nextPaymentDate: new Date('2026-10-14') },
    { userId: user.id, name: 'Car Loan', type: 'CAR_LOAN', outstandingAmount: '100000', interestRate: '9.10', emiAmount: '12430', nextPaymentDate: new Date('2026-10-17') },
  ] });

  await prisma.subscription.createMany({ data: [
    { userId: user.id, name: 'Netflix', amount: '649', billingCycle: 'MONTHLY', nextBillingDate: new Date('2026-10-20'), isActive: true },
    { userId: user.id, name: 'Spotify', amount: '119', billingCycle: 'MONTHLY', nextBillingDate: new Date('2026-10-23'), isActive: true },
    { userId: user.id, name: 'Gym Membership', amount: '2499', billingCycle: 'MONTHLY', nextBillingDate: new Date('2026-10-27'), isActive: true },
  ] });

  await prisma.financialSnapshot.createMany({ data: snapshotValues.map((netWorth, index) => ({ userId: user.id, snapshotDate: monthDate(index, 28), netWorth: String(netWorth), assetsValue: String(netWorth + 730000), liabilitiesValue: '730000' })) });
  console.log(`Seeded ${user.email}: ${transactions.length} transactions, ${snapshotValues.length} snapshots.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
