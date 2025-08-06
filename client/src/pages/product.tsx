import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/products";
import { useState } from "react";
import { Minus, Plus, Shield, Truck, Award, Globe } from "lucide-react";
import { Link } from "wouter";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Loading Product...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Product Not Found</h1>
            <p className="text-stone-gray mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

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
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-xl shadow-2xl"
                data-testid="product-image"
              />
              {getBadgeText() && (
                <Badge className="absolute top-6 right-6 text-lg px-4 py-2">
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
                  <span className={`font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-midnight">Quantity:</span>
                  <div className="flex items-center border border-stone-gray/20 rounded">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(-1)}
                      disabled={quantity <= 1}
                      data-testid="decrease-quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-semibold" data-testid="quantity-display">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(1)}
                      data-testid="increase-quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isAdding || !product.inStock}
                    className={`w-full font-semibold uppercase tracking-wide ${
                      isAdding 
                        ? "bg-green-600 text-white" 
                        : "bg-muted-gold text-midnight hover:bg-muted-gold/90"
                    }`}
                    data-testid="add-to-cart-button"
                  >
                    {isAdding ? "Added to Cart!" : product.inStock ? "Add to Cart" : "Out of Stock"}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-muted-gold" />
                    <span className="text-sm text-stone-gray">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-muted-gold" />
                    <span className="text-sm text-stone-gray">Fast Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-muted-gold" />
                    <span className="text-sm text-stone-gray">Premium Grade</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-muted-gold" />
                    <span className="text-sm text-stone-gray">Export Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-midnight mb-4">Quality Certifications</h2>
            <p className="text-stone-gray">Trusted by global standards and regulatory bodies</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "🏆", title: "ISO 22000", subtitle: "Food Safety Management" },
              { icon: "🌱", title: "FSSAI", subtitle: "Food Safety Standards" },
              { icon: "🌍", title: "APEDA", subtitle: "Export Certification" },
              { icon: "🌿", title: "Organic", subtitle: "Certified Organic" }
            ].map((cert, index) => (
              <Card key={index} className="text-center bg-warm-ivory border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{cert.icon}</div>
                  <h3 className="font-semibold text-midnight mb-1">{cert.title}</h3>
                  <p className="text-stone-gray text-sm">{cert.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-midnight">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-warm-ivory mb-4">Related Products</h2>
              <p className="text-warm-ivory/80">More products from the same category</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="bg-cream-white overflow-hidden shadow-lg">
                  <Link href={`/product/${relatedProduct.id}`}>
                    <img 
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/product/${relatedProduct.id}`}>
                      <h3 className="font-serif font-semibold text-lg text-midnight mb-2 hover:text-muted-gold transition-colors cursor-pointer">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-stone-gray text-sm mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-midnight">{formatPrice(relatedProduct.price)}/kg</span>
                      <Link href={`/product/${relatedProduct.id}`}>
                        <Button size="sm" variant="outline">View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
