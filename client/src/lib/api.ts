import type { Product } from "@/lib/types";

// Cache for products to avoid multiple fetches
let productsCache: Product[] | null = null;

/**
 * Normalizes a path for static assets to ensure consistent URL format
 * @param path The path to normalize (can be relative, absolute, or full URL)
 * @returns A normalized path that works in all environments
 */
export function staticUrl(path: string): string {
  if (!path) return "/";
  
  // Already an absolute URL, return as-is
  if (/^https?:\/\//i.test(path)) return path;
  
  // Already site-absolute path, ensure it starts with exactly one slash
  if (path.startsWith("/")) return `/${path.replace(/^\/+/, '')}`;
  
  // Relative path, normalize to site-absolute
  return `/${path.replace(/^\.?\//, '')}`;
}

/**
 * Fetches data from static JSON files
 */
async function fetchStaticData<T>(endpoint: string): Promise<T> {
  // Handle individual product requests (e.g., products/raw-w320)
  if (endpoint.startsWith('products/') && endpoint !== 'products') {
    const productId = endpoint.split('/')[1];
    
    try {
      // Always fetch fresh products to ensure we have the latest data
      const products = await fetchStaticData<Product[]>('products');
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      
      return product as unknown as T;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to load product: ${errorMessage}`);
    }
  }
  
  // Handle regular data fetching
  const path = endpoint.endsWith('.json') ? endpoint : `${endpoint}.json`;
  const url = staticUrl(`data/${path}`);
  
  console.log(`[Static Data] Fetching ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load ${endpoint}: ${response.statusText} (${response.status})`);
    }
    
    const data = await response.json();
    
    // Cache products if we're fetching the products list
    if (endpoint === 'products') {
      productsCache = data as Product[];
    }
    
    return data;
  } catch (error) {
    console.error(`[Static Data Error] Failed to fetch ${endpoint}:`, error);
    throw new Error(`Failed to load ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper methods for common data fetching
export const api = {
  /**
   * Fetches data from a static JSON file
   * @param endpoint The endpoint to fetch (e.g., 'products' or 'products/123')
   * @returns A promise that resolves to the fetched data
   */
  get: <T = any>(endpoint: string): Promise<T> => fetchStaticData<T>(endpoint),
  
  /**
   * Not supported in static mode
   */
  post: async (): Promise<never> => { 
    throw new Error('POST not supported in static mode'); 
  },
  
  /**
   * Not supported in static mode
   */
  put: async (): Promise<never> => { 
    throw new Error('PUT not supported in static mode'); 
  },
  
  /**
   * Not supported in static mode
   */
  delete: async (): Promise<never> => { 
    throw new Error('DELETE not supported in static mode'); 
  },
};
