import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/products";
import { Link } from "wouter";

export function CartSidebar() {
  const { items, totalPrice, isOpen, setIsOpen, updateQuantity, removeItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-96 bg-cream-white">
        <SheetHeader>
          <SheetTitle className="text-xl font-serif font-semibold text-midnight">Your Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-stone-gray text-center py-8">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-stone-gray/20" data-testid={`cart-item-${item.id}`}>
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-midnight">{item.name}</h4>
                      <p className="text-stone-gray">{formatPrice(item.price)}/kg</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        data-testid={`decrease-quantity-${item.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold w-8 text-center" data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`increase-quantity-${item.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 ml-2"
                        onClick={() => removeItem(item.id)}
                        data-testid={`remove-item-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-stone-gray/20 pt-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-midnight">Total:</span>
                  <span className="font-semibold text-xl text-midnight" data-testid="cart-total">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <Button 
                    className="w-full bg-muted-gold text-midnight font-semibold hover:bg-muted-gold/90 mb-2"
                    data-testid="view-cart-button"
                  >
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button 
                    className="w-full bg-midnight text-warm-ivory font-semibold hover:bg-midnight/90"
                    data-testid="checkout-button"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
