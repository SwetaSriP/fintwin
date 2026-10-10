'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGet, apiPost } from './client';

export type FinanceAccount = {
  id: string;
  name: string;
  type: string;
  institution?: string | null;
  balance: number;
  currency: string;
  isActive: boolean;
};

export type FinanceTransaction = {
  id: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  amount: number;
  description: string;
  merchant?: string | null;
  transactionDate: string;
  category?: { name: string } | null;
  account?: { name: string } | null;
};

export type CreateFinanceTransaction = Pick<FinanceTransaction, 'type' | 'amount' | 'description' | 'transactionDate'> & { merchant?: string; category?: string };

export function createTransaction(input: CreateFinanceTransaction) {
  return apiPost<FinanceTransaction>('/transactions', input);
}

export type FinanceGoal = {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  targetDate: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
};

export type FinanceInvestment = {
  id: string;
  name: string;
  type: string;
  currentValue: number;
  investedAmount: number;
};

export type FinanceSubscription = {
  id: string;
  name: string;
  amount: number;
  billingCycle: string;
  nextBillingDate: string;
  isActive: boolean;
};

const fallbackAccounts: FinanceAccount[] = [
  { id: 'acct-salary', name: 'HDFC Salary Account', type: 'SAVINGS', institution: 'HDFC Bank', balance: 182500, currency: 'INR', isActive: true },
  { id: 'acct-emergency', name: 'Emergency Fund', type: 'SAVINGS', institution: 'ICICI Bank', balance: 620000, currency: 'INR', isActive: true },
  { id: 'acct-cash', name: 'Everyday Cash', type: 'CASH', institution: null, balance: 100000, currency: 'INR', isActive: true },
  { id: 'acct-credit', name: 'Visa Signature', type: 'CREDIT_CARD', institution: 'Axis Bank', balance: 42000, currency: 'INR', isActive: true },
];

const fallbackTransactions: FinanceTransaction[] = [
  { id: 'txn-1', type: 'INCOME', amount: 160000, description: 'Monthly salary', merchant: 'Apex Logistics', transactionDate: '2026-10-01T09:00:00.000Z', category: { name: 'Salary' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-2', type: 'EXPENSE', amount: 24500, description: 'Apartment rent', merchant: 'Greenwood Residency', transactionDate: '2026-10-02T11:00:00.000Z', category: { name: 'Housing' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-3', type: 'EXPENSE', amount: 12840, description: 'Grocery and dining', merchant: 'Fresh Basket', transactionDate: '2026-10-03T18:30:00.000Z', category: { name: 'Food & Dining' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-4', type: 'EXPENSE', amount: 8200, description: 'Fuel and commute', merchant: 'FuelHub', transactionDate: '2026-10-04T08:00:00.000Z', category: { name: 'Transport' }, account: { name: 'HDFC Salary Account' } },
  { id: 'txn-5', type: 'EXPENSE', amount: 2149, description: 'Streaming bundle', merchant: 'Netflix', transactionDate: '2026-10-06T12:00:00.000Z', category: { name: 'Subscriptions' }, account: { name: 'HDFC Salary Account' } },
];

const fallbackGoals: FinanceGoal[] = [
  { id: 'goal-emergency', name: 'Emergency Fund', currentAmount: 620000, targetAmount: 600000, targetDate: '2026-10-01T00:00:00.000Z', status: 'COMPLETED', progress: 100 },
  { id: 'goal-car', name: 'Car Upgrade', currentAmount: 450000, targetAmount: 800000, targetDate: '2027-03-01T00:00:00.000Z', status: 'ACTIVE', progress: 56 },
  { id: 'goal-house', name: 'House Purchase', currentAmount: 1200000, targetAmount: 6000000, targetDate: '2030-12-01T00:00:00.000Z', status: 'ACTIVE', progress: 20 },
];

const fallbackInvestments: FinanceInvestment[] = [
  { id: 'inv-1', name: 'Nifty 50 Index Fund', type: 'MUTUAL_FUND', currentValue: 1278225, investedAmount: 1100000 },
  { id: 'inv-2', name: 'Direct Equity Portfolio', type: 'STOCK', currentValue: 568100, investedAmount: 520000 },
  { id: 'inv-3', name: 'Debt Fund & Bonds', type: 'BOND', currentValue: 426075, investedAmount: 400000 },
  { id: 'inv-4', name: 'EPF and PPF', type: 'EPF_PPF', currentValue: 284050, investedAmount: 250000 },
];

const fallbackSubscriptions: FinanceSubscription[] = [
  { id: 'sub-netflix', name: 'Netflix', amount: 649, billingCycle: 'MONTHLY', nextBillingDate: '2026-10-20T00:00:00.000Z', isActive: true },
  { id: 'sub-spotify', name: 'Spotify', amount: 119, billingCycle: 'MONTHLY', nextBillingDate: '2026-10-23T00:00:00.000Z', isActive: true },
  { id: 'sub-gym', name: 'Gym Membership', amount: 2499, billingCycle: 'MONTHLY', nextBillingDate: '2026-10-27T00:00:00.000Z', isActive: true },
];

export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      try {
        return await apiGet<FinanceAccount[]>('/accounts');
      } catch {
        return fallbackAccounts;
      }
    },
    initialData: fallbackAccounts,
  });
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      try {
        return await apiGet<FinanceTransaction[]>('/transactions');
      } catch {
        return fallbackTransactions;
      }
    },
    initialData: fallbackTransactions,
  });
}

export function useGoals() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      try {
        return await apiGet<FinanceGoal[]>('/goals');
      } catch {
        return fallbackGoals;
      }
    },
    initialData: fallbackGoals,
  });
}

export function useInvestments() {
  return useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      try {
        return await apiGet<FinanceInvestment[]>('/investments');
      } catch {
        return fallbackInvestments;
      }
    },
    initialData: fallbackInvestments,
  });
}

export function useSubscriptions() {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      try {
        return await apiGet<FinanceSubscription[]>('/subscriptions');
      } catch {
        return fallbackSubscriptions;
      }
    },
    initialData: fallbackSubscriptions,
  });
}
