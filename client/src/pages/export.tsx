import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
const { request: apiRequest } = api;
import { insertInquirySchema, InsertInquiry } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useEffect, useRef } from "react";

const exportInquirySchema = insertInquirySchema.extend({
  type: z.literal("export"),
  company: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
});

type ExportInquiryData = z.infer<typeof exportInquirySchema>;

export default function Export() {
  const { toast } = useToast();
  const observerRef = useRef<IntersectionObserver>();

  const form = useForm<ExportInquiryData>({
    resolver: zodResolver(exportInquirySchema),
    defaultValues: {
      type: "export",
      name: "",
      email: "",
      company: "",
      country: "",
      subject: "",
      message: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: async (data: ExportInquiryData) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ExportInquiryData) => {
    inquiryMutation.mutate(data);
  };

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
    <div className="min-h-screen bg-cream-white">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Global Reach</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-warm-ivory mt-4 mb-6">
              We Ship Worldwide
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              Trusted export partner for premium cashew nuts across 25+ countries with comprehensive 
              logistics support and international certifications.
            </p>
          </div>
        </div>
      </section>

      {/* Export Services */}
      <section className="py-24 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mt-4 mb-6">
              Comprehensive Export Solutions
            </h2>
            <p className="text-xl text-stone-gray max-w-3xl mx-auto">
              End-to-end export services designed to meet your international business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏷️",
                title: "Private Labeling",
                description: "Custom packaging and branding solutions for your business needs. We help you create your own brand identity."
              },
              {
                icon: "🤝",
                title: "White-label Partnerships",
                description: "Strategic partnerships with established brands worldwide. Expand your product line with our premium cashews."
              },
              {
                icon: "📦",
                title: "Bulk Procurement",
                description: "Large-scale orders with competitive pricing. Perfect for distributors and retailers looking for quality products."
              },
              {
                icon: "🚛",
                title: "Shipping & Customs",
                description: "Complete logistics support including shipping, customs clearance, and delivery to your destination."
              }
            ].map((service, index) => (
              <Card key={index} className="text-center bg-warm-ivory border-0 shadow-lg fade-in">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-serif font-semibold text-xl text-midnight mb-4">{service.title}</h3>
                  <p className="text-stone-gray leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">International Presence</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-ivory mt-4 mb-6">
                Serving 25+ Countries
              </h2>
              <p className="text-lg text-white/90 leading-relaxed mb-8 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                Our premium cashews reach customers across Asia, Europe, North America, and Australia. 
                With established distribution networks and reliable logistics partners, we ensure your 
                orders arrive fresh and on time, anywhere in the world.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-warm-ivory/10 rounded-xl">
                  <div className="text-3xl font-serif font-bold text-muted-gold mb-2">25+</div>
                  <div className="text-sm uppercase tracking-wide text-white/90 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">Countries Served</div>
                </div>
                <div className="text-center p-6 bg-warm-ivory/10 rounded-xl">
                  <div className="text-3xl font-serif font-bold text-muted-gold mb-2">500+</div>
                  <div className="text-sm uppercase tracking-wide text-white/90 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">Export Orders</div>
                </div>
                <div className="text-center p-6 bg-warm-ivory/10 rounded-xl">
                  <div className="text-3xl font-serif font-bold text-muted-gold mb-2">99.5%</div>
                  <div className="text-sm uppercase tracking-wide text-white/90 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">On-time Delivery</div>
                </div>
                <div className="text-center p-6 bg-warm-ivory/10 rounded-xl">
                  <div className="text-3xl font-serif font-bold text-muted-gold mb-2">48h</div>
                  <div className="text-sm uppercase tracking-wide text-white/90 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">Response Time</div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <img 
                src="/images/export/global-reach.png" 
                alt="Global reach of our export operations" 
                className="rounded-xl shadow-2xl w-full h-auto aspect-[3/2] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Export Inquiry Form */}
      <section className="py-24 bg-midnight">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Get Started</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-ivory mt-4 mb-6">
              Request Export Quote
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              Ready to start importing premium cashews? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="bg-cream-white shadow-2xl fade-in">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      className="border-stone-gray/20"
                      data-testid="export-name-input"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      {...form.register("company")}
                      className="border-stone-gray/20"
                      data-testid="export-company-input"
                    />
                    {form.formState.errors.company && (
                      <p className="text-red-500 text-sm">{form.formState.errors.company.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="border-stone-gray/20"
                      data-testid="export-email-input"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                      Country *
                    </Label>
                    <Select onValueChange={(value) => form.setValue("country", value)}>
                      <SelectTrigger className="border-stone-gray/20" data-testid="export-country-select">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="SG">Singapore</SelectItem>
                        <SelectItem value="UAE">United Arab Emirates</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.country && (
                      <p className="text-red-500 text-sm">{form.formState.errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    {...form.register("subject")}
                    placeholder="e.g., Bulk Order Inquiry"
                    className="border-stone-gray/20"
                    data-testid="export-subject-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                    Requirements & Message *
                  </Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    rows={6}
                    placeholder="Please describe your requirements, quantities needed, preferred packaging, shipping destination, and any specific preferences..."
                    className="border-stone-gray/20"
                    data-testid="export-message-textarea"
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-sm">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={inquiryMutation.isPending}
                    className="bg-muted-gold text-midnight px-12 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold/90 shadow-lg"
                    data-testid="export-submit-button"
                  >
                    {inquiryMutation.isPending ? "Submitting..." : "Request Quote"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Client Success</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mt-4 mb-6">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "RS Enterprises has been our trusted cashew supplier for over 5 years. Their quality consistency and reliable delivery make them our preferred partner.",
                author: "Sarah Johnson",
                company: "Premium Foods Ltd., UK",
                rating: 5
              },
              {
                quote: "The export process was seamless. From documentation to delivery, everything was handled professionally. Highly recommended for international trade.",
                author: "Hiroshi Tanaka",
                company: "Tokyo Nuts Co., Japan",
                rating: 5
              },
              {
                quote: "Excellent quality cashews at competitive prices. The organic range has been particularly popular with our health-conscious customers.",
                author: "Michel Dubois",
                company: "Gourmet Distributors, France",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-warm-ivory border-0 shadow-lg fade-in">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-muted-gold text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-stone-gray leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-midnight">{testimonial.author}</div>
                    <div className="text-stone-gray text-sm">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
