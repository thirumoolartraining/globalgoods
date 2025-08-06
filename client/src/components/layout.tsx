import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartSidebar } from "./cart-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/export", label: "Export" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-midnight/95 backdrop-blur-sm border-b border-muted-gold/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-serif font-bold text-warm-ivory">RS Enterprises</h1>
              <span className="ml-3 text-muted-gold text-sm uppercase tracking-wide">Premium Cashews</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-warm-ivory hover:text-muted-gold transition-colors ${
                    location === link.href ? "text-muted-gold" : ""
                  }`}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="text-warm-ivory hover:text-muted-gold relative"
                data-testid="cart-button"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-muted-gold text-midnight text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-warm-ivory"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-muted-gold/20 mt-4">
              <div className="flex flex-col space-y-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-warm-ivory hover:text-muted-gold transition-colors ${
                      location === link.href ? "text-muted-gold" : ""
                    }`}
                    data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(true)}
                  className="text-warm-ivory hover:text-muted-gold justify-start p-0"
                  data-testid="mobile-cart-button"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({totalItems})
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-midnight py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-warm-ivory mb-4">RS Enterprises</h3>
              <p className="text-warm-ivory/80 mb-6">Premium cashew nuts for discerning customers worldwide. Quality, sustainability, and excellence in every kernel.</p>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-warm-ivory mb-4">Quick Links</h4>
              <ul className="space-y-2 text-warm-ivory/80">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-muted-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-warm-ivory mb-4">Products</h4>
              <ul className="space-y-2 text-warm-ivory/80">
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Raw Cashews</Link></li>
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Roasted & Salted</Link></li>
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Organic Cashews</Link></li>
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Flavored Varieties</Link></li>
                <li><Link href="/export" className="hover:text-muted-gold transition-colors">Bulk Orders</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-warm-ivory mb-4">Contact Info</h4>
              <div className="space-y-2 text-warm-ivory/80">
                <p>123 Industrial Estate<br />Kollam, Kerala, India</p>
                <p>Phone: +91 474 2345678</p>
                <p>Email: info@rscashews.com</p>
              </div>
            </div>
          </div>

          <div className="section-divider mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-warm-ivory/60 text-sm">
            <p>&copy; 2024 RS Enterprises. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-muted-gold transition-colors">Privacy Policy</Link>
              <a href="#" className="hover:text-muted-gold transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-muted-gold transition-colors">Shipping Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar />
    </>
  );
}
