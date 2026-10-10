CREATE TYPE "AccountType" AS ENUM ('SAVINGS', 'CURRENT', 'CASH', 'CREDIT_CARD', 'WALLET', 'OTHER');
CREATE TYPE "CategoryType" AS ENUM ('INCOME', 'EXPENSE');
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER');
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED');
CREATE TYPE "InvestmentType" AS ENUM ('MUTUAL_FUND', 'STOCK', 'BOND', 'EPF_PPF', 'GOLD', 'REAL_ESTATE', 'OTHER');
CREATE TYPE "AssetType" AS ENUM ('CASH', 'PROPERTY', 'VEHICLE', 'OTHER');
CREATE TYPE "LiabilityType" AS ENUM ('HOME_LOAN', 'CAR_LOAN', 'PERSONAL_LOAN', 'CREDIT_CARD', 'OTHER');
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY');

CREATE TABLE "User" (
	"id" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"currency" TEXT NOT NULL DEFAULT 'INR',
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Account" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"type" "AccountType" NOT NULL,
	"institution" TEXT,
	"balance" DECIMAL(14,2) NOT NULL,
	"currency" TEXT NOT NULL DEFAULT 'INR',
	"isActive" BOOLEAN NOT NULL DEFAULT true,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Category" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"type" "CategoryType" NOT NULL,
	"icon" TEXT,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Transaction" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"accountId" TEXT NOT NULL,
	"categoryId" TEXT,
	"type" "TransactionType" NOT NULL,
	"amount" DECIMAL(14,2) NOT NULL,
	"description" TEXT NOT NULL,
	"merchant" TEXT,
	"transactionDate" TIMESTAMP(3) NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Goal" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"currentAmount" DECIMAL(14,2) NOT NULL,
	"targetAmount" DECIMAL(14,2) NOT NULL,
	"targetDate" TIMESTAMP(3),
	"status" "GoalStatus" NOT NULL DEFAULT 'ACTIVE',
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Investment" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"type" "InvestmentType" NOT NULL,
	"currentValue" DECIMAL(14,2) NOT NULL,
	"investedAmount" DECIMAL(14,2) NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Asset" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"type" "AssetType" NOT NULL,
	"currentValue" DECIMAL(14,2) NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Liability" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"type" "LiabilityType" NOT NULL,
	"outstandingAmount" DECIMAL(14,2) NOT NULL,
	"interestRate" DECIMAL(5,2),
	"emiAmount" DECIMAL(14,2),
	"nextPaymentDate" TIMESTAMP(3),
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Liability_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Subscription" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"amount" DECIMAL(14,2) NOT NULL,
	"billingCycle" "BillingCycle" NOT NULL,
	"nextBillingDate" TIMESTAMP(3) NOT NULL,
	"isActive" BOOLEAN NOT NULL DEFAULT true,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "FinancialSnapshot" (
	"id" TEXT NOT NULL,
	"userId" TEXT NOT NULL,
	"snapshotDate" TIMESTAMP(3) NOT NULL,
	"netWorth" DECIMAL(14,2) NOT NULL,
	"assetsValue" DECIMAL(14,2) NOT NULL,
	"liabilitiesValue" DECIMAL(14,2) NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "FinancialSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Category_userId_name_type_key" ON "Category"("userId", "name", "type");
CREATE UNIQUE INDEX "FinancialSnapshot_userId_snapshotDate_key" ON "FinancialSnapshot"("userId", "snapshotDate");
CREATE INDEX "Account_userId_isActive_idx" ON "Account"("userId", "isActive");
CREATE INDEX "Category_userId_type_idx" ON "Category"("userId", "type");
CREATE INDEX "Transaction_userId_transactionDate_idx" ON "Transaction"("userId", "transactionDate");
CREATE INDEX "Transaction_accountId_transactionDate_idx" ON "Transaction"("accountId", "transactionDate");
CREATE INDEX "Transaction_categoryId_transactionDate_idx" ON "Transaction"("categoryId", "transactionDate");
CREATE INDEX "Goal_userId_status_idx" ON "Goal"("userId", "status");
CREATE INDEX "Investment_userId_type_idx" ON "Investment"("userId", "type");
CREATE INDEX "Asset_userId_type_idx" ON "Asset"("userId", "type");
CREATE INDEX "Liability_userId_nextPaymentDate_idx" ON "Liability"("userId", "nextPaymentDate");
CREATE INDEX "Subscription_userId_nextBillingDate_idx" ON "Subscription"("userId", "nextBillingDate");
CREATE INDEX "FinancialSnapshot_userId_snapshotDate_idx" ON "FinancialSnapshot"("userId", "snapshotDate");

ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Liability" ADD CONSTRAINT "Liability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FinancialSnapshot" ADD CONSTRAINT "FinancialSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
