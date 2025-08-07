import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@shared/schema";
import { formatPrice } from "@/lib/products";
import { Link } from "wouter";
import { CheckCircle, Package, Truck, Mail, Phone, Download } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ThankYou() {
  const { orderId } = useParams() as { orderId?: string };
  const observerRef = useRef<IntersectionObserver>();

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
    enabled: !!orderId,
  });

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [order]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-ivory">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Loading Order Details...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-warm-ivory">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
          <Card className="text-center py-16">
            <CardContent>
              <h1 className="text-4xl font-serif font-bold text-midnight mb-4">Order Not Found</h1>
              <p className="text-xl text-stone-gray mb-8">
                We couldn't find the order you're looking for.
              </p>
              <Link href="/">
                <Button size="lg" className="bg-muted-gold text-midnight px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold/90">
                  Return Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const orderItems = JSON.parse(order.items);

  return (
    <div className="min-h-screen bg-warm-ivory">
      {/* Success Hero */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-600 rounded-full mb-8">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-warm-ivory mb-6">
              Thank You!
            </h1>
            <p className="text-xl text-warm-ivory/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Your order has been successfully placed. We appreciate your trust in RS Enterprises 
              for your premium cashew needs.
            </p>
            <Badge variant="secondary" className="bg-muted-gold text-midnight px-6 py-2 text-lg font-semibold">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </Badge>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-cream-white shadow-lg fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-midnight">Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Order Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-midnight mb-2">Order Number</h3>
                        <p className="text-stone-gray" data-testid="order-number">#{order.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-midnight mb-2">Order Date</h3>
                        <p className="text-stone-gray" data-testid="order-date">
                          {new Date(order.createdAt!).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-midnight mb-2">Status</h3>
                        <Badge className="bg-blue-100 text-blue-800">
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-midnight mb-2">Total Amount</h3>
                        <p className="text-2xl font-bold text-midnight" data-testid="order-total">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Ordered Items */}
                    <div>
                      <h3 className="font-semibold text-midnight mb-4 text-lg">Ordered Items</h3>
                      <div className="space-y-4">
                        {orderItems.map((item: any, index: number) => (
                          <div key={index} className="flex items-center space-x-4 p-4 bg-warm-ivory rounded-lg" data-testid={`order-item-${index}`}>
                            <div className="w-16 h-16 overflow-hidden rounded-lg">
                              <img 
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-midnight">{item.name}</h4>
                              <p className="text-stone-gray">Quantity: {item.quantity}</p>
                              <p className="text-stone-gray">{formatPrice(item.price)}/kg</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-midnight">
                                {formatPrice(parseFloat(item.price) * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Customer & Shipping Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-midnight mb-4 text-lg">Customer Information</h3>
                        <div className="space-y-2 text-stone-gray">
                          <p><strong>Name:</strong> {order.customerName}</p>
                          <p><strong>Email:</strong> {order.customerEmail}</p>
                          {order.customerPhone && <p><strong>Phone:</strong> {order.customerPhone}</p>}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-midnight mb-4 text-lg">Shipping Address</h3>
                        <div className="text-stone-gray">
                          <p>{order.shippingAddress}</p>
                          <p>{order.city}, {order.state} {order.postalCode}</p>
                          <p>{order.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps */}
            <div className="space-y-8">
              <Card className="bg-cream-white shadow-lg fade-in">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-midnight">What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-muted-gold mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-midnight text-sm">Order Confirmation</h4>
                        <p className="text-stone-gray text-sm">You'll receive an email confirmation within 15 minutes.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Package className="h-5 w-5 text-muted-gold mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-midnight text-sm">Processing</h4>
                        <p className="text-stone-gray text-sm">We'll prepare your order within 1-2 business days.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Truck className="h-5 w-5 text-muted-gold mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-midnight text-sm">Shipping</h4>
                        <p className="text-stone-gray text-sm">Your order will be shipped within 3-5 business days.</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-midnight text-midnight font-semibold hover:bg-midnight hover:text-warm-ivory"
                      data-testid="download-invoice-button"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>

                    <Link href="/shop">
                      <Button 
                        className="w-full bg-muted-gold text-midnight font-semibold uppercase tracking-wide hover:bg-muted-gold/90"
                        data-testid="continue-shopping-button"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="bg-midnight text-warm-ivory fade-in">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-ivory/80 mb-4">
                    Our customer support team is here to help with any questions about your order.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-gold" />
                      <span className="text-sm">+91 72002 30057</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-gold" />
                      <span className="text-sm">info@rsenterprises.online</span>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button 
                      variant="outline" 
                      className="mt-4 w-full border-2 border-muted-gold text-muted-gold hover:bg-muted-gold hover:text-midnight"
                      data-testid="contact-support-button"
                    >
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quality Promise */}
              <Card className="bg-warm-ivory border border-muted-gold fade-in">
                <CardContent className="p-6 text-center">
                  <h3 className="font-serif font-semibold text-midnight mb-4">Quality Promise</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Premium Quality</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">🌱</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Sustainably Sourced</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">🔒</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Freshness Guaranteed</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">🚚</div>
                      <div className="text-xs uppercase tracking-wide text-stone-gray">Safe Delivery</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Message */}
      <section className="py-16 bg-cream-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h2 className="text-3xl font-serif font-bold text-midnight mb-6">
              Thank You for Choosing RS Enterprises
            </h2>
            <p className="text-lg text-stone-gray leading-relaxed mb-8">
              Your trust in our premium cashews means everything to us. We're committed to delivering 
              the finest quality products and exceptional service. We look forward to serving you again soon!
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/">
                <Button variant="outline" size="lg" className="border-2 border-midnight text-midnight hover:bg-midnight hover:text-warm-ivory">
                  Return Home
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" className="bg-muted-gold text-midnight font-semibold hover:bg-muted-gold/90">
                  Shop More Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
