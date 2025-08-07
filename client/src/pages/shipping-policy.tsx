import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

export default function ShippingPolicy() {
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
              Shipping Policy
            </h1>
            <p className="text-white/90 mt-4 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">
              Freshness in Every Shipment – From Farm to Port with Care
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardContent className="p-6 space-y-6">
                <p className="text-stone-700">
                  At R S Enterprises, we take pride in delivering premium-grade cashew products to clients across India and around the globe. Our shipping process is designed for efficiency, traceability, and maximum freshness—whether it's a single pallet or a full container.
                </p>
                <p className="text-stone-700">
                  This policy outlines our processing timelines, domestic and international shipping details, logistics coordination, and support in case of delays.
                </p>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 mt-6">Order Processing Time</h2>
                    <p className="text-stone-700 mb-4">
                      Once your order is confirmed and payment is verified, we initiate the processing within <strong>3 to 7 business days</strong>, which includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>Final quality checks</li>
                      <li>Moisture-controlled vacuum packaging</li>
                      <li>Custom export labeling (if required)</li>
                      <li>Coordination with freight and customs agents</li>
                    </ul>
                    <p className="text-stone-700 mb-4">
                      For bulk and OEM orders, timelines may vary depending on:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>Product type (e.g., W320, W240, splits, etc.)</li>
                      <li>Volume and container size</li>
                      <li>Custom branding or packaging needs</li>
                    </ul>
                    <p className="text-stone-700">
                      <em>Orders placed on weekends or holidays are processed on the next business day.</em>
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 mt-8">Shipping Destinations & Delivery Estimates</h2>
                    <p className="text-stone-700 mb-4">
                      We serve both domestic and international markets, including B2B customers, importers, and distributors.
                    </p>
                    
                    <div className="bg-warm-ivory/20 p-4 rounded-lg border border-muted-gold/20 my-6">
                      <h3 className="text-xl font-medium text-midnight mb-3">📦 Domestic Shipping (India):</h3>
                      <ul className="list-disc pl-6 space-y-1 text-stone-700">
                        <li><strong>Metro Cities:</strong> 3–5 business days post-dispatch</li>
                        <li><strong>Non-Metro/Rural:</strong> 5–10 business days</li>
                      </ul>
                    </div>

                    <div className="bg-warm-ivory/20 p-4 rounded-lg border border-muted-gold/20 my-6">
                      <h3 className="text-xl font-medium text-midnight mb-3">🌍 International Shipping:</h3>
                      <ul className="list-disc pl-6 space-y-1 text-stone-700">
                        <li><strong>Middle East, Gulf Countries:</strong> 10–18 business days</li>
                        <li><strong>Europe & UK:</strong> 14–21 business days</li>
                        <li><strong>USA, Canada:</strong> 18–25 business days</li>
                        <li><strong>Asia-Pacific & Africa:</strong> Varies based on port and customs clearance</li>
                      </ul>
                    </div>

                    <p className="text-stone-700 text-sm italic">
                      📝 <strong>Note:</strong> Delivery estimates may shift due to customs inspections, port congestion, weather disruptions, or international trade holidays.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 mt-8">Shipping Charges</h2>
                    <p className="text-stone-700 mb-4">
                      Shipping costs are calculated based on:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>Destination (port/city/country)</li>
                      <li>Order weight and packaging volume</li>
                      <li>Shipping method (air cargo, LCL, FCL)</li>
                      <li>Incoterms (e.g., FOB, CIF, EXW, DDP)</li>
                    </ul>
                    <p className="text-stone-700">
                      All shipping charges will be transparently quoted in your proforma invoice or final invoice, prior to shipment.
                    </p>
                    <p className="text-stone-700 mt-2">
                      We offer cost-effective container consolidation options for multi-client exports from India.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 mt-8">Tracking Your Shipment</h2>
                    <p className="text-stone-700 mb-4">
                      Once your order is dispatched, you will receive:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>Shipping carrier & booking reference</li>
                      <li>Tracking link (for courier/freight)</li>
                      <li>Shipping invoice & packing list</li>
                    </ul>
                    <p className="text-stone-700">
                      You can also contact our logistics support for live updates or documents needed for customs clearance.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 mt-8">Delays & Exceptions</h2>
                    <p className="text-stone-700 mb-4">
                      Despite our best efforts, shipping may be impacted due to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>Port strikes, customs delays, or trade sanctions</li>
                      <li>Global container shortages or freight fluctuations</li>
                      <li>Force majeure (natural disasters, war, pandemic-related restrictions)</li>
                    </ul>
                    <p className="text-stone-700">
                      In such cases, we will keep you informed via email, WhatsApp, or your designated trade contact, with estimated adjustments and alternatives.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 mt-8">Wholesale, B2B & Export Logistics</h2>
                    <p className="text-stone-700 mb-4">
                      For enterprise clients and large-volume buyers, we provide:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>Full container load (FCL) coordination</li>
                      <li>Partial shipments & LCL options</li>
                      <li>Export documentation (Invoice, CO, B/L, Phyto certificate, FSSAI, etc.)</li>
                      <li>Temperature/moisture-controlled packaging</li>
                      <li>Buyer-side inspection support (if required)</li>
                    </ul>
                    <p className="text-stone-700">
                      Our export desk ensures compliance with destination country food safety regulations.
                    </p>
                  </div>

                  <div className="bg-warm-ivory/20 p-6 rounded-lg border border-muted-gold/20 mt-12">
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4 text-center">Need Assistance?</h2>
                    <p className="text-stone-700 text-center mb-6">
                      For any shipping-related queries or coordination help, contact our support team:
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
                        <span className="font-medium">🕘 Business Hours:</span> Mon–Sat, 9 AM – 6 PM IST
                      </p>
                    </div>
                    <p className="text-center text-stone-600 mt-6">
                      We look forward to delivering your order on time—with quality you can trust.
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
