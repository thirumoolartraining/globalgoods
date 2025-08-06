import { Product } from "@shared/schema";

export const PRODUCT_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "raw", label: "Raw" },
  { value: "roasted", label: "Roasted" },
  { value: "flavored", label: "Flavored" },
  { value: "organic", label: "Organic" },
  { value: "premium", label: "Premium" },
  { value: "pieces", label: "Pieces" },
  { value: "processed", label: "Processed" }
];

export const PRICE_RANGES = [
  { value: "all", label: "All Prices" },
  { value: "0-1000", label: "Under ₹1,000" },
  { value: "1000-1500", label: "₹1,000 - ₹1,500" },
  { value: "1500-2000", label: "₹1,500 - ₹2,000" },
  { value: "2000+", label: "Above ₹2,000" }
];

export const WEIGHT_OPTIONS = [
  { value: "all", label: "All Sizes" },
  { value: "small", label: "250g - 1kg" },
  { value: "medium", label: "1kg - 10kg" },
  { value: "bulk", label: "10kg+" }
];

export const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" }
];

export function filterProducts(
  products: Product[],
  filters: {
    category?: string;
    priceRange?: string;
    weight?: string;
    sortBy?: string;
  }
): Product[] {
  let filtered = [...products];

  // Filter by category
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  // Filter by price range
  if (filters.priceRange && filters.priceRange !== "all") {
    const price = parseFloat(filters.priceRange);
    if (filters.priceRange === "0-1000") {
      filtered = filtered.filter(product => parseFloat(product.price) < 1000);
    } else if (filters.priceRange === "1000-1500") {
      filtered = filtered.filter(product => {
        const p = parseFloat(product.price);
        return p >= 1000 && p <= 1500;
      });
    } else if (filters.priceRange === "1500-2000") {
      filtered = filtered.filter(product => {
        const p = parseFloat(product.price);
        return p >= 1500 && p <= 2000;
      });
    } else if (filters.priceRange === "2000+") {
      filtered = filtered.filter(product => parseFloat(product.price) > 2000);
    }
  }

  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        // For demo purposes, reverse order
        filtered.reverse();
        break;
      case "popularity":
      default:
        // Keep original order (most popular first)
        break;
    }
  }

  return filtered;
}

export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return `₹${numPrice.toLocaleString()}`;
}
