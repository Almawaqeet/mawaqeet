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

    // Construct query string from params
    const queryParams = config?.params
      ? '?' + new URLSearchParams(config.params).toString()
      : '';

    const response = await fetch(`${process.env.SERVER_API_BASE_URL}${url}${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
