import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = session?.user?.accessToken;
    config.headers.set('Authorization', `Bearer ${token}`);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    if (response?.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);

      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        signOut()
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Request error:', error.request);
    } else {
      // Error in request setup
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
