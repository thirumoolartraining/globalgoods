import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

export default function Terms() {
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
              Terms & Conditions
            </h1>
            <p className="text-white/90 mt-4 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">
              Last updated: August 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardContent className="p-6 space-y-6">
                <p className="text-stone-700">
                  Welcome to R S Enterprises. By accessing and using our website [www.rsenterprises.online], you agree to comply with and be bound by the following Terms and Conditions. These terms govern all interactions, purchases, and services provided through our platform—especially those concerning bulk orders and international B2B transactions.
                </p>
                <p className="text-stone-700">
                  Continued use of this site signifies full acceptance of these terms. If you do not agree, please discontinue use immediately.
                </p>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">1. General Use of the Website</h2>
                    <p className="text-stone-700 mb-3">
                      By using this website, you confirm that you are:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700 mb-4">
                      <li>At least 18 years of age, or</li>
                      <li>Accessing the site under the supervision of a parent or legal guardian.</li>
                    </ul>
                    <p className="text-stone-700">
                      You agree to use the website for lawful business purposes only, and in a way that does not infringe on the rights or restrict the usage of the site by others.
                    </p>
                    <p className="text-stone-700 mt-3">
                      R S Enterprises reserves the right to suspend, restrict, or terminate access to the website without notice or liability in cases of misuse or violation.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">2. Product Listings, Pricing & Availability</h2>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700">
                      <li>All cashew product listings are subject to availability and may be modified or removed without prior notice.</li>
                      <li>While we strive for accuracy in product descriptions, grade specifications, and visuals, occasional errors may occur.</li>
                      <li>Prices are listed in INR or USD (as applicable) and are subject to market fluctuations, global commodity rates, and logistic variables.</li>
                      <li>Minimum Order Quantities (MOQs) apply for export or wholesale orders. Custom quotations will be provided for high-volume clients.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">3. Payments</h2>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700">
                      <li>Full payment is required at the time of placing the order unless otherwise agreed upon via formal business terms.</li>
                      <li>We accept bank transfers, Letters of Credit (L/C), verified export payment gateways, and domestic payment options including UPI and NEFT.</li>
                      <li>R S Enterprises does not store payment information. All transactions are processed through secure third-party platforms.</li>
                      <li>For any billing or payment-related discrepancies, contact our finance team promptly.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">4. Shipping & Delivery</h2>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700">
                      <li>We offer domestic and international shipping via reliable logistics and freight forwarding partners.</li>
                      <li>Delivery timelines are shared based on destination, product type, quantity, and packaging specifications.</li>
                      <li>Tracking details will be provided once goods are dispatched.</li>
                      <li>Customs delays, freight disruptions, or force majeure events are beyond our direct control, though we actively assist in resolution and coordination.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">5. User Conduct & Responsibilities</h2>
                    <p className="text-stone-700 mb-3">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700">
                      <li>Post or share unlawful, misleading, or abusive content.</li>
                      <li>Attempt to gain unauthorized access to systems, data, or order history.</li>
                      <li>Use any part of the website for resale, scraping, or unauthorized commercial activity.</li>
                      <li>Interfere with the site's functionality, security, or availability.</li>
                    </ul>
                    <p className="text-stone-700 mt-3">Violations may result in suspended access, legal action, or both.</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">6. Intellectual Property</h2>
                    <p className="text-stone-700">
                      All content—including the R S Enterprises logo, product imagery, technical documents, and website text—is the intellectual property of R S Enterprises.
                    </p>
                    <p className="text-stone-700 mt-2">
                      No content may be reproduced, distributed, or used commercially without our express written permission.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">7. Modifications to Terms</h2>
                    <p className="text-stone-700">
                      R S Enterprises reserves the right to amend or revise these Terms & Conditions at any time.
                    </p>
                    <p className="text-stone-700 mt-2">
                      Updates will be reflected on this page with the revised date. Continued use after any changes signifies your acceptance of the updated terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">8. Limitation of Liability</h2>
                    <p className="text-stone-700 mb-3">
                      R S Enterprises, its directors, or affiliates shall not be liable for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-stone-700">
                      <li>Indirect or consequential damages from site use</li>
                      <li>Delays in shipment or order fulfillment due to external disruptions</li>
                      <li>Data loss or transaction failure caused by third-party platforms</li>
                    </ul>
                    <p className="text-stone-700 mt-3">
                      Use of this website and our services is at your own discretion and risk.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-serif font-semibold text-midnight mb-3">9. Governing Law</h2>
                    <p className="text-stone-700">
                      These terms shall be governed by the laws of India, with exclusive jurisdiction under the courts of Pondicherry.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-midnight mb-4">10. Contact Us</h2>
                    <p className="text-stone-700 mb-4">
                      For questions, commercial inquiries, or operational support, please contact:
                    </p>
                    <div className="bg-warm-ivory/20 p-6 rounded-lg border border-muted-gold/20">
                      <p className="font-semibold text-stone-800">R S Enterprises</p>
                      <p className="text-stone-700">No: 46, Iyanar Koil Street, Sivalingapuram</p>
                      <p className="text-stone-700">Ariyankuppam, Pondicherry - 605007</p>
                      <p className="text-stone-700 mt-2">
                        <span className="font-medium">📧 Email:</span>{' '}
                        <a href="mailto:info@rsenterprises.online" className="text-muted-gold hover:underline">
                          info@rsenterprises.online
                        </a>
                      </p>
                      <p className="text-stone-700">
                        <span className="font-medium">📞 Phone:</span>{' '}
                        <a href="tel:+917200230057" className="text-muted-gold hover:underline">
                          +91 72002 30057
                        </a>
                      </p>
                    </div>
                    <p className="text-stone-700 mt-4">
                      We are committed to building transparent, ethical, and reliable trade partnerships across the globe.
                    </p>
                    <p className="text-stone-600 text-sm mt-6 text-center">
                      © 2025 R S Enterprises. All rights reserved.
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
