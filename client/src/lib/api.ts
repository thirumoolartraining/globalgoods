import type { Product } from "@shared/types";

// Cache for products to avoid multiple fetches
let productsCache: Product[] | null = null;

/**
 * Fetches data from static JSON files
 */
async function fetchStaticData<T>(endpoint: string): Promise<T> {
  // Handle individual product requests (e.g., products/raw-w320)
  if (endpoint.startsWith('products/') && endpoint !== 'products') {
    const productId = endpoint.split('/')[1];
    await new Promise(resolve => setTimeout(resolve, 0)); // Ensure we don't block the main thread
    
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
  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = `/data/${path}.json`;
  
  console.log(`[Static Data] Fetching ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load ${endpoint}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Cache products if we're fetching the products list
    if (endpoint === 'products') {
      productsCache = data as Product[];
    }
    
    return data;
  } catch (error) {
    console.error(`[Static Data Error] Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

// Helper methods for common data fetching
export const api = {
  get: <T = any>(endpoint: string) => fetchStaticData<T>(endpoint),
  // These methods are kept for compatibility but will throw errors if used
  post: async () => { throw new Error('POST not supported in static mode'); },
  put: async () => { throw new Error('PUT not supported in static mode'); },
  delete: async () => { throw new Error('DELETE not supported in static mode'); },
};
