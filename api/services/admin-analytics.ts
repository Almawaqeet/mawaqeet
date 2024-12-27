import {
  useAppQuery,
  useAppQueryWithPaginationAndParams,
} from '@/api/client-constructor';
import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';
import {
  FinancialSummaryResponse,
  PackageBookingFinancialSummaryResponse,
  PaginatedResponse,
  User,
} from '@/api/types';

export const useGetAllRegisteredUsers = (params?: {
  page: number;
  name?: string;
  email?: string;
}) => {
  return useAppQueryWithPaginationAndParams<PaginatedResponse<User>>({
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
