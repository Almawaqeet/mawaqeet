import { useAppMutation, useAppQuery, useAppQueryWithPaginationAndParams } from "@/api/constructor";
import { routes } from "@/api/routes";
import { Package } from "@/constants/types";
import { PaginatedResponse } from "@/api/types";

export const useGetAllActivePackages = (params?: { package_type?: string, search?: string }) => {
    return useAppQueryWithPaginationAndParams<PaginatedResponse<Package>>({
        apiRoute: routes.packages.showAllActivePackages,
        queryKey: ['GET_ALL_ACTIVE_PACKAGES', params?.package_type, params?.search],
        params: params
    });
}

export const useGetAllInactivePackages = (params?: { package_type?: string, search?: string }) => {
    return useAppQueryWithPaginationAndParams<PaginatedResponse<Package>>({
        apiRoute: routes.packages.showAllInactivePackages,
        queryKey: ['GET_ALL_INACTIVE_PACKAGES', params?.package_type, params?.search],
        params: params
    });
}


export const useCreatePackage = (data?: Package) => {
    return useAppMutation<Package>({
        apiRoute: routes.packages.createPackage,
        method: 'POST',
        body: data,
        options: {
            enabled: !!data
        }
    });
}


export const useViewPackage = (packageId: string) => {
    return useAppQuery<Package>({
        apiRoute: routes.package.viewPackage(packageId),
        queryKey: ['VIEW_PACKAGE', packageId],
    });
}
