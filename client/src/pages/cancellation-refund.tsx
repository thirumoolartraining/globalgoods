import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

export default function CancellationRefund() {
  const observerRef = useRef<IntersectionObserver>();

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
  }, []);

  return (
    <div className="min-h-screen bg-warm-ivory">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-warm-ivory mb-6">
              Cancellation & Refund Policy
            </h1>
            <p className="text-white/90 mt-4 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">
              Fair Terms. Fresh Products. Trusted Partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardContent className="p-6 space-y-6">
                <p className="text-stone-700">
                  At R S Enterprises, we are committed to delivering high-quality cashew products with care, consistency, and compliance. While we aim to make every order accurate and timely, we understand that certain circumstances may require cancellations or dispute resolution. This policy outlines our approach to cancellations, damages, and refunds in a fair and transparent manner.
                </p>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4">Order Cancellations</h2>
                    <div className="bg-warm-ivory/20 p-4 rounded-lg border border-muted-gold/20 mb-4">
                      <p className="font-medium text-midnight">📌 Cancellation Window: Within 4 Hours of Order Confirmation</p>
                    </div>
                    <p className="text-stone-700 mb-4">
                      You may request cancellation within 4 hours of order placement, provided that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>The order has not been processed or packed</li>
                      <li>Shipment booking has not been made</li>
                      <li>No custom packaging or labeling has begun</li>
                    </ul>
                    <p className="text-stone-700 mb-4">
                      Once the order is handed over to our logistics or export team, cancellation is no longer possible due to the perishable and process-driven nature of food-grade exports.
                    </p>
                    <p className="text-stone-700 font-medium">
                      To cancel:
                    </p>
                    <p className="text-stone-700">
                      Kindly contact us via email or WhatsApp with your Order ID and reason for cancellation. Urgent requests should be communicated immediately for swift action.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4">Damaged or Defective Goods</h2>
                    <p className="text-stone-700 mb-4">
                      Although we implement strict quality control and export inspection protocols, in rare cases, if you receive:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-6">
                      <li>Products damaged in transit</li>
                      <li>Packaging that is tampered or leaking</li>
                      <li>Quantity shortages</li>
                      <li>Visibly spoiled or mold-affected stock (upon receipt)</li>
                    </ul>
                    <p className="text-stone-700 mb-4">
                      Please notify us within 5 business days of delivery with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-6">
                      <li>Your Order ID</li>
                      <li>Clear photos of damage/defect</li>
                      <li>Batch number (if visible)</li>
                      <li>Brief explanation of the issue</li>
                    </ul>
                    <p className="text-stone-700 mb-4">
                      Upon verification, we will arrange one of the following based on case evaluation:
                    </p>
                    <ul className="list-none pl-0 space-y-2 text-stone-700 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✅</span>
                        <span>Replacement of the affected batch</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✅</span>
                        <span>Credit note for next order</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✅</span>
                        <span>Refund via original payment method</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4">Return & Refund Conditions</h2>
                    <p className="text-stone-700 mb-4">
                      Due to the perishable nature of cashews and international food compliance laws, we do not accept returns of shipped goods except under the following conditions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-6">
                      <li>Verified damage during shipping</li>
                      <li>Certified non-compliance with pre-agreed specs (after inspection)</li>
                      <li>Quality deviation backed by buyer-side testing within 5 days of receipt</li>
                    </ul>
                    <p className="text-stone-700 font-medium mb-2">
                      We do not issue refunds for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-6">
                      <li>Delay due to customs clearance or import-side logistics</li>
                      <li>Client-side storage or mishandling after delivery</li>
                      <li>Flavor/texture variation within accepted natural range</li>
                      <li>Change of mind after dispatch</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4">B2B / Bulk Order Terms</h2>
                    <p className="text-stone-700 mb-4">
                      For export clients, importers, and bulk buyers, cancellation, refund, and replacement policies will follow the agreed purchase terms, such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-6">
                      <li>Incoterms (FOB, CIF, etc.)</li>
                      <li>Pre-shipment sample approval</li>
                      <li>Packaging & branding customizations</li>
                    </ul>
                    <p className="text-stone-700">
                      Please refer to your sales agreement or email confirmation for final terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4">Refund Process</h2>
                    <p className="text-stone-700 mb-4">
                      If your refund request is approved:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-6">
                      <li><strong>Initiation:</strong> Within 3–7 business days</li>
                      <li><strong>Mode:</strong> Via the original payment method or as store credit (as applicable)</li>
                      <li><strong>Settlement Time:</strong> Varies by bank/payment gateway (typically 5–10 business days)</li>
                    </ul>
                    <p className="text-stone-700">
                      You will be notified via email or WhatsApp once your refund has been processed.
                    </p>
                  </div>

                  <div className="bg-warm-ivory/20 p-6 rounded-lg border border-muted-gold/20 mt-12">
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 text-center">Need Help with a Cancellation or Refund?</h2>
                    <p className="text-stone-700 text-center mb-6">
                      Reach out to our support team with your query:
                    </p>
                    <div className="max-w-md mx-auto space-y-2 text-center">
                      <p className="text-stone-700">
                        <span className="font-medium">📧 Email:</span>{' '}
                        <a href="mailto:info@rsenterprises.online" className="text-muted-gold hover:underline">
                          info@rsenterprises.online
                        </a>
                      </p>
                      <p className="text-stone-700">
                        <span className="font-medium">📞 Phone/WhatsApp:</span>{' '}
                        <a href="tel:+917200230057" className="text-muted-gold hover:underline">
                          +91 72002 30057
                        </a>
                      </p>
                      <p className="text-stone-700">
                        <span className="font-medium">🕘 Support Hours:</span> Mon–Sat, 9 AM – 6 PM IST
                      </p>
                    </div>
                    <p className="text-center text-stone-600 mt-6">
                      At R S Enterprises, we prioritize ethical trade, long-term partnerships, and food safety. All claims are handled with utmost fairness and customer-centricity.
                    </p>
                    <p>
                      To cancel an order, please contact our customer service team at <a href="mailto:info@rsenterprises.online" className="text-muted-gold hover:underline">info@rsenterprises.online</a> with your order number and request for cancellation.
                    </p>
                    <p>
                      Once your order has been processed and shipped, it can no longer be canceled. In this case, you may choose to return the item(s) upon delivery, subject to our Return Policy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
