import { useAppQuery, useAppMutation } from "@/Api/constructor";
import { routes } from "@/Api/routes";
import { CheckIfEmailAddressExistResponse, OnboardingPaymentResponse } from "@/Api/types";


export const useCheckIfEmailAddressExist = (body?: {email: string}) => {
    console.log('body', body)
    return useAppMutation<CheckIfEmailAddressExistResponse>({
        apiRoute: routes.onboarding.checkIfEmailAddressExist,
        method: 'POST',
        body: JSON.stringify(body),
        options: {
            enabled: !!body?.email
        }
    });
}

export const useGetOnboardingPaymentAmount = () => {
    return useAppQuery<OnboardingPaymentResponse>({
        apiRoute: routes.onboarding.getOnboardingPaymentAmount,
        queryKey: ['ONBOARDING_PAYMENT_AMOUNT']
    });
}


export const useCreateOnboardingPayment = ({amount, email}: {amount: number, email: string}) => {
    return useAppMutation<OnboardingPaymentResponse>({
        apiRoute: routes.onboarding.initiatePayment,
        method: 'POST',
        body: {
            amount,
            email
        }
    });
}
