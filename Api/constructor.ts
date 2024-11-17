import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

type QueryConfig<TQueryKey, TData> = {
  queryKey: TQueryKey;
  apiRoute: string;
  options?: Omit<AxiosRequestConfig, 'url' | 'method'>;
};

type MutationConfig<TVariables, TData> = {
  apiRoute: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: TVariables;
  options?: Omit<AxiosRequestConfig, 'url' | 'method'> & {
    enabled?: boolean;
  };
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useAppQuery<TData = unknown, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(
  config: QueryConfig<TQueryKey, TData>
): UseQueryResult<TData, TError> {
  const { apiRoute, queryKey, options } = config;

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axiosInstance.get<TData>(apiRoute, options);
      return response?.data;
    },
    retry: 3,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useAppMutation<TData = unknown, TError = unknown, TVariables = unknown>(
  config: MutationConfig<TVariables, TData>
): UseMutationResult<TData, TError, TVariables> {
  const { apiRoute, method, body, options } = config;

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await axiosInstance.request<TData>({
        url: apiRoute,
        method,
        data: body ?? variables,
        ...options,
      });
      return response?.data;
    }
  });
}
