import { motion } from "framer-motion";
import { Shield, Layers, Eye, Zap, Lock, Server } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const PROTECTION_LAYERS = [
  { icon: Layers, title: "Layer 3/4 Protection", desc: "Blocks volumetric attacks including UDP floods, SYN floods, and ICMP attacks before they reach your server.", stat: "10+ Tbps" },
  { icon: Lock, title: "Layer 7 Protection", desc: "Application-layer protection specifically designed to filter malicious Minecraft protocol packets while allowing legitimate traffic.", stat: "Real-time" },
  { icon: Eye, title: "Automatic Detection", desc: "AI-powered detection systems identify and mitigate attacks within milliseconds, without any manual intervention required.", stat: "<50ms" },
  { icon: Zap, title: "Zero Downtime", desc: "Mitigation happens transparently. Your players won't notice a thing while attacks are being filtered and blocked.", stat: "0% Impact" },
];

export default function DDoSProtectionPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Security
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="ddos-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl">
            Advanced <span className="text-primary">DDoS Protection</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Enterprise-grade DDoS mitigation included free with every plan. Your server stays online, no matter what.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROTECTION_LAYERS.map((item, i) => (
              <motion.div key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass-card rounded-lg p-8 group relative overflow-hidden"
                data-testid={`ddos-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-xs text-primary/60 tracking-wider">{item.stat}</span>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minecraft Specific */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">Minecraft-Specific</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Built for Gaming Traffic
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our DDoS mitigation is specifically tuned for Minecraft traffic patterns. We understand the difference between legitimate player connections and malicious packets, ensuring zero false positives.
              </p>
              <div className="space-y-4">
                {[
                  "Minecraft protocol-aware filtering",
                  "Connection rate limiting per IP",
                  "Automatic null-route bypass",
                  "Real-time attack analytics dashboard",
                  "Custom firewall rules available",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              className="glass-card rounded-lg p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative space-y-6">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
                  <p className="font-heading text-4xl font-bold text-primary neon-text">Protected</p>
                  <p className="text-sm text-muted-foreground mt-2">All plans include full DDoS protection</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-secondary/30 rounded-lg p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-white">L3/L4</p>
                    <p className="text-xs text-muted-foreground mt-1">Network Layer</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-white">L7</p>
                    <p className="text-xs text-muted-foreground mt-1">Application Layer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
