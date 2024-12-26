import { Package } from "@/constants/types";
import { useAppMutation, useAppQuery, useAppQueryWithPaginationAndParams } from "@/api/client-constructor";
import { CustomApiResponse, PaginatedResponse } from "@/api/types";
import { generateBaseQueryKeyFromRoute, routes } from "@/api/routes";


export const useGetAllActivePackages = (params?: { package_type?: string, search?: string, page?: number  }) => {
    const baseQueryKey = generateBaseQueryKeyFromRoute(routes.packages.showAllActivePackages);
    return useAppQueryWithPaginationAndParams<PaginatedResponse<Package>>({
        apiRoute: routes.packages.showAllActivePackages,
        queryKey: [baseQueryKey, params?.package_type, params?.search, params?.page],
        params: params
    });
}

export const useGetAllInactivePackages = (params?: { package_type?: string, search?: string, page?: number }) => {
    const baseQueryKey = generateBaseQueryKeyFromRoute(routes.packages.showAllInactivePackages);
    return useAppQueryWithPaginationAndParams<PaginatedResponse<Package>>({
        apiRoute: routes.packages.showAllInactivePackages,
        queryKey: [baseQueryKey, params?.package_type, params?.search, params?.page],
        params: params
    });
}


export const useCreatePackage = (data?: Package) => {
    return useAppMutation<Package>({
        apiRoute: routes.packages.createPackage,
        method: 'POST',
        body: JSON.stringify(data),
        options: {
            enabled: !!data
        }
    });
}


export const useEditPackage = (packageId: string, data?: Package) => {
    return useAppMutation<CustomApiResponse>({
        apiRoute: routes.packages.editPackage(packageId),
        method: 'PATCH',
        body: JSON.stringify(data),
        options: {
            enabled: !!data && !!packageId
        }
    });
}


export const useViewPackage = (packageId: string) => {
    const baseQueryKey = generateBaseQueryKeyFromRoute(routes.package.viewPackage(packageId));
    return useAppQuery<Package>({
        apiRoute: routes.package.viewPackage(packageId),
        queryKey: [baseQueryKey],
    });
}
