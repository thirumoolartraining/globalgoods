import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PRODUCT_CATEGORIES, PRICE_RANGES, WEIGHT_OPTIONS, SORT_OPTIONS, filterProducts } from "@/lib/products";
import { Search } from "lucide-react";

export default function Shop() {
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    weight: "all",
    sortBy: "popularity",
    search: ""
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = filterProducts(products, filters).filter(product =>
    product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    product.description.toLowerCase().includes(filters.search.toLowerCase())
  );

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      weight: "all",
      sortBy: "popularity",
      search: ""
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Loading Products...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-ivory">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Complete Collection</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-ivory mt-4 mb-6">
            Shop Premium Cashews
          </h1>
          <p className="text-xl text-warm-ivory/80 max-w-3xl mx-auto">
            Browse our complete range of premium cashew products, from raw kernels to gourmet preparations.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-gray h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
                data-testid="search-input"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="bg-warm-ivory rounded-xl p-6 shadow-lg">
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-sm font-semibold text-midnight uppercase tracking-wide block mb-2">
                    Category
                  </label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                    <SelectTrigger className="w-40" data-testid="category-filter">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-midnight uppercase tracking-wide block mb-2">
                    Price Range
                  </label>
                  <Select value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
                    <SelectTrigger className="w-44" data-testid="price-filter">
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_RANGES.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-midnight uppercase tracking-wide block mb-2">
                    Weight
                  </label>
                  <Select value={filters.weight} onValueChange={(value) => updateFilter("weight", value)}>
                    <SelectTrigger className="w-36" data-testid="weight-filter">
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      {WEIGHT_OPTIONS.map((weight) => (
                        <SelectItem key={weight.value} value={weight.value}>
                          {weight.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 items-end">
                <div>
                  <label className="text-sm font-semibold text-midnight uppercase tracking-wide block mb-2">
                    Sort By
                  </label>
                  <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                    <SelectTrigger className="w-44" data-testid="sort-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((sort) => (
                        <SelectItem key={sort.value} value={sort.value}>
                          {sort.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  data-testid="clear-filters-button"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-serif font-semibold text-midnight mb-4">No products found</h3>
              <p className="text-stone-gray mb-6">Try adjusting your filters or search terms.</p>
              <Button onClick={clearFilters} data-testid="no-results-clear-button">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-stone-gray" data-testid="results-count">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
