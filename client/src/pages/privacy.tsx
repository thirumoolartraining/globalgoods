import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <h2 className="text-3xl font-serif font-semibold text-warm-ivory mb-6">
              Your Privacy is Our Priority
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              At R S Enterprises, your privacy is of utmost importance. As a trusted manufacturer and global exporter of premium cashew nuts, we are committed to safeguarding the personal and business information you share with us. Our privacy practices are rooted in transparency, data security, and compliance—aligned with the Indian Information Technology Act and internationally recognized data protection standards, including the GDPR.
            </p>
            <p className="text-white/90 mt-4 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">
              Last Updated: August 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {/* Information We Collect */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-stone-700">
                  When you visit our website, request a quote, place a purchase order, or connect with our export support team, we may collect the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Full Name</li>
                  <li>Company Name (for B2B or distributor accounts)</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                  <li>Shipping & Billing Address</li>
                  <li>Business ID / GST Number (if applicable)</li>
                  <li>Payment Details (via secure third-party gateways)</li>
                  <li>Product preferences and purchase history</li>
                  <li>Trade documentation details (for exports)</li>
                  <li>Device, browser, and session data</li>
                  <li>Cookies and tracking information (for analytics and performance)</li>
                </ul>
                <p className="text-stone-700 pt-2">
                  We collect only the information necessary to fulfill your cashew sourcing needs and support a secure and professional buyer experience.
                </p>
              </CardContent>
            </Card>

            {/* Why We Collect Your Information */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Why We Collect Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">
                  Your data helps us deliver a smooth, secure, and efficient business interaction. We use it to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Process domestic and international orders</li>
                  <li>Prepare invoices and export/commercial documentation</li>
                  <li>Manage shipping, customs, and logistics coordination</li>
                  <li>Provide product catalogs, batch availability updates, and trade alerts</li>
                  <li>Maintain distributor and wholesale account relationships</li>
                  <li>Send optional promotional communications (with opt-in consent)</li>
                  <li>Analyze visitor behavior and product demand trends (aggregated and anonymized)</li>
                </ul>
              </CardContent>
            </Card>

            {/* How Your Information is Protected */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">How Your Information is Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">
                  We uphold strict security standards to protect your data from unauthorized access, misuse, or disclosure.
                </p>
                <p className="font-semibold text-midnight mb-3">Our safeguards include:</p>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>SSL Encryption for all website and form interactions</li>
                  <li>PCI-compliant Payment Processing through secure third-party gateways (we do not store card or banking data)</li>
                  <li>Firewall-Protected Servers with regular vulnerability checks</li>
                  <li>Access Controls that limit data access to authorized personnel only</li>
                </ul>
                <p className="text-stone-700 mt-4">
                  We continuously monitor our systems to ensure your data remains protected.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights & Choices */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Your Rights & Choices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">
                  You retain full control over your information. At any time, you may:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-stone-700">
                  <li>Request access to the data we hold about you</li>
                  <li>Request corrections or updates to your profile or business details</li>
                  <li>Request deletion of personal data (subject to regulatory retention obligations)</li>
                  <li>Unsubscribe from marketing communications</li>
                  <li>Raise concerns about privacy, compliance, or data security</li>
                </ul>
                <p className="text-stone-700 mt-4">
                  To exercise any of the above rights, please write to us at{' '}
                  <a href="mailto:info@rsenterprises.online" className="text-muted-gold hover:underline">
                    info@rsenterprises.online
                  </a>. We strive to respond within 30 business days.
                </p>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">
                  If you have any questions or concerns about this Privacy Policy or our data handling practices, reach out to our Data Compliance Officer:
                </p>
                <div className="bg-warm-ivory/20 p-6 rounded-lg border border-muted-gold/20">
                  <p className="font-semibold text-stone-800">R S Enterprises</p>
                  <p className="text-stone-700">Attn: Data Protection Officer</p>
                  <p className="text-stone-700">No: 46, Iyanar Koil Street, Sivalingapuram</p>
                  <p className="text-stone-700">Ariyankuppam, Pondicherry - 605007</p>
                  <p className="text-stone-700">
                    Email:{' '}
                    <a href="mailto:info@rsenterprises.online" className="text-muted-gold hover:underline">
                      info@rsenterprises.online
                    </a>
                  </p>
                  <p className="text-stone-700">
                    Phone:{' '}
                    <a href="tel:+917200230057" className="text-muted-gold hover:underline">
                      +91 72002 30057
                    </a>
                  </p>
                </div>
                <p className="text-stone-700 mt-4">
                  We are committed to responding promptly and fairly to all privacy-related queries.
                </p>
              </CardContent>
            </Card>

            {/* Policy Updates */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">
                  This Privacy Policy may be updated periodically to reflect changes in law, industry best practices, or our own internal processes. All updates will be posted on this page with a revised "Last Updated" date.
                </p>
                <p className="font-semibold text-stone-800">Last Updated: August 2025</p>
                <p className="text-stone-700 mt-4">
                  Thank you for trusting R S Enterprises. We value your partnership and remain dedicated to protecting your privacy while delivering world-class cashew products.
                </p>
                <p className="text-stone-600 text-sm mt-6 text-center">
                  © 2025 R S Enterprises. All rights reserved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
