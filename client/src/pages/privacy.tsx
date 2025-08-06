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
            <p className="text-xl text-warm-ivory/80 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-warm-ivory/60 mt-4">
              Last updated: August 6, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {/* Introduction */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Introduction</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-stone max-w-none">
                <p className="text-stone-gray leading-relaxed">
                  RS Enterprises ("we," "our," or "us") is committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy explains how we collect, use, 
                  disclose, and safeguard your information when you visit our website, make purchases, or 
                  interact with our services.
                </p>
                <p className="text-stone-gray leading-relaxed">
                  By using our website and services, you consent to the data practices described in this policy. 
                  If you do not agree with the practices described in this policy, please do not use our website 
                  or services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-midnight mb-4">Personal Information</h3>
                  <p className="text-stone-gray leading-relaxed mb-4">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="space-y-2 text-stone-gray">
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Name, email address, phone number, and mailing address</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Company name and business information for B2B transactions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Payment information (processed securely through third-party processors)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Order history and purchasing preferences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Communication preferences and marketing consents</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-serif font-semibold text-midnight mb-4">Automatically Collected Information</h3>
                  <p className="text-stone-gray leading-relaxed mb-4">
                    When you visit our website, we may automatically collect certain information:
                  </p>
                  <ul className="space-y-2 text-stone-gray">
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>IP address, browser type, and operating system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Pages visited, time spent on pages, and click-through rates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Referral URLs and search terms used to find our website</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span>Device information and mobile identifiers</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-gray leading-relaxed mb-4">
                  We use the information we collect for various business purposes, including:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-midnight mb-3">Order Processing & Customer Service</h4>
                    <ul className="space-y-2 text-stone-gray text-sm">
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Process and fulfill your orders</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Communicate about your orders and account</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Provide customer support and respond to inquiries</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Process payments and prevent fraud</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-midnight mb-3">Marketing & Improvements</h4>
                    <ul className="space-y-2 text-stone-gray text-sm">
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Send promotional materials and product updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Analyze usage patterns and improve our services</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Personalize your shopping experience</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-muted-gold mr-2">•</span>
                        <span>Conduct research and analytics</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-stone-gray leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except in the following circumstances:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-warm-ivory rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">Service Providers</h4>
                    <p className="text-stone-gray text-sm">
                      We may share information with trusted third-party service providers who assist us in operating our 
                      website, conducting business, or serving you (payment processors, shipping companies, etc.).
                    </p>
                  </div>
                  
                  <div className="p-4 bg-warm-ivory rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">Legal Requirements</h4>
                    <p className="text-stone-gray text-sm">
                      We may disclose information when required by law, regulation, legal process, or governmental request, 
                      or to protect our rights, property, or safety.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-warm-ivory rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">Business Transfers</h4>
                    <p className="text-stone-gray text-sm">
                      In the event of a merger, acquisition, or sale of assets, your information may be transferred as part 
                      of the business transaction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-gray leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-muted-gold/20 rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">🔒 Encryption</h4>
                    <p className="text-stone-gray text-sm">
                      All sensitive data is encrypted in transit and at rest using industry-standard encryption protocols.
                    </p>
                  </div>
                  <div className="p-4 border border-muted-gold/20 rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">🛡️ Access Controls</h4>
                    <p className="text-stone-gray text-sm">
                      Access to personal information is restricted to authorized personnel who need it for business purposes.
                    </p>
                  </div>
                  <div className="p-4 border border-muted-gold/20 rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">🔍 Regular Audits</h4>
                    <p className="text-stone-gray text-sm">
                      We regularly review and update our security practices and conduct security assessments.
                    </p>
                  </div>
                  <div className="p-4 border border-muted-gold/20 rounded-lg">
                    <h4 className="font-semibold text-midnight mb-2">💳 Secure Payments</h4>
                    <p className="text-stone-gray text-sm">
                      Payment information is processed by PCI-DSS compliant third-party payment processors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-gray leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-muted-gold font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-midnight">Access and Portability</h4>
                      <p className="text-stone-gray text-sm">Request access to your personal information and receive a copy in a portable format.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-muted-gold font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-midnight">Correction</h4>
                      <p className="text-stone-gray text-sm">Request correction of inaccurate or incomplete personal information.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-muted-gold font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-midnight">Deletion</h4>
                      <p className="text-stone-gray text-sm">Request deletion of your personal information, subject to legal and business requirements.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-muted-gold font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-midnight">Opt-out</h4>
                      <p className="text-stone-gray text-sm">Opt-out of marketing communications and certain data processing activities.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="bg-cream-white shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-midnight">Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-gray leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, 
                  and personalize content. Cookies are small data files stored on your device.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-midnight mb-2">Types of Cookies We Use:</h4>
                    <ul className="space-y-2 text-stone-gray text-sm">
                      <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                      <li><strong>Performance Cookies:</strong> Help us analyze how visitors use our website</li>
                      <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                      <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-warm-ivory rounded-lg">
                    <p className="text-stone-gray text-sm">
                      You can control cookies through your browser settings. However, disabling cookies may affect 
                      the functionality of our website.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-midnight text-warm-ivory shadow-lg fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-warm-ivory/80 leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-warm-ivory mb-3">Contact Information</h4>
                    <div className="space-y-2 text-warm-ivory/80 text-sm">
                      <p><strong>Email:</strong> privacy@rscashews.com</p>
                      <p><strong>Phone:</strong> +91 474 2345678</p>
                      <p><strong>Address:</strong> 123 Industrial Estate, Kollam, Kerala, India - 691001</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-ivory mb-3">Business Hours</h4>
                    <div className="space-y-2 text-warm-ivory/80 text-sm">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                      <p>Saturday: 9:00 AM - 2:00 PM IST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policy Updates */}
            <Card className="bg-warm-ivory border border-muted-gold shadow-lg fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold text-midnight mb-4">Policy Updates</h3>
                <p className="text-stone-gray leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                  We will notify you of any material changes by posting the updated policy on our website and updating the 
                  "Last updated" date. Your continued use of our services after any changes indicates your acceptance of the 
                  updated policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
