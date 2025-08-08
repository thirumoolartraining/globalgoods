import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/products";
import { useState, useCallback, useEffect } from "react";
import { Minus, Plus, Shield, Truck, Award, AlertCircle } from "lucide-react";
import { ImageGallery } from "@/components/image-gallery";
import { Link } from "wouter";
import { MINIMUM_ORDER_QUANTITY, QUANTITY_INCREMENT, getNextValidQuantity } from "@/lib/constants";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Extend the base Product type with frontend-specific properties
interface ExtendedProduct extends Product {
  features?: string[];
  inStock?: boolean;
  isOrganic?: boolean;
  grade?: string;
  tags?: string[];
}

// Create a separate component for the product content to ensure hooks are called consistently
function ProductContent({ product, allProducts }: { product: ExtendedProduct; allProducts: ExtendedProduct[] }) {
  const [quantity, setQuantity] = useState(MINIMUM_ORDER_QUANTITY);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const [showQuantityError, setShowQuantityError] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (showQuantityError) return;
    
    setIsAdding(true);
    
    // Add item to cart
    addItem({
      ...product,
      // Ensure price is a number
      price: Number(product.price)
    }, quantity);
    
    // Show success feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  }, [addItem, product, quantity, showQuantityError]);

  const updateQuantity = useCallback((change: 1 | -1) => {
    setQuantity(prev => {
      const newQuantity = getNextValidQuantity(prev, change);
      return newQuantity;
    });
  }, []);

  // Validate quantity when it changes
  useEffect(() => {
    setShowQuantityError(quantity < MINIMUM_ORDER_QUANTITY);
  }, [quantity]);

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const getBadgeText = () => {
    if (product.isOrganic) return "Organic";
    if (product.category === "premium") return "Premium";
    if (product.tags?.includes("popular")) return "Popular";
    return null;
  };

  return (
    <div className="min-h-screen bg-warm-ivory">
      {/* Product Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image Gallery */}
              <div className="relative">
                <ImageGallery 
                  images={product.images || [product.image]} 
                  className="w-full"
                />
                {getBadgeText() && (
                  <Badge className="absolute top-6 right-6 text-lg px-4 py-2 z-10">
                    {getBadgeText()}
                  </Badge>
                )}
              </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-midnight mb-4" data-testid="product-name">
                  {product.name}
                </h1>
                <p className="text-xl text-stone-gray leading-relaxed" data-testid="product-description">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-4xl font-semibold text-midnight" data-testid="product-price">
                  {formatPrice(product.price)}/kg
                </span>
                <Badge variant="outline" className="text-muted-gold border-muted-gold">
                  Grade: {product.grade}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-midnight">Weight Options:</span>
                  <span className="text-stone-gray">{product.weight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-midnight">Category:</span>
                  <span className="text-stone-gray capitalize">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-midnight">Availability:</span>
                  <span className="font-semibold text-green-600">
                    In Stock
                  </span>
                </div>
              </div>

              <Separator />

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-midnight">Quantity (kg):</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertCircle className="h-4 w-4 text-stone-400 hover:text-midnight cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px]">
                          <p>Minimum order quantity: {MINIMUM_ORDER_QUANTITY}kg</p>
                          <p>Order in increments of {QUANTITY_INCREMENT}kg</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {showQuantityError && (
                      <span className="text-sm text-red-600">
                        Min {MINIMUM_ORDER_QUANTITY}kg
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center border rounded ${
                    showQuantityError ? 'border-red-500' : 'border-stone-gray/20'
                  }`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(-1)}
                      disabled={quantity <= MINIMUM_ORDER_QUANTITY}
                      data-testid="decrease-quantity"
                      className="hover:bg-stone-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span 
                      className={`px-4 py-2 font-semibold min-w-[60px] text-center ${
                        showQuantityError ? 'text-red-600' : ''
                      }`} 
                      data-testid="quantity-display"
                    >
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(1)}
                      data-testid="increase-quantity"
                      className="hover:bg-stone-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isAdding || showQuantityError}
                    className={`w-full font-semibold uppercase tracking-wide ${
                      isAdding 
                        ? "bg-green-600 text-white" 
                        : showQuantityError
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-muted-gold text-midnight hover:bg-muted-gold/90"
                    }`}
                    data-testid="add-to-cart-button"
                  >
                    {isAdding 
                      ? "Added to Cart!" 
                      : showQuantityError 
                        ? `Minimum ${MINIMUM_ORDER_QUANTITY}kg`
                        : `Add ${quantity}kg to Cart`}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-midnight text-midnight font-semibold uppercase tracking-wide hover:bg-midnight hover:text-warm-ivory"
                    data-testid="bulk-quote-button"
                  >
                    Request Bulk Quote
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Product Features */}
              <div className="space-y-4">
                <h3 className="font-serif font-semibold text-xl text-midnight">Product Features</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span className="text-stone-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Shipping & Guarantee */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-muted-gold" />
                  <p className="text-sm text-stone-gray">Free Shipping on orders over $50</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-muted-gold" />
                  <p className="text-sm text-stone-gray">Quality Guarantee</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-muted-gold" />
                  <p className="text-sm text-stone-gray">Premium Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-midnight mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <Link href={`/product/${relatedProduct.id}`}>
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-midnight mb-1">{relatedProduct.name}</h3>
                    <p className="text-muted-gold font-medium mb-2">{formatPrice(relatedProduct.price)}/kg</p>
                    <Link href={`/product/${relatedProduct.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  
  // Fetch all products
  const { data: allProducts = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    enabled: !!id,
  });

  // Find the specific product from the allProducts array
  const product = allProducts.find(p => p.id === id);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-midnight mb-4">
              Loading Product...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  // Handle missing ID or product not found
  if (!id || !product) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-midnight mb-4">
              {!id ? 'Product ID not found' : 'Product Not Found'}
            </h1>
            <p className="text-stone-gray mb-6">
              {!id 
                ? 'No product ID was provided.' 
                : 'The product you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <Link href="/shop" className="inline-block">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there was an API error
  if (error) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Error Loading Product</h1>
            <p className="text-stone-gray mb-6">There was a problem loading the product. Please try again later.</p>
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
              <Link href="/shop">
                <Button>Back to Shop</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // All the state and handlers are now in the ProductContent component

  // Render the ProductContent component with the fetched data
  return <ProductContent product={product} allProducts={allProducts} />;
}
