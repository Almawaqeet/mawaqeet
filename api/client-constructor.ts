import {
    useQuery,
    useMutation,
    UseQueryResult,
    UseMutationResult,
  } from '@tanstack/react-query';
  import axios, { AxiosRequestConfig } from 'axios';
  import { getSession } from 'next-auth/react';
  import { API_URL } from '@/environment-config';

  type QueryConfig<TQueryKey, TData> = {
    queryKey: TQueryKey;
    apiRoute: string;
    options?: Omit<AxiosRequestConfig, 'url' | 'method'>;
  };

  type QueryConfigWithParams<TQueryKey, TData> = QueryConfig<TQueryKey, TData> & {
    params?: Record<string, string | number | boolean | null>;
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
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export function useAppQuery<
    TData = unknown,
    TError = unknown,
    TQueryKey extends Array<unknown> = unknown[],
  >(config: QueryConfig<TQueryKey, TData>): UseQueryResult<TData, TError> {
    const { queryKey, apiRoute, options } = config;

    return useQuery({
      queryKey,
      queryFn: async () => {
        const session = await getSession();
        const token = session?.user?.accessToken ?? '';

        const response = await axiosInstance.get<TData>(apiRoute, {
          ...options,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response?.data;
      },
      retry: 3,
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
  }

  export function useAppQueryWithPaginationAndParams<
    TData = unknown,
    TError = unknown,
    TQueryKey extends Array<unknown> = unknown[],
  >(
    config: QueryConfigWithParams<TQueryKey, TData>
  ): UseQueryResult<TData, TError> {
    const { apiRoute, queryKey, options, params } = config;

    return useQuery({
      queryKey,
      queryFn: async () => {
        const session = await getSession();
        const token = session?.user?.accessToken ?? '';

        const queryParams = params
          ? Object.entries(params).reduce(
              (acc, [key, value]) => {
                if (value !== null && value !== undefined) {
                  acc[key] =
                    typeof value === 'string' ? value.toLowerCase() : value;
                }
                return acc;
              },
              {} as Record<string, any>
            )
          : undefined;

        const response = await axiosInstance.get<{
          count: number;
          next: string | null;
          previous: string | null;
          results: TData[];
        }>(apiRoute, {
          ...options,
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return (
          response?.data ?? {
            count: 0,
            next: null,
            previous: null,
            results: [],
          }
        );
      },
      retry: 3,
      staleTime: 1000 * 60 * 5,
    });
  }

  export function useAppMutation<
    TData = unknown,
    TError = unknown,
    TVariables = unknown,
  >(
    config: MutationConfig<TVariables, TData>
  ): UseMutationResult<TData, TError, TVariables> {
    const { apiRoute, method, body, options } = config;

    return useMutation({
      mutationFn: async (variables: TVariables) => {
        const session = await getSession();
        const token = session?.user?.accessToken ?? '';

        const response = await axiosInstance.request<TData>({
          url: apiRoute,
          method,
          data: body ?? variables,
          ...options,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response?.data;
      },
      retry: 0, // Only try once
    });
  }
