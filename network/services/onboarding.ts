import {
  useAppQuery,
  useAppMutation,
  useAppQueryWithPaginationAndParams,
} from '@/network/client-constructor';
import { generateBaseQueryKeyFromRoute, routes } from '@/network/routes';
import {
  CheckIfEmailAddressExistResponse,
  OnboardingCreateUserRequest,
  OnboardingCreateUserResponse,
  OnboardingInitiatePaymentRequest,
  InitiatePaymentResponse,
  OnboardingPaymentResponse,
  OnboardingVerifyPaymentResponse,
  PreBookPackageRequest,
  PreBookPackageResponse,
  SimpleOnboardingUser,
} from '@/network/types';

export const useCheckIfEmailAddressExist = (body?: { email: string }) => {
  return useAppMutation<CheckIfEmailAddressExistResponse>({
    apiRoute: routes.onboarding.checkIfEmailAddressExist,
    method: 'POST',
    body: JSON.stringify(body),
    options: {
      enabled: !!body?.email,
    },
  });
};

export const useGetOnboardingPaymentAmount = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.onboarding.getOnboardingPaymentAmount
  );
  return useAppQuery<OnboardingPaymentResponse>({
    apiRoute: routes.onboarding.getOnboardingPaymentAmount,
    queryKey: [baseQueryKey],
  });
};

export const useCreateOnboardingUser = (body?: OnboardingCreateUserRequest) => {
  return useAppMutation<OnboardingCreateUserResponse>({
    apiRoute: routes.onboarding.createUser,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useInitiateOnboardingPayment = (
  body?: OnboardingInitiatePaymentRequest
) => {
  return useAppMutation<InitiatePaymentResponse>({
    apiRoute: routes.onboarding.initiatePayment,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useVerifyOnboardingPayment = (reference: string) => {
  return useAppQuery<OnboardingVerifyPaymentResponse>({
    apiRoute: routes.onboarding.verifyPayment.replace(':reference', reference),
    queryKey: ['VERIFY_ONBOARDING_PAYMENT', reference],
    options: {
      enabled: !!reference,
    },
  });
};

export const useGetOnboardingUsers = (params?: {
  page: number;
  name?: string;
  status?: string;
  email?: string;
}) => {
  return useAppQueryWithPaginationAndParams<SimpleOnboardingUser>({
    apiRoute: routes.onboarding.getOnboardingUsers,
    queryKey: ['ONBOARDING_USERS', params && params],
    params: params,
  });
};

export const useGetRecentOnboardingUsers = () => {
  return useAppQuery<SimpleOnboardingUser[]>({
    apiRoute: routes.onboarding.getRecentOnboardingUsers,
    queryKey: ['RECENT_ONBOARDING_USERS'],
  });
};

export const usePreBookPackage = (
  packageId: string,
  body?: PreBookPackageRequest
) => {
  return useAppMutation<PreBookPackageResponse>({
    apiRoute: routes.package.preBookPackage(packageId),
    method: 'POST',
    body: JSON.stringify(body),
    options: {
      enabled: !!packageId && !!body?.email && !!body?.category,
    },
  });
};
