import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  Hosting: [
    { label: "Minecraft Plans", to: "/plans" },
    { label: "VPS Plans", to: "/vps" },
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-white/5 bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="HexaCraft" className="w-8 h-8 rounded-lg" />
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                HEXA<span className="text-primary">CRAFT</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium Minecraft hosting powered by enterprise-grade hardware, NVMe storage, and advanced DDoS protection.
            </p>
          </motion.div>

          {Object.entries(FOOTER_LINKS).map(([category, links], ci) => (
            <motion.div key={category} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={ci + 1}>
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
            </motion.div>
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
