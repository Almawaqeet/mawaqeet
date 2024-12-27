import { useAppMutation } from '@/api/client-constructor';
import { routes } from '@/api/routes';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
  SendOtpResponse,
  VerifyOtpRequest,
  SendOtpRequest,
  VerifyOtpResponse,
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
