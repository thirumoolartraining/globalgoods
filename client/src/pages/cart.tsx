import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/products";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-ivory">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingCart className="h-24 w-24 text-stone-gray mx-auto mb-6" />
              <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-stone-gray mb-8">
                Looks like you haven't added any premium cashews to your cart yet.
              </p>
              <Link href="/shop">
                <Button 
                  size="lg"
                  className="bg-muted-gold text-midnight px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold/90"
                  data-testid="continue-shopping-button"
                >
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-ivory">
      {/* Hero Section */}
      <section className="py-16 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-ivory mb-4">
                Shopping Cart
              </h1>
              <p className="text-warm-ivory/80">
                Review your selected premium cashew products
              </p>
            </div>
            <Link href="/shop">
              <Button 
                variant="outline"
                className="border-2 border-warm-ivory text-warm-ivory hover:bg-warm-ivory hover:text-midnight"
                data-testid="back-to-shop-button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="bg-cream-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-midnight">
                    Cart Items ({items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      {index > 0 && <Separator />}
                      <div className="flex items-center space-x-6 py-4" data-testid={`cart-item-${item.id}`}>
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg shadow-md"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-serif font-semibold text-xl text-midnight mb-2">
                            {item.name}
                          </h3>
                          <p className="text-stone-gray mb-4">
                            {formatPrice(item.price)}/kg
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-semibold text-midnight uppercase tracking-wide">
                              Quantity:
                            </span>
                            <div className="flex items-center border border-stone-gray/20 rounded">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                data-testid={`decrease-quantity-${item.id}`}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span 
                                className="px-4 py-2 font-semibold text-lg min-w-16 text-center" 
                                data-testid={`quantity-${item.id}`}
                              >
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                data-testid={`increase-quantity-${item.id}`}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-semibold text-midnight mb-4" data-testid={`item-total-${item.id}`}>
                            {formatPrice(parseFloat(item.price) * item.quantity)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                            data-testid={`remove-item-${item.id}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Cart Summary */}
            <div>
              <Card className="bg-cream-white shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-midnight">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-stone-gray">
                      <span>Subtotal:</span>
                      <span data-testid="subtotal">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-stone-gray">
                      <span>Shipping:</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-stone-gray">
                      <span>Tax:</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-midnight">Total:</span>
                      <span 
                        className="text-2xl font-bold text-midnight" 
                        data-testid="cart-total"
                      >
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/checkout">
                      <Button 
                        size="lg"
                        className="w-full bg-muted-gold text-midnight font-semibold uppercase tracking-wide hover:bg-muted-gold/90"
                        data-testid="proceed-checkout-button"
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-midnight text-midnight font-semibold uppercase tracking-wide hover:bg-midnight hover:text-warm-ivory"
                      data-testid="request-quote-button"
                    >
                      Request Bulk Quote
                    </Button>
                  </div>

                  <div className="bg-warm-ivory p-4 rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">💡 Bulk Orders</h4>
                    <p className="text-stone-gray text-sm">
                      Looking for larger quantities? Contact us for special bulk pricing and custom packaging options.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card className="bg-warm-ivory border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Premium Quality</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">🚚</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Fast Shipping</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">🔒</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Secure Payment</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">↩️</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Easy Returns</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
