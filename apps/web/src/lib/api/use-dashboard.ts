'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardQueryKey, getDashboard } from './dashboard';

export function useDashboard() {
  return useQuery({ queryKey: dashboardQueryKey, queryFn: getDashboard });
}
