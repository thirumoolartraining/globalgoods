import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import { useEffect, useRef } from "react";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
  });

  // Featured products (first 4)
  const featuredProducts = products?.length ? products.slice(0, 4) : [];

  // Intersection Observer for fade-in animations
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-midnight/60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-warm-ivory mb-6 hero-text-shadow leading-tight">
              Premium Cashews<br />
              <span className="text-muted-gold">Globally Sourced</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-warm-ivory mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Experience the finest quality cashew nuts, meticulously processed and exported worldwide. 
              <span className="block mt-2">From farm to table, we deliver excellence in every kernel.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/shop">
                <Button 
                  size="lg"
                  className="bg-muted-gold text-midnight px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold/90 transition-all shadow-lg"
                  data-testid="explore-products-button"
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/export">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-muted-gold text-muted-gold px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold hover:text-midnight transition-all"
                  data-testid="export-inquiry-button"
                >
                  Export Inquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 lg:py-32 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Our Heritage</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mt-4 mb-6">
                Three Generations of Excellence
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2017, RS Enterprises has been at the forefront of premium cashew processing and export. 
                Our commitment to quality, sustainability, and innovation has made us a trusted partner for 
                discerning customers across 25 countries.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Every cashew we process undergoes rigorous quality checks, ensuring that only the finest 
                kernels reach your table. From small family farms to global markets, we bridge tradition with modernity.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-muted-gold">8+</div>
                  <div className="text-sm uppercase tracking-wide text-stone-gray">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-muted-gold">25+</div>
                  <div className="text-sm uppercase tracking-wide text-stone-gray">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-muted-gold">500+</div>
                  <div className="text-sm uppercase tracking-wide text-stone-gray">Clients</div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <img 
                src="https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=533&fit=crop&q=80" 
                alt="Modern cashew processing facility" 
                className="rounded-xl shadow-2xl image-hover-zoom w-full h-auto aspect-[3/2] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Premium Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-ivory mt-4 mb-6">
              Finest Cashew Varieties
            </h2>
            <p className="text-xl text-warm-ivory/80 max-w-3xl mx-auto">
              Discover our carefully curated selection of premium cashews, each variety offering 
              unique flavors and textures to satisfy the most discerning palates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-in">
            <Link href="/shop">
              <Button 
                size="lg"
                className="bg-muted-gold text-midnight px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold/90"
                data-testid="view-all-products-button"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              Ready to Experience Premium Quality?
            </h2>
            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              Join thousands of satisfied customers worldwide who trust RS Enterprises for their cashew needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-muted-gold text-midnight px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold/90"
                  data-testid="contact-us-button"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/export">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-muted-gold text-muted-gold px-8 py-4 font-semibold uppercase tracking-wide hover:bg-muted-gold hover:text-midnight"
                  data-testid="export-services-button"
                >
                  Export Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
