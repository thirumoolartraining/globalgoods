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
  if (/^https?:\/\//i.test(path)) return path; // absolute URLs untouched
  const clean = path.replace(/^\/+/, "");      // drop leading slashes
  const joined = "/" + clean;                  // ensure exactly one leading slash
  return joined.replace(/\/\/+/g, "/");       // collapse accidental "//" (safe for non-http paths)
}

export async function getProducts() {
  const url = staticUrl("data/products.json");
  console.log("[fetch products.json]", url);
  const r = await fetch(url, { 
    headers: { 
      "accept": "application/json",
      "content-type": "application/json" 
    } 
  });
  if (!r.ok) throw new Error(`Failed to load ${url}: ${r.status} ${r.statusText}`);
  return r.json();
}

// Keep the existing API interface for compatibility
async function fetchStaticData<T>(endpoint: string): Promise<T> {
  if (endpoint === 'products') {
    return getProducts() as unknown as T;
  }
  
  if (endpoint.startsWith('products/')) {
    const products = await getProducts();
    const productId = endpoint.split('/')[1];
    const product = products.find((p: Product) => p.id === productId);
    
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    
    return product as unknown as T;
  }
  
  const path = endpoint.endsWith('.json') ? endpoint : `${endpoint}.json`;
  const url = staticUrl(`data/${path}`);
  
  console.log(`[fetch] ${url}`);
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to load ${endpoint}: ${response.statusText} (${response.status})`);
  }
  
  return response.json();
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
