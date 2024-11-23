import { useAppMutation, useAppQuery } from "@/api/constructor";
import { routes } from "@/api/routes";

export const useGetAllActivePackages = () => {
    return useAppQuery<Package[]>({
        apiRoute: routes.packages.showAllActivePackages,
        queryKey: ['GET_ALL_ACTIVE_PACKAGES']
    });
}

export const useGetAllInactivePackages = () => {
    return useAppQuery<Package[]>({
        apiRoute: routes.packages.showAllInactivePackages,
        queryKey: ['GET_ALL_INACTIVE_PACKAGES']
    });
}


export const useCreatePackage = (data: Package) => {
    return useAppMutation<Package>({
        apiRoute: routes.packages.createPackage,
        method: 'POST',
        body: data
    });
}
