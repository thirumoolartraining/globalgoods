import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { inquirySchema } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import { useEffect, useRef } from "react";

// Extend the base inquiry schema with contact-specific fields
const contactInquirySchema = inquirySchema.extend({
  type: z.literal("contact"),
  // Add any additional fields specific to contact form
  subject: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
});

type ContactInquiryData = z.infer<typeof contactInquirySchema>;

export default function Contact() {
  console.log('Contact component is rendering');
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

  const handleSubmit = (data: ContactInquiryData) => {
    // Create email body with form data
    const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || 'Not provided'}\n` +
      `Company: ${data.company || 'Not provided'}\n` +
      `Country: ${data.country || 'Not provided'}\n\n` +
      `Message:\n${data.message}`
    );
    
    // Open default email client with pre-filled email
    window.location.href = `mailto:contact@rsenterprises.com?subject=${subject}&body=${body}`;
    
    // Show success message
    toast({
      title: "Message Ready",
      description: "Your email client should open with a pre-filled message. Please send it to contact us.",
    });
    
    // Reset form
    form.reset();
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
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
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
                      No: 46, Iyanar Koil Street<br />
                      Sivalingapuram<br />
                      Ariyankuppam, Pondicherry - 605007
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-muted-gold rounded-full p-3 flex-shrink-0">
                    <Phone className="h-6 w-6 text-midnight" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-midnight mb-2 text-lg">Contact Number</h3>
                    <p className="text-stone-gray leading-relaxed">
                      +91 72002 30057
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-muted-gold rounded-full p-3 flex-shrink-0">
                    <Mail className="h-6 w-6 text-midnight" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-midnight mb-2 text-lg">Email Address</h3>
                    <p className="text-stone-gray leading-relaxed">
                      info@rsenterprises.online
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
                  
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="Name"
                        {...form.register("name")}
                        error={form.formState.errors.name?.message}
                        required
                        className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                        data-testid="contact-name-input"
                      />

                      <FormField
                        label="Email"
                        type="email"
                        {...form.register("email")}
                        error={form.formState.errors.email?.message}
                        required
                        className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                        data-testid="contact-email-input"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        label="Company"
                        {...form.register("company")}
                        className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                        data-testid="contact-company-input"
                      />

                      <FormField
                        label="Subject"
                        {...form.register("subject")}
                        className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                        data-testid="contact-subject-input"
                      />
                    </div>

                    <FormField.Textarea
                      as="textarea"
                      label="Message"
                      placeholder="Tell us about your requirements, questions, or how we can help you..."
                      rows={6}
                      error={form.formState.errors.message?.message}
                      required
                      className="border-stone-gray/20 focus:ring-muted-gold focus:border-muted-gold"
                      data-testid="contact-message-textarea"
                      {...form.register("message")}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-muted-gold text-midnight py-3 font-semibold uppercase tracking-wide hover:bg-muted-gold/90 transition-colors"
                      data-testid="contact-submit-button"
                    >
                      Send Message
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
            <p className="text-stone-gray">Located in the heart of Pondicherry's cashew processing region</p>
          </div>
          
          <div className="fade-in">
            <div className="bg-stone-gray/20 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl text-midnight mb-2">Our Location</h3>
                <p className="text-stone-gray">No: 46, Iyanar Koil Street, Sivalingapuram,<br />Ariyankuppam, Pondicherry - 605007</p>
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
                <p className="text-warm-ivory">We respond to all inquiries within 4 business hours during office time.</p>
              </div>
            </div>

            <div className="text-center fade-in">
              <div className="bg-warm-ivory/10 rounded-xl p-8 mb-6">
                <Mail className="h-12 w-12 text-muted-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl text-warm-ivory mb-4">Expert Consultation</h3>
                <p className="text-warm-ivory">Our cashew experts are available for product consultation and custom solutions.</p>
              </div>
            </div>

            <div className="text-center fade-in">
              <div className="bg-warm-ivory/10 rounded-xl p-8 mb-6">
                <MapPin className="h-12 w-12 text-muted-gold mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-xl text-warm-ivory mb-4">Visit Our Facility</h3>
                <p className="text-warm-ivory">Schedule a visit to see our state-of-the-art processing facility firsthand.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
