import { Link } from "react-router-dom";
import { Hexagon } from "lucide-react";

const FOOTER_LINKS = {
  Hosting: [
    { label: "Minecraft Plans", to: "/plans" },
    { label: "Plan Calculator", to: "/calculator" },
    { label: "Pterodactyl Panel", to: "/pterodactyl" },
    { label: "DDoS Protection", to: "/ddos-protection" },
  ],
  Company: [
    { label: "What We Do", to: "/what-we-do" },
    { label: "Who It's For", to: "/who-its-for" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact Us", to: "/contact" },
  ],
  Legal: [
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Refund Policy", to: "/refund-policy" },
  ],
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-white/5 bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Hexagon className="w-7 h-7 text-primary" />
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                HEXA<span className="text-primary">CRAFT</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium Minecraft hosting powered by enterprise-grade hardware, NVMe storage, and advanced DDoS protection.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading text-sm font-semibold tracking-widest uppercase text-primary mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      data-testid={`footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HexaCraft. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by enterprise-grade infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}
