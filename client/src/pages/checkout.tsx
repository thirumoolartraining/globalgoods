import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertOrderSchema, InsertOrder } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/products";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { ArrowLeft, CreditCard, Truck, Shield, AlertCircle } from "lucide-react";
import { MINIMUM_ORDER_QUANTITY, QUANTITY_INCREMENT, roundToNearestIncrement } from "@/lib/constants";

const checkoutSchema = insertOrderSchema.extend({
  paymentMethod: z.enum(["card", "bank", "cod"]),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, totalPrice, clearCart, updateQuantity } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "cod">("card");
  const [hasInvalidQuantities, setHasInvalidQuantities] = useState(false);

  const form = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      items: JSON.stringify(items),
      total: totalPrice.toString(),
      paymentMethod: "card",
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (data: CheckoutData) => {
      const { paymentMethod: _, ...orderData } = data;
      const response = await apiRequest("POST", "/api/orders", {
        ...orderData,
        items: JSON.stringify(items),
        total: totalPrice.toString(),
      });
      return response.json();
    },
    onSuccess: (order) => {
      toast({
        title: "Order Placed Successfully",
        description: `Order #${order.id} has been placed. You will receive a confirmation email shortly.`,
      });
      clearCart();
      setLocation(`/thank-you/${order.id}`);
    },
    onError: () => {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Check for invalid quantities on mount and when items change
  useEffect(() => {
    const invalidItems = items.some(item => item.quantity < MINIMUM_ORDER_QUANTITY);
    setHasInvalidQuantities(invalidItems);
    
    if (invalidItems) {
      toast({
        title: "Invalid Order Quantities",
        description: `All items must have a minimum quantity of ${MINIMUM_ORDER_QUANTITY}kg. Adjust your cart to continue.`,
        variant: "destructive",
      });
    }
  }, [items, toast]);

  const onSubmit = (data: CheckoutData) => {
    // Final validation before submission
    const invalidItems = items.some(item => item.quantity < MINIMUM_ORDER_QUANTITY);
    
    if (invalidItems) {
      setHasInvalidQuantities(true);
      toast({
        title: "Invalid Order Quantities",
        description: `All items must have a minimum quantity of ${MINIMUM_ORDER_QUANTITY}kg. Adjust your cart to continue.`,
        variant: "destructive",
      });
      return;
    }
    
    orderMutation.mutate(data);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-warm-ivory">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <Card className="text-center py-16">
            <CardContent>
              <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-stone-gray mb-8">
                Please add some products to your cart before checkout.
              </p>
              <Link href="/shop">
                <Button 
                  size="lg"
                  className="bg-muted-gold text-midnight px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold/90"
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
                Checkout
              </h1>
              <p className="text-warm-ivory/80">
                Complete your order for premium cashew products
              </p>
            </div>
            <Link href="/cart">
              <Button 
                variant="outline"
                className="border-2 border-warm-ivory text-warm-ivory hover:bg-warm-ivory hover:text-midnight"
                data-testid="back-to-cart-button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Customer Information */}
                <Card className="bg-cream-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-midnight">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="customerName" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          Full Name *
                        </Label>
                        <Input
                          id="customerName"
                          {...form.register("customerName")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="customer-name-input"
                        />
                        {form.formState.errors.customerName && (
                          <p className="text-red-500 text-sm">{form.formState.errors.customerName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customerEmail" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          Email Address *
                        </Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          {...form.register("customerEmail")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="customer-email-input"
                        />
                        {form.formState.errors.customerEmail && (
                          <p className="text-red-500 text-sm">{form.formState.errors.customerEmail.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customerPhone" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                        Phone Number
                      </Label>
                      <Input
                        id="customerPhone"
                        type="tel"
                        {...form.register("customerPhone")}
                        className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                        data-testid="customer-phone-input"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card className="bg-cream-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-midnight">Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="shippingAddress" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                        Street Address *
                      </Label>
                      <Input
                        id="shippingAddress"
                        {...form.register("shippingAddress")}
                        className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                        data-testid="shipping-address-input"
                      />
                      {form.formState.errors.shippingAddress && (
                        <p className="text-red-500 text-sm">{form.formState.errors.shippingAddress.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          City *
                        </Label>
                        <Input
                          id="city"
                          {...form.register("city")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="city-input"
                        />
                        {form.formState.errors.city && (
                          <p className="text-red-500 text-sm">{form.formState.errors.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          State/Province *
                        </Label>
                        <Input
                          id="state"
                          {...form.register("state")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="state-input"
                        />
                        {form.formState.errors.state && (
                          <p className="text-red-500 text-sm">{form.formState.errors.state.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          Postal Code *
                        </Label>
                        <Input
                          id="postalCode"
                          {...form.register("postalCode")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="postal-code-input"
                        />
                        {form.formState.errors.postalCode && (
                          <p className="text-red-500 text-sm">{form.formState.errors.postalCode.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                        Country *
                      </Label>
                      <Select onValueChange={(value) => form.setValue("country", value)}>
                        <SelectTrigger className="border-stone-gray/20" data-testid="country-select">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IN">India</SelectItem>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="JP">Japan</SelectItem>
                          <SelectItem value="SG">Singapore</SelectItem>
                          <SelectItem value="UAE">United Arab Emirates</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.country && (
                        <p className="text-red-500 text-sm">{form.formState.errors.country.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="bg-cream-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-midnight">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value: "card" | "bank" | "cod") => {
                        setPaymentMethod(value);
                        form.setValue("paymentMethod", value);
                      }}
                      className="mt-6 space-y-4"
                      data-testid="payment-method-group"
                    >
                      <div className="flex items-center space-x-2 p-4 border border-stone-gray/20 rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-muted-gold" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border border-stone-gray/20 rounded-lg">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <Truck className="h-5 w-5 text-muted-gold" />
                          <span>Bank Transfer</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border border-stone-gray/20 rounded-lg">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer flex-1">
                          <Shield className="h-5 w-5 text-muted-gold" />
                          <span>Cash on Delivery</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-cream-white shadow-lg sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-midnight">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4" data-testid={`summary-item-${item.id}`}>
                          <div className="w-16 h-16 overflow-hidden rounded-lg">
                            <img 
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-midnight text-sm">{item.name}</h4>
                            <p className="text-stone-gray text-sm">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-semibold text-midnight">
                            {formatPrice(parseFloat(item.price) * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Totals */}
                    <div className="space-y-4">
                      <div className="flex justify-between text-stone-gray">
                        <span>Subtotal:</span>
                        <span data-testid="checkout-subtotal">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-stone-gray">
                        <span>Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-stone-gray">
                        <span>Tax:</span>
                        <span>Included</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-midnight">Total:</span>
                        <span 
                          className="text-2xl font-bold text-midnight" 
                          data-testid="checkout-total"
                        >
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>

                    {hasInvalidQuantities ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 text-red-700 mb-2">
                          <AlertCircle className="h-5 w-5" />
                          <span className="font-medium">Cart Contains Invalid Quantities</span>
                        </div>
                        <p className="text-sm text-red-600 mb-3">
                          All items must have a minimum quantity of {MINIMUM_ORDER_QUANTITY}kg.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-red-700 border-red-300 hover:bg-red-50 hover:text-red-800"
                          onClick={() => setLocation('/cart')}
                        >
                          Update Cart
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-muted-gold text-midnight hover:bg-muted-gold/90 font-semibold uppercase tracking-wide"
                        disabled={orderMutation.isPending || hasInvalidQuantities}
                        data-testid="place-order-button"
                      >
                        {orderMutation.isPending ? "Processing..." : "Place Order"}
                      </Button>
                    )}

                    <div className="bg-warm-ivory p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs text-stone-gray">
                        <div>
                          <div className="text-lg mb-1">🔒</div>
                          <span>Secure</span>
                        </div>
                        <div>
                          <div className="text-lg mb-1">🚚</div>
                          <span>Free Shipping</span>
                        </div>
                        <div>
                          <div className="text-lg mb-1">↩️</div>
                          <span>Easy Returns</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
