import { useAppMutation, useAppQuery } from '@/api/client-constructor';
import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
  SendOtpResponse,
  VerifyOtpRequest,
  SendOtpRequest,
  VerifyOtpResponse,
  UserProfile,
  EditUserProfileRequest,
} from '@/api/types';

export const useLogin = (body?: LoginRequest) => {
  return useAppMutation<LoginResponse>({
    apiRoute: routes.auth.login,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useSendOtp = (body?: SendOtpRequest) => {
  return useAppMutation<SendOtpResponse>({
    apiRoute: routes.auth.sendOtp,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useVerifyOtp = (body?: VerifyOtpRequest) => {
  return useAppMutation<VerifyOtpResponse>({
    apiRoute: routes.auth.verifyOtp,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useChangePassword = (body?: ChangePasswordRequest) => {
  return useAppMutation<ChangePasswordResponse>({
    apiRoute: routes.auth.changePassword,
    method: 'POST',
    body: JSON.stringify(body),
  });
};


export const useViewProfile = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(routes.auth.viewProfile);
  return useAppQuery<UserProfile>({
    apiRoute: routes.auth.viewProfile,
    queryKey: [baseQueryKey]
  });
};

export const useEditProfile = (body?: EditUserProfileRequest) => {
  return useAppMutation<UserProfile>({
    apiRoute: routes.auth.editProfile,
    method: 'PATCH',
    body: JSON.stringify(body)
  });
};
