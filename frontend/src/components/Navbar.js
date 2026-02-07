import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe, Layers, Shield, Calculator, Wrench, HelpCircle, Info, Users, FileText, RotateCcw, Mail, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";

const SERVICES_LEFT = [
  { path: "/plans", label: "Minecraft Server", desc: "Premium Minecraft server hosting", icon: Globe },
  { path: "/vps", label: "VPS Hosting", desc: "High-performance VPS solutions", icon: Layers },
  { path: "/ddos-protection", label: "DDoS Protection", desc: "Advanced DDoS protection", icon: Shield },
];

const SERVICES_RIGHT = [
  { path: "/calculator", label: "Plan Calculator", icon: Calculator },
  { path: "/pterodactyl", label: "Pterodactyl Panel", icon: Wrench },
  { path: "/faq", label: "FAQ", icon: HelpCircle },
];

const COMPANY_LEFT = [
  { path: "/what-we-do", label: "About Us", desc: "Learn more about HexaCraft", icon: Info },
  { path: "/who-its-for", label: "Who It's For", desc: "Perfect hosting for every gamer", icon: Users },
];

const COMPANY_RIGHT = [
  { path: "/terms", label: "Terms of Service", icon: FileText },
  { path: "/refund-policy", label: "Refund Policy", icon: RotateCcw },
  { path: "/contact", label: "Contact Us", icon: Mail },
];

const ALL_MOBILE = [
  { path: "/", label: "Home" },
  { path: "/plans", label: "Minecraft Plans" },
  { path: "/vps", label: "VPS Plans" },
  { path: "/ddos-protection", label: "DDoS Protection" },
  { path: "/calculator", label: "Plan Calculator" },
  { path: "/pterodactyl", label: "Pterodactyl Panel" },
  { path: "/faq", label: "FAQ" },
  { path: "/what-we-do", label: "About Us" },
  { path: "/who-its-for", label: "Who It's For" },
  { path: "/terms", label: "Terms of Service" },
  { path: "/refund-policy", label: "Refund Policy" },
  { path: "/contact", label: "Contact Us" },
];

function MegaDropdown({ label, leftItems, rightItems, location }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleEnter = () => { clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 180); };

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = [...leftItems, ...rightItems].some((l) => l.path === location.pathname);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        data-testid={`nav-dropdown-${label.toLowerCase()}`}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
          isActive ? "text-primary" : "text-muted-foreground hover:text-white"
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#080B10]/98 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_12px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50"
            style={{ minWidth: "520px" }}
          >
            <div className="grid grid-cols-2 gap-0">
              {/* Left column — items with descriptions */}
              <div className="p-4 space-y-1 border-r border-white/5">
                {leftItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`flex items-start gap-3.5 px-3 py-3 rounded-lg transition-colors group ${
                      location.pathname === item.path ? "bg-primary/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
                      location.pathname === item.path ? "border-primary/40 bg-primary/10" : "border-white/10 bg-white/5 group-hover:border-white/20"
                    }`}>
                      <item.icon className={`w-5 h-5 ${location.pathname === item.path ? "text-primary" : "text-muted-foreground group-hover:text-white"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${location.pathname === item.path ? "text-primary" : "text-white"}`}>{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Right column — compact items */}
              <div className="p-4 space-y-1">
                {rightItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`dropdown-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4.5 h-4.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
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
          {/* Left: Logo + Dropdowns */}
          <div className="flex items-center gap-1">
            <Link to="/" className="flex items-center gap-2.5 group mr-4" data-testid="logo-link">
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

            <div className="hidden lg:flex items-center">
              <MegaDropdown label="Services" leftItems={SERVICES_LEFT} rightItems={SERVICES_RIGHT} location={location} />
              <MegaDropdown label="Company" leftItems={COMPANY_LEFT} rightItems={COMPANY_RIGHT} location={location} />
            </div>
          </div>

          {/* Right: Support + Discord */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://discord.com/invite/RDPCm2vt3B" target="_blank" rel="noopener noreferrer" data-testid="nav-support-btn">
              <Button className="bg-primary text-black font-bold uppercase tracking-wider text-xs px-5 py-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                Support
              </Button>
            </a>
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
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {ALL_MOBILE.map((link, i) => (
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
              <div className="pt-3 border-t border-white/5">
                <a href="https://discord.com/invite/RDPCm2vt3B" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-primary text-black font-bold uppercase tracking-wider text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    Support <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
