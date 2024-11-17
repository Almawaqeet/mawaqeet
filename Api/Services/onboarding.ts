import { useAppQuery, useAppMutation } from "@/api/constructor";
import { routes } from "@/api/routes";
import { CheckIfEmailAddressExistResponse, OnboardingCreateUserRequest, OnboardingCreateUserResponse, OnboardingPaymentResponse } from "@/api/types";


export const useCheckIfEmailAddressExist = (body?: {email: string}) => {
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

export const useCreateOnboardingUser = (body?: OnboardingCreateUserRequest) => {
    return useAppMutation<OnboardingCreateUserResponse>({
        apiRoute: routes.onboarding.createUser,
        method: 'POST',
        body: JSON.stringify(body)
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
