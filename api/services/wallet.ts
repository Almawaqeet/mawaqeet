import {
  useAppQuery,
  useAppMutation,
  useAppQueryWithPaginationAndParams,
} from '@/api/client-constructor';
import { generateBaseQueryKeyFromRoute, routes } from '@/api/routes';
import {
  BankListResponse,
  CheckIfUserHasAWalletResponse,
  CheckWalletInformationResponse,
  CreateAndEditWalletRequest,
  CustomApiErrorResponse,
  VerifyWalletAccountNumberResponse,
  VerifyWalletAccountNumberRequest,
  VerifyWalletAccountNumberErrorResponse,
  WalletTransactionResponse,
  CustomApiResponse,
} from '@/api/types';

export const useCheckIfUserHasAWallet = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.wallet.checkIfUserHasWallet
  );
  return useAppQuery<CheckIfUserHasAWalletResponse>({
    apiRoute: routes.wallet.checkIfUserHasWallet,
    queryKey: [baseQueryKey],
  });
};

export const useCheckWalletInformation = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.wallet.checkWalletInformation
  );
  return useAppQuery<CheckWalletInformationResponse>({
    apiRoute: routes.wallet.checkWalletInformation,
    queryKey: [baseQueryKey],
  });
};

export const useGetBankList = () => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.wallet.getBanksOnWalletCreation
  );
  return useAppQuery<BankListResponse>({
    apiRoute: routes.wallet.getBanksOnWalletCreation,
    queryKey: [baseQueryKey],
  });
};

export const useCreateWallet = (body?: CreateAndEditWalletRequest) => {
  return useAppMutation<
    CheckWalletInformationResponse | CustomApiErrorResponse
  >({
    apiRoute: routes.wallet.createWallet,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useEditWallet = (body?: CreateAndEditWalletRequest) => {
  return useAppMutation<
    CheckWalletInformationResponse | CustomApiErrorResponse
  >({
    apiRoute: routes.wallet.createWallet,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

export const useVerifyWalletAccountNumber = (
  body?: VerifyWalletAccountNumberRequest
) => {
  return useAppMutation<
    VerifyWalletAccountNumberResponse | VerifyWalletAccountNumberErrorResponse
  >({
    apiRoute: routes.wallet.verifyWalletAccountNumber,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useRequestPayout = (body?: { amount: number }) => {
  return useAppMutation<CustomApiResponse>({
    apiRoute: routes.wallet.requestPayout,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const useGetWalletTransactions = (params?: Record<string, any>) => {
  const baseQueryKey = generateBaseQueryKeyFromRoute(
    routes.wallet.walletTransactions
  );

  return useAppQueryWithPaginationAndParams<WalletTransactionResponse>({
    apiRoute: routes.wallet.walletTransactions,
    queryKey: [baseQueryKey, params],
    params,
  });
};
