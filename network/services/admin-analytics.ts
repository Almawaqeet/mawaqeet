import {
  useAppQuery,
  useAppQueryWithPaginationAndParams,
} from '@/network/client-constructor';
import { generateBaseQueryKeyFromRoute, routes } from '@/network/routes';
import {
  FinancialSummaryResponse,
  PackageBookingFinancialSummaryResponse,
  User,
} from '@/network/types';

export const useGetAllRegisteredUsers = (params?: {
  page: number;
  name?: string;
  email?: string;
}) => {
  return useAppQueryWithPaginationAndParams<User>({
    apiRoute: routes.users.getUsers,
    queryKey: [
      'ALL_REGISTERED_USERS',
      params?.page ?? 1,
      params?.name ?? '',
      params?.email ?? '',
    ],
    params: params,
  });
};

export const useGetFinancialSummary = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.analytics.financialSummary
  );
  return useAppQuery<FinancialSummaryResponse>({
    apiRoute: routes.analytics.financialSummary,
    queryKey: [baseQueryKey],
  });
};

export const useGetPackageSummaryMonthly = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.analytics.packageSummaryMonthly
  );
  return useAppQuery<PackageBookingFinancialSummaryResponse>({
    apiRoute: routes.analytics.packageSummaryMonthly,
    queryKey: [baseQueryKey],
  });
};
