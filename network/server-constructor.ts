import { AxiosError } from "axios";
import serverAxiosInstance from "./server-axios";

interface ServerGetConfig {
  params?: Record<string, any>;
  headers?: Record<string, any>;
}

export const createServerAxiosInstance = async (
  url: string,
  config?: ServerGetConfig
) => {
  try {
    if (!url) throw new Error('URL is required');

    const response = await serverAxiosInstance.get(url, {
      params: config?.params,
      headers: config?.headers,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Server request error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
};
