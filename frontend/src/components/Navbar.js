import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hexagon } from "lucide-react";
import { Button } from "../components/ui/button";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/what-we-do", label: "What We Do" },
  { path: "/who-its-for", label: "Who It's For" },
  { path: "/plans", label: "Plans" },
  { path: "/calculator", label: "Calculator" },
  { path: "/pterodactyl", label: "Panel" },
  { path: "/ddos-protection", label: "DDoS" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group" data-testid="logo-link">
            <Hexagon className="w-8 h-8 text-primary transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            <span className="font-heading text-xl font-bold tracking-wider text-white">
              HEXA<span className="text-primary">CRAFT</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button
            data-testid="mobile-menu-toggle"
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`block px-4 py-3 text-sm font-medium tracking-wide rounded transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
