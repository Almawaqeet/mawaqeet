import { useAppQuery } from "@/api/constructor";
import { routes } from "@/api/routes";

export const useGetAllActivePackages = () => {
    return useAppQuery<Package[]>({
        apiRoute: routes.packages.showAllActivePackages,
        queryKey: ['PACKAGES']
    });
}
