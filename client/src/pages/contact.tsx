import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertInquirySchema, InsertInquiry } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import { useEffect, useRef } from "react";

const contactInquirySchema = insertInquirySchema.extend({
  type: z.literal("contact"),
});

type ContactInquiryData = z.infer<typeof contactInquirySchema>;

export default function Contact() {
  const { toast } = useToast();
  const observerRef = useRef<IntersectionObserver>();

  const form = useForm<ContactInquiryData>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      type: "contact",
      name: "",
      email: "",
      company: "",
      country: "",
      subject: "",
      message: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: async (data: ContactInquiryData) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactInquiryData) => {
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
    <div className="min-h-screen bg-warm-ivory">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-warm-ivory mt-4 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-warm-ivory/80 max-w-3xl mx-auto leading-relaxed">
              Ready to place an order or have questions? We're here to help with all your premium cashew needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="fade-in">
              <h2 className="text-3xl font-serif font-bold text-midnight mb-8">Reach Out to Us</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-muted-gold rounded-full p-3 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-midnight" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-midnight mb-2 text-lg">India Headquarters</h3>
                    <p className="text-stone-gray leading-relaxed">
                      123 Industrial Estate, Kollam<br />
                      Kerala, India - 691001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-muted-gold rounded-full p-3 flex-shrink-0">
                    <Phone className="h-6 w-6 text-midnight" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-midnight mb-2 text-lg">Phone Numbers</h3>
                    <p className="text-stone-gray leading-relaxed">
                      Main: +91 474 2345678<br />
                      Mobile: +91 9876 543210<br />
                      Export Desk: +91 474 2345679
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-muted-gold rounded-full p-3 flex-shrink-0">
                    <Mail className="h-6 w-6 text-midnight" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-midnight mb-2 text-lg">Email Addresses</h3>
                    <p className="text-stone-gray leading-relaxed">
                      General: info@rscashews.com<br />
                      Export: export@rscashews.com<br />
                      Sales: sales@rscashews.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-muted-gold rounded-full p-3 flex-shrink-0">
                    <Clock className="h-6 w-6 text-midnight" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-midnight mb-2 text-lg">Business Hours</h3>
                    <p className="text-stone-gray leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      Saturday: 9:00 AM - 2:00 PM IST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="font-semibold text-midnight mb-4 text-lg">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-midnight text-warm-ivory p-3 rounded-full hover:bg-muted-gold hover:text-midnight transition-colors"
                    data-testid="linkedin-link"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-midnight text-warm-ivory p-3 rounded-full hover:bg-muted-gold hover:text-midnight transition-colors"
                    data-testid="facebook-link"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-midnight text-warm-ivory p-3 rounded-full hover:bg-muted-gold hover:text-midnight transition-colors"
                    data-testid="instagram-link"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-in">
              <Card className="bg-cream-white shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif font-semibold text-midnight mb-6">Send us a Message</h3>
                  
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="contact-name-input"
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="contact-email-input"
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          Company
                        </Label>
                        <Input
                          id="company"
                          {...form.register("company")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="contact-company-input"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          {...form.register("subject")}
                          className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                          data-testid="contact-subject-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-midnight uppercase tracking-wide">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        {...form.register("message")}
                        rows={6}
                        placeholder="Tell us about your requirements, questions, or how we can help you..."
                        className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                        data-testid="contact-message-textarea"
                      />
                      {form.formState.errors.message && (
                        <p className="text-red-500 text-sm">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={inquiryMutation.isPending}
                      className="w-full bg-muted-gold text-midnight py-3 font-semibold uppercase tracking-wide hover:bg-muted-gold/90 transition-colors"
                      data-testid="contact-submit-button"
                    >
                      {inquiryMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl font-serif font-bold text-midnight mb-4">Find Us</h2>
            <p className="text-stone-gray">Located in the heart of Kerala's cashew processing region</p>
          </div>
          
          <div className="fade-in">
            <div className="bg-stone-gray/20 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl text-midnight mb-2">Our Location</h3>
                <p className="text-stone-gray">123 Industrial Estate, Kollam, Kerala, India</p>
                <p className="text-stone-gray text-sm mt-2">Interactive map integration available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center fade-in">
              <div className="bg-warm-ivory/10 rounded-xl p-8 mb-6">
                <Phone className="h-12 w-12 text-muted-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl text-warm-ivory mb-4">Quick Response</h3>
                <p className="text-warm-ivory/80">We respond to all inquiries within 4 business hours during office time.</p>
              </div>
            </div>

            <div className="text-center fade-in">
              <div className="bg-warm-ivory/10 rounded-xl p-8 mb-6">
                <Mail className="h-12 w-12 text-muted-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl text-warm-ivory mb-4">Expert Consultation</h3>
                <p className="text-warm-ivory/80">Our cashew experts are available for product consultation and custom solutions.</p>
              </div>
            </div>

            <div className="text-center fade-in">
              <div className="bg-warm-ivory/10 rounded-xl p-8 mb-6">
                <MapPin className="h-12 w-12 text-muted-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl text-warm-ivory mb-4">Visit Our Facility</h3>
                <p className="text-warm-ivory/80">Schedule a visit to see our state-of-the-art processing facility firsthand.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
