import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product);
    
    // Show feedback for 1 second
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case "organic": return "default";
      case "premium": 
      case "roasted": // For Roasted & Salted Cashews
        return "secondary";
      case "flavored": return "outline";
      default: return "outline";
    }
  };

  const getBadgeText = () => {
    if (product.isFeatured) return "Featured";
    if (product.category === "premium") return "Premium";
    return null;
  };

  return (
    <Card className="card-hover bg-cream-white overflow-hidden shadow-lg h-full flex flex-col" data-testid={`product-card-${product.id}`}>
      <div className="relative overflow-hidden aspect-square">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover image-hover-zoom cursor-pointer"
          />
        </Link>
        {getBadgeText() && (
          <Badge 
            variant={getBadgeVariant(product.category)}
            className="absolute top-4 right-4"
          >
            {getBadgeText()}
          </Badge>
        )}
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif font-semibold text-xl text-midnight mb-2 hover:text-muted-gold transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-stone-gray mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-semibold text-midnight">
              {formatPrice(product.price)}/kg
            </span>
            <span className="text-sm text-stone-gray">{product.weight}</span>
          </div>
          <Button 
            onClick={handleAddToCart}
            disabled={isAdding || product.stock <= 0}
            className={`w-full font-semibold uppercase tracking-wide transition-colors ${
              isAdding 
                ? "bg-green-600 text-white" 
                : "bg-muted-gold text-midnight hover:bg-muted-gold/90"
            }`}
            data-testid={`add-to-cart-${product.id}`}
          >
            {isAdding ? "Added!" : product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
