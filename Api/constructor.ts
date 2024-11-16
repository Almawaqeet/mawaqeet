import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/Api/axios";
import { methods } from "@/Constants/api-constants";


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
  /** Request body data */
  body?: any;
}

/**
 * Custom hook for making API requests using react-query
 * @template T The expected response data type
 * @param {ApiHookConfig<T>} config The configuration object for the API request
 * @returns {UseQueryResult<T | null> | UseMutationResult<T | null>} Query or mutation result based on HTTP method
 */
export const useApiHook = <T>({ url, method = 'GET', queryKey = ['default'], body }: ApiHookConfig<T>) => {
  const fetchData = async (): Promise<T | null> => {
    try {
      let response;

      switch (method) {
        case 'GET':
          response = await axiosInstance.get<T>(url);
          break;
        case 'POST':
          response = await axiosInstance.post<T>(url, body);
          break;
        case 'PUT':
          response = await axiosInstance.put<T>(url, body);
          break;
        case 'DELETE':
          response = await axiosInstance.delete<T>(url);
          break;
        case 'PATCH':
          response = await axiosInstance.patch<T>(url, body);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      // Add null check for response
      if (!response) {
        console.warn('API response is null:', { url, method });
        return null;
      }

      return response as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  if (method === methods.GET) {
    return useQuery<T | null>({
      queryKey,
      queryFn: fetchData,
      refetchOnWindowFocus: true,
    });
  }

  return useMutation<T | null>({
    mutationFn: fetchData,
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
