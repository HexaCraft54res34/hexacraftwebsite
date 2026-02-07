import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Server, Shield, Cpu, Info, Mail, FileText, RotateCcw, Users, Calculator, Wrench, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/button";

const SERVICES_LINKS = [
  { path: "/plans", label: "Minecraft Plans", icon: Server },
  { path: "/vps", label: "VPS Plans", icon: Cpu },
  { path: "/ddos-protection", label: "DDoS Protection", icon: Shield },
];

const COMPANY_LINKS = [
  { path: "/what-we-do", label: "About Us", icon: Info },
  { path: "/contact", label: "Contact Info", icon: Mail },
  { path: "/terms", label: "Terms & Conditions", icon: FileText },
  { path: "/refund-policy", label: "Refund Policy", icon: RotateCcw },
];

const STANDALONE_LINKS = [
  { path: "/who-its-for", label: "Who It's For" },
  { path: "/calculator", label: "Calculator" },
  { path: "/pterodactyl", label: "Panel" },
  { path: "/faq", label: "FAQ" },
];

const ALL_MOBILE_LINKS = [
  { path: "/", label: "Home" },
  { path: "/plans", label: "Minecraft Plans" },
  { path: "/vps", label: "VPS Plans" },
  { path: "/ddos-protection", label: "DDoS Protection" },
  { path: "/who-its-for", label: "Who It's For" },
  { path: "/calculator", label: "Calculator" },
  { path: "/pterodactyl", label: "Panel" },
  { path: "/faq", label: "FAQ" },
  { path: "/what-we-do", label: "About Us" },
  { path: "/contact", label: "Contact" },
  { path: "/terms", label: "Terms & Conditions" },
  { path: "/refund-policy", label: "Refund Policy" },
];

function NavDropdown({ label, links, location }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActiveGroup = links.some((l) => l.path === location.pathname);

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        data-testid={`nav-dropdown-${label.toLowerCase()}`}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded ${
          isActiveGroup ? "text-primary" : "text-muted-foreground hover:text-white"
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1 w-56 bg-[#0A0F14]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
          >
            <div className="py-2">
              {links.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`dropdown-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
    <motion.nav
      data-testid="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" data-testid="logo-link">
            <motion.img
              src="/logo.png"
              alt="HexaCraft"
              className="w-9 h-9 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            />
            <span className="font-heading text-xl font-bold tracking-wider text-white">
              HEXA<span className="text-primary">CRAFT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Home */}
            <Link to="/" data-testid="nav-home"
              className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-white"
              }`}>
              Home
              {location.pathname === "/" && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }} />
              )}
            </Link>

            {/* Services Dropdown */}
            <NavDropdown label="Services" links={SERVICES_LINKS} location={location} />

            {/* Company Dropdown */}
            <NavDropdown label="Company" links={COMPANY_LINKS} location={location} />

            {/* Standalone Links */}
            {STANDALONE_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                  }`}>
                  {link.label}
                  {isActive && (
                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <Button
            data-testid="mobile-menu-toggle"
            variant="ghost"
            size="icon"
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {ALL_MOBILE_LINKS.map((link, i) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03, duration: 0.3 }}>
                  <Link
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
