import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";

export default function About() {
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
      <section className="relative py-24 lg:py-32 bg-midnight">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-warm-ivory mt-4 mb-6">
              Excellence Since 1987
            </h1>
            <p className="text-xl text-warm-ivory/80 max-w-3xl mx-auto leading-relaxed">
              Three generations of dedication to quality, sustainability, and innovation in cashew processing and export.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 lg:py-32 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in">
              <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mt-4 mb-6">
                Delivering Excellence Worldwide
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                At RS Enterprises, we are dedicated to delivering the world's finest cashew nuts through 
                sustainable farming practices, advanced processing techniques, and unwavering quality control. 
                Our mission extends beyond profit to environmental stewardship and community support.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                We work directly with farmers to ensure fair pricing while maintaining the highest quality 
                standards. Every step of our process, from cultivation to packaging, reflects our commitment 
                to excellence and sustainability.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-warm-ivory rounded-xl">
                  <div className="text-3xl font-serif font-bold text-muted-gold mb-2">500+</div>
                  <div className="text-sm uppercase tracking-wide text-stone-gray">Partner Farmers</div>
                </div>
                <div className="text-center p-6 bg-warm-ivory rounded-xl">
                  <div className="text-3xl font-serif font-bold text-muted-gold mb-2">99.8%</div>
                  <div className="text-sm uppercase tracking-wide text-stone-gray">Quality Rating</div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional team in processing facility" 
                className="rounded-xl shadow-2xl image-hover-zoom w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-24 lg:py-32 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mt-4 mb-6">
              Milestones of Success
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                year: "1987",
                title: "Foundation",
                description: "RS Enterprises was founded with a vision to bring premium quality cashews to the global market.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                year: "1995",
                title: "First Export",
                description: "Began international operations with our first export shipment to Europe, marking the start of our global journey.",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                year: "2005",
                title: "Organic Certification",
                description: "Achieved organic certification, becoming pioneers in sustainable cashew farming and processing.",
                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                year: "2015",
                title: "Global Expansion",
                description: "Expanded operations to serve 25+ countries with state-of-the-art processing facilities.",
                image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                year: "2024",
                title: "Future Vision",
                description: "Continuing innovation with sustainable practices and technology-driven quality assurance.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((milestone, index) => (
              <div 
                key={milestone.year} 
                className={`fade-in grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Badge variant="outline" className="mb-4 text-muted-gold border-muted-gold">
                    {milestone.year}
                  </Badge>
                  <h3 className="text-3xl font-serif font-bold text-midnight mb-4">
                    {milestone.title}
                  </h3>
                  <p className="text-lg text-stone-gray leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <img 
                    src={milestone.image}
                    alt={milestone.title}
                    className="rounded-xl shadow-xl w-full h-80 object-cover image-hover-zoom"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-midnight">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-ivory mt-4 mb-6">
              Our Expert Team
            </h2>
            <p className="text-xl text-warm-ivory/80 max-w-3xl mx-auto">
              Led by industry veterans with decades of experience in cashew processing and international trade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Sharma",
                role: "Founder & CEO",
                experience: "35+ years",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Priya Menon",
                role: "Head of Quality Assurance",
                experience: "20+ years",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Arjun Nair",
                role: "Export Director",
                experience: "18+ years",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, index) => (
              <Card key={index} className="bg-warm-ivory/10 border border-warm-ivory/20 text-center fade-in">
                <CardContent className="p-8">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-serif font-semibold text-warm-ivory mb-2">{member.name}</h3>
                  <p className="text-muted-gold mb-2">{member.role}</p>
                  <p className="text-warm-ivory/80 text-sm">{member.experience} experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-cream-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="text-muted-gold font-semibold uppercase tracking-wider text-sm">Core Values</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-midnight mt-4 mb-6">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏆",
                title: "Quality Excellence",
                description: "Uncompromising commitment to delivering the highest quality products."
              },
              {
                icon: "🌱",
                title: "Sustainability",
                description: "Environmental responsibility and sustainable farming practices."
              },
              {
                icon: "🤝",
                title: "Fair Trade",
                description: "Ethical partnerships with farmers and transparent business practices."
              },
              {
                icon: "🌍",
                title: "Global Reach",
                description: "Serving customers worldwide with consistent quality and service."
              }
            ].map((value, index) => (
              <Card key={index} className="text-center bg-warm-ivory border-0 shadow-lg fade-in">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-serif font-semibold text-xl text-midnight mb-4">{value.title}</h3>
                  <p className="text-stone-gray">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
