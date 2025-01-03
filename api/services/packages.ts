import { Package } from '@/constants/types';
import {
  useAppMutation,
  useAppQuery,
  useAppQueryWithPaginationAndParams,
} from '@/api/client-constructor';
import {
  CustomApiErrorResponse,
  CustomApiResponse,
  PackageSettlementResponse,
} from '@/api/types';
import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';

export const useGetAllActivePackages = (params?: {
  package_type?: string;
  search?: string;
  page?: number;
}) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.packages.showAllActivePackages
  );
  return useAppQueryWithPaginationAndParams<Package>({
    apiRoute: routes.packages.showAllActivePackages,
    queryKey: [
      baseQueryKey,
      params?.package_type,
      params?.search,
      params?.page,
    ],
    params: params,
  });
};

export const useGetAllInactivePackages = (params?: {
  package_type?: string;
  search?: string;
  page?: number;
}) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.packages.showAllInactivePackages
  );
  return useAppQueryWithPaginationAndParams<Package>({
    apiRoute: routes.packages.showAllInactivePackages,
    queryKey: [
      baseQueryKey,
      params?.package_type,
      params?.search,
      params?.page,
    ],
    params: params,
  });
};

export const useCreatePackage = (data?: Package) => {
  return useAppMutation<Package>({
    apiRoute: routes.packages.createPackage,
    method: 'POST',
    body: JSON.stringify(data),
    options: {
      enabled: !!data,
    },
  });
};

export const useEditPackage = (packageId: string, data?: Package) => {
  return useAppMutation<CustomApiResponse>({
    apiRoute: routes.package.editPackage(packageId),
    method: 'PATCH',
    body: JSON.stringify(data),
    options: {
      enabled: !!data && !!packageId,
    },
  });
};

export const useActivatePackage = (packageId: string) => {
  return useAppMutation<CustomApiResponse>({
    apiRoute: routes.package.activatePackage(packageId),
    method: 'POST',
    options: {
      enabled: !!packageId,
    },
  });
};

export const useDeactivatePackage = (packageId: string) => {
  return useAppMutation<CustomApiResponse>({
    apiRoute: routes.package.deactivatePackage(packageId),
    method: 'POST',
    options: {
      enabled: !!packageId,
    },
  });
};

export const useViewPackage = (packageId: string) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.package.viewPackage(packageId)
  );
  return useAppQuery<Package>({
    apiRoute: routes.package.viewPackage(packageId),
    queryKey: [baseQueryKey],
  });
};

export const useDeletePackage = (packageId: string) => {
  return useAppMutation<CustomApiResponse>({
    apiRoute: routes.package.deletePackage(packageId),
    method: 'DELETE',
    options: {
      enabled: !!packageId,
    },
  });
};

export const useCheckPackageSettlementStatus = (packageId: string) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.package.checkSettlementStatus(packageId)
  );

  return useAppQuery<PackageSettlementResponse>({
    apiRoute: routes.package.checkSettlementStatus(packageId),
    queryKey: [baseQueryKey],
    options: {
      enabled: !!packageId,
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 5000,
    },
  });
};
