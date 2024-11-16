import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/Api/axios";


/**
 * Type representing valid HTTP methods for API requests
 */
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Configuration interface for the API hook
 * @template T The expected response data type
 */
interface ApiHookConfig<T = any> {
  /** The API endpoint URL */
  url: string;
  /** The HTTP method to use (defaults to GET) */
  method?: ApiMethod;
  /** Array of strings used as cache key for react-query */
  queryKey?: string[];
}

/**
 * Custom hook for making API requests using react-query
 * @template T The expected response data type
 * @param {ApiHookConfig<T>} config The configuration object for the API request
 * @returns {UseQueryResult<T | null> | UseMutationResult<T | null>} Query or mutation result based on HTTP method
 */
export const useApiHook = <T>({ url, method = 'GET', queryKey = ['default'] }: ApiHookConfig<T>) => {
  const fetchData = async (): Promise<T | null> => {
    let response;
    if (method === 'GET') {
      response = await axiosInstance.get<T>(url);
    } else if (method === 'POST') {
      response = await axiosInstance.post<T>(url);
    } else if (method === 'PUT') {
      response = await axiosInstance.put<T>(url);
    } else if (method === 'DELETE') {
      response = await axiosInstance.delete<T>(url);
    } else if (method === 'PATCH') {
      response = await axiosInstance.patch<T>(url);
    }
    return response?.data ?? null;
  };

  if (method === 'GET') {
    return useQuery<T | null>({
      queryKey,
      queryFn: fetchData
    });
  }

  return useMutation<T | null>({
    mutationFn: fetchData
  });
};

// // Example usage for packages
// interface Package {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

//  export const usePackages = () => {
//   return useApiHook<Package[]>({
//     url: '/packages',
//     queryKey: ['packages'],
//     method: methods.GET as ApiMethod
//   });
//  };
