import { QueryClient } from "@tanstack/react-query";
import { api } from "./api";

// Create a query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url, params] = queryKey as [string, Record<string, unknown> | undefined];
        
        // If it's a full URL, use it as is, otherwise prepend the API base URL
        const endpoint = url.startsWith('http') ? url : url.startsWith('/') ? url : `/${url}`;
        
        // Handle query parameters
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        
        const queryString = queryParams.toString();
        const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        return api.get(fullUrl);
      },
      retry: (failureCount, error: any) => {
        // Don't retry on 404s or 401s
        if (error?.status === 404 || error?.status === 401) {
          return false;
        }
        // Retry other errors up to 3 times
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime was renamed to gcTime in v5)
    },
  },
});
