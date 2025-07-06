import { useAppQuery } from '@/network/client-constructor';

import { generateBaseQueryKeyFromRoute, routes } from '@/network/routes';
import {
  SimpleTransactionResponse,
  UpcomingPackageResponse,
  UserFinancialSummaryResponse,
  UserTransactionResponse,
} from '@/network/types';

export const useGetUpcomingHajjAndUmrahPackage = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.analytics.getUpcomingHajjAndUmrahPackage
  );
  return useAppQuery<UpcomingPackageResponse>({
    apiRoute: routes.analytics.getUpcomingHajjAndUmrahPackage,
    queryKey: [baseQueryKey],
  });
};

export const useGetRecentPayments = (type: string) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.analytics.getRecentPayments
  );
  return useAppQuery<UserTransactionResponse>({
    apiRoute: `${routes.analytics.getRecentPayments}?package_type=${type}`,
    queryKey: [baseQueryKey, type],
  });
};

export const useGetUserFinancialSummary = (type: string) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.analytics.getUserFinancialSummary
  );
  return useAppQuery<UserFinancialSummaryResponse>({
    apiRoute: `${routes.analytics.getUserFinancialSummary}?package_type=${type}`,
    queryKey: [baseQueryKey, type],
  });
};
