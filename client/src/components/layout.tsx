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
      <nav className="fixed w-full z-50 bg-midnight border-b border-muted-gold/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/logo/logo.png" 
                alt="RS Enterprises Logo" 
                className="h-12 w-auto"
              />
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
      <footer className="bg-midnight py-16 text-white/90 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="inline-block mb-4">
                <img 
                  src="/images/logo/logo.png" 
                  alt="RS Enterprises Logo" 
                  className="h-10 w-auto"
                />
              </Link>
              <p className="mb-6">Premium cashew nuts for discerning customers worldwide. Quality, sustainability, and excellence in every kernel.</p>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
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
              <h4 className="font-serif font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Raw Cashews</Link></li>
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Roasted & Salted</Link></li>
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Organic Cashews</Link></li>
                <li><Link href="/shop" className="hover:text-muted-gold transition-colors">Flavored Varieties</Link></li>
                <li><Link href="/export" className="hover:text-muted-gold transition-colors">Bulk Orders</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-white mb-4">Contact Info</h4>
              <div className="space-y-2">
                <p>No: 46, Iyanar Koil Street<br />Sivalingapuram<br />Ariyankuppam, Pondicherry - 605007</p>
                <p>Phone: +91 72002 30057</p>
                <p>Email: info@rsenterprises.online</p>
              </div>
            </div>
          </div>

          <div className="section-divider mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-white/80 text-sm">
            <p>&copy; 2024 RS Enterprises. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-muted-gold transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-muted-gold transition-colors">Terms of Service</Link>
              <Link href="/shipping-policy" className="hover:text-muted-gold transition-colors">Shipping Policy</Link>
              <Link href="/cancellation-refund" className="hover:text-muted-gold transition-colors">Cancellation & Refund</Link>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar />
    </>
  );
}
