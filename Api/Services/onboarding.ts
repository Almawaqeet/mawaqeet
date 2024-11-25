import { useAppQuery, useAppMutation, useAppQueryWithPaginationAndParams } from "@/api/constructor";
import { routes } from "@/api/routes";
import { CheckIfEmailAddressExistResponse, OnboardingCreateUserRequest, OnboardingCreateUserResponse, OnboardingInitiatePaymentRequest, OnboardingInitiatePaymentResponse, OnboardingPaymentResponse, OnboardingVerifyPaymentResponse, SimpleOnboardingUser, PaginatedResponse } from "@/api/types";


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


export const useInitiateOnboardingPayment = (body?: OnboardingInitiatePaymentRequest) => {
    return useAppMutation<OnboardingInitiatePaymentResponse>({
        apiRoute: routes.onboarding.initiatePayment,
        method: 'POST',
        body: JSON.stringify(body)
    });
}


export const useVerifyOnboardingPayment = (reference: string) => {
    return useAppQuery<OnboardingVerifyPaymentResponse>({
        apiRoute: routes.onboarding.verifyPayment.replace(':reference', reference),
        queryKey: ['VERIFY_ONBOARDING_PAYMENT', reference]
    });
}


export const useGetOnboardingUsers = (params?: {page: number, name?: string, email?: string}) => {
    return useAppQueryWithPaginationAndParams<PaginatedResponse<SimpleOnboardingUser>>({
        apiRoute: routes.onboarding.getOnboardingUsers,
        queryKey: ['ONBOARDING_USERS', params?.page ?? 1, params?.name ?? '', params?.email ?? ''],
        params
    });
}


export const useGetRecentOnboardingUsers = () => {
    return useAppQuery<SimpleOnboardingUser[]>({
        apiRoute: routes.onboarding.getRecentOnboardingUsers,
        queryKey: ['RECENT_ONBOARDING_USERS']
    });
}
