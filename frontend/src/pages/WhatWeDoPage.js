import { motion } from "framer-motion";
import { Cpu, HardDrive, Shield, Zap, Globe, Server, Users, Settings } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const INFRA = [
  { icon: Cpu, title: "Enterprise Processors", desc: "Intel Platinum 8269-CY and AMD EPYC 9354P processors deliver unmatched single-thread and multi-thread performance for your servers." },
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "Ultra-fast NVMe drives ensure instant chunk loading, rapid world saves, and zero lag from storage bottlenecks." },
  { icon: Shield, title: "DDoS Protection", desc: "Multi-layer protection guards your server against volumetric and application-layer attacks with automatic detection." },
  { icon: Zap, title: "High Uptime", desc: "Enterprise-grade infrastructure with redundant power, networking, and storage ensures your server stays online." },
  { icon: Globe, title: "Scalable Solutions", desc: "Easily scale from a small SMP to a massive network. Upgrade RAM, CPU, and storage with zero downtime." },
  { icon: Settings, title: "Pterodactyl Panel", desc: "Industry-standard game panel for easy server management, file editing, console access, and one-click installs." },
];

export default function WhatWeDoPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            What We Do
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="whatwedo-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl">
            Empowering Gamers with <span className="text-primary">Premium Hosting</span> Solutions
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We provide enterprise-grade gaming infrastructure using the latest hardware, ensuring your Minecraft server runs at peak performance 24/7.
          </motion.p>
        </div>
      </section>

      {/* Infrastructure Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INFRA.map((item, i) => (
              <motion.div key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass-card rounded-lg p-8 group"
                data-testid={`infra-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Making Gaming Simple */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">Simple & Powerful</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Making Gaming Hosting Simple
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe server hosting should be effortless. With our Pterodactyl-based panel, you get full control over your server without the complexity. Install plugins, manage players, switch versions, and monitor performance all from one dashboard.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our automated systems handle the infrastructure so you can focus on what matters - building your community and enjoying the game.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
              className="glass-card rounded-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="space-y-4">
                {["One-click plugin installation", "Drag-and-drop file manager", "Real-time console access", "Automated backup system", "Version switching in seconds"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built for Communities */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">Our Mission</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Built for Communities, Powered by Passion
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              HexaCraft was founded by gamers, for gamers. We understand the frustration of laggy servers, unexpected downtime, and complicated hosting panels. That's why we built a platform that puts performance and simplicity first, backed by a team that truly cares about your gaming experience.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
