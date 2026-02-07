import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Server, Globe, Cpu, Users, ChevronRight, Clock, HardDrive, Headphones } from "lucide-react";
import { Button } from "../components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const FEATURES = [
  { icon: Shield, title: "DDoS Protection", desc: "Advanced Layer 3/4 & 7 protection with zero-downtime mitigation" },
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "Ultra-fast read/write speeds for instant chunk loading" },
  { icon: Server, title: "Pterodactyl Panel", desc: "Full-featured game panel with one-click installs" },
  { icon: Zap, title: "Instant Setup", desc: "Server deployed in seconds, ready to play immediately" },
  { icon: Headphones, title: "24/7 Support", desc: "Expert support team available around the clock" },
  { icon: Cpu, title: "Enterprise Hardware", desc: "Intel Platinum & AMD EPYC processors for peak performance" },
];

const TRUST = [
  { value: "99.9%", label: "Uptime Guarantee", sub: "Enterprise reliability" },
  { value: "0%", label: "Data Loss", sub: "Redundant backups" },
  { value: "<1s", label: "Setup Time", sub: "Instant provisioning" },
  { value: "24/7", label: "Support", sub: "Always available" },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="grid-bg absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-4xl">
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp}
              className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-6"
              data-testid="hero-caption"
            >
              Premium Minecraft Hosting
            </motion.p>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight uppercase leading-[1.1] text-white"
              data-testid="hero-heading"
            >
              Premium Minecraft Hosting &{" "}
              <span className="text-primary neon-text">DDoS-Protected</span> VPS Solutions
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
              data-testid="hero-subheading"
            >
              High-performance Minecraft servers powered by enterprise-grade hardware, NVMe storage, and advanced DDoS protection.
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/plans">
                <Button data-testid="hero-view-plans" className="bg-primary text-black font-bold uppercase tracking-widest px-8 py-6 text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all cut-corner-btn">
                  View Plans <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button data-testid="hero-calculator" variant="outline" className="border-primary text-primary hover:bg-primary/10 uppercase tracking-widest px-8 py-6 text-sm">
                  Calculate Server Specs
                </Button>
              </Link>
              <Link to="/contact">
                <Button data-testid="hero-contact" variant="ghost" className="text-muted-foreground hover:text-white uppercase tracking-widest px-8 py-6 text-sm">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4"
          >
            Why HexaCraft
          </motion.p>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-16"
          >
            Built for Performance
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass-card rounded-lg p-8 group"
                data-testid={`feature-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 border-t border-white/5" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST.map((t, i) => (
              <motion.div
                key={t.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="text-center"
                data-testid={`trust-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <p className="font-heading text-4xl md:text-5xl font-bold text-primary neon-text">{t.value}</p>
                <p className="font-heading text-sm font-semibold text-white mt-2 uppercase tracking-wider">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="hero-glow absolute inset-0 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to <span className="text-primary">Level Up</span>?
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10"
          >
            Join thousands of gamers running their servers on HexaCraft infrastructure.
          </motion.p>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
          >
            <Link to="/plans">
              <Button data-testid="cta-get-started" className="bg-primary text-black font-bold uppercase tracking-widest px-10 py-6 text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
                Get Started Now <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
