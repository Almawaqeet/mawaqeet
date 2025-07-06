import axiosInstance from '@/network/axios';

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

    const response = await axiosInstance.get(`${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      params: config?.params,
    });
    console.log('yoyo', response);
    return response;
  } catch (error) {
    // console.error('Server GET request failed:', error);
    throw error;
  }
};
