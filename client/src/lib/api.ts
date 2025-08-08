// API base URL - handles both development and production environments
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:5001/api'  // Updated port to 5001 to match Express server
  : '/api';

/**
 * Makes an API request with proper error handling
 */
async function apiRequest<T = any>(
  endpoint: string,
  method: string = 'GET',
  data?: unknown
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  console.log(`[API] ${method} ${url}`, { data });
  
  const headers: HeadersInit = {};
  if (data) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        'Accept': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: import.meta.env.DEV ? 'include' : 'same-origin',
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = await response.text();
      }
      
      console.error(`[API Error] ${response.status} ${response.statusText}`, {
        url,
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      
      const error = new Error(
        errorData?.message || errorData || 'API request failed'
      );
      (error as any).status = response.status;
      (error as any).data = errorData;
      throw error;
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    console.error('[API Request Error]', {
      url,
      method,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

// Helper methods for common HTTP methods
export const api = {
  get: <T = any>(endpoint: string) => apiRequest<T>(endpoint, 'GET'),
  post: <T = any>(endpoint: string, data?: unknown) =>
    apiRequest<T>(endpoint, 'POST', data),
  put: <T = any>(endpoint: string, data?: unknown) =>
    apiRequest<T>(endpoint, 'PUT', data),
  delete: <T = any>(endpoint: string) => apiRequest<T>(endpoint, 'DELETE'),
};
