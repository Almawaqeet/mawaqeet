import { useAppQuery } from "@/Api/constructor";
import { routes } from "@/Api/routes";

export const useGetAllActivePackages = () => {
    return useAppQuery<Package[]>({
        apiRoute: routes.packages.showAllActivePackages,
        queryKey: ['PACKAGES']
    });
}
