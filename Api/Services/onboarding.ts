import { ApiMethod, useApiHook } from "@/Api/constructor";
import { methods } from "@/Constants/api-constants";
import { routes } from "@/Api/routes";
import { CheckIfEmailAddressExistResponse, OnboardingPaymentResponse } from "@/Api/types";


export const useCheckIfEmailAddressExist = (email: string) => {
    return useApiHook<CheckIfEmailAddressExistResponse>({
        url: routes.onboarding.checkIfEmailAddressExist,
        method: methods.POST as ApiMethod,
        body: {
            email: email
        }
    });
}

export const useGetOnboardingPaymentAmount = () => {
    return useApiHook<OnboardingPaymentResponse>({
        url: routes.onboarding.getOnboardingPaymentAmount,
        method: methods.GET as ApiMethod,
        queryKey: ['ONBOARDING_PAYMENT_AMOUNT']
    });
}
