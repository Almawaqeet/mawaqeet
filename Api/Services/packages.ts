import { ApiMethod, useApiHook } from "@/Api/constructor";
import { methods } from "@/Constants/api-constants";



export const usePackages = () => {
    return useApiHook<Package[]>({
        url: '/core/customer/show-all-active-packages/',
        queryKey: ['PACKAGES'],
        method: methods.GET as ApiMethod
    });
}
