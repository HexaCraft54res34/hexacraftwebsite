import { motion } from "framer-motion";
import { Users, Video, Globe, Wrench, Trophy, GraduationCap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const AUDIENCES = [
  { icon: Users, title: "Casual Minecraft Players", desc: "Just want a private server for you and your friends? Our Budget plans start at just ₹20/month with instant setup and easy management.", color: "text-green-400" },
  { icon: Video, title: "Content Creators & Streamers", desc: "Need reliable performance for your audience? Our Performance plans ensure smooth gameplay with zero lag, even during peak viewership.", color: "text-red-400" },
  { icon: Globe, title: "SMP & Community Servers", desc: "Building a community? Scale seamlessly from 10 to 200+ players with our flexible plans and zero-downtime upgrades.", color: "text-blue-400" },
  { icon: Wrench, title: "Modded Servers (Forge/Fabric)", desc: "Running heavy modpacks? Our AMD EPYC-powered Performance plans with DDR5 memory handle even the most demanding mods.", color: "text-orange-400" },
  { icon: Trophy, title: "Competitive & Large Networks", desc: "Running a network with BungeeCord or Velocity? We support multi-server setups with dedicated resources and DDoS protection.", color: "text-yellow-400" },
  { icon: GraduationCap, title: "Educators & Parents", desc: "Setting up a safe Minecraft environment for learning or family fun? Easy whitelisting, simple controls, and worry-free hosting.", color: "text-purple-400" },
];

const PLATFORMS = ["Spigot", "Paper", "Bukkit", "Forge", "Fabric", "Vanilla", "BungeeCord", "Velocity"];

export default function WhoItsForPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Who It's For
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="whoitsfor-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl">
            Perfect Hosting for <span className="text-primary">Every Type</span> of Gamer
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Whether you're a casual player or running a massive network, HexaCraft has the right solution for you.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUDIENCES.map((a, i) => (
              <motion.div key={a.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass-card rounded-lg p-8 group"
                data-testid={`audience-${a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <a.icon className={`w-6 h-6 ${a.color}`} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-3">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Compatibility
          </motion.p>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="font-heading text-3xl md:text-4xl font-bold text-white mb-12">
            Supported Platforms
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {PLATFORMS.map((p, i) => (
              <motion.div key={p}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.5}
                className="glass-card rounded-lg px-6 py-3 font-mono text-sm text-primary tracking-wider"
                data-testid={`platform-${p.toLowerCase()}`}
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
