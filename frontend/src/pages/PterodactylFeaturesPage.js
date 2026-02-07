import { motion } from "framer-motion";
import { Package, Users, RefreshCw, FileText, Globe, FolderOpen, Terminal, Archive } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const FEATURES = [
  { icon: Package, title: "Plugin Installer", desc: "Browse and install plugins directly from the panel with one click. Supports Spigot, Paper, and Bukkit plugin repositories." },
  { icon: Users, title: "Player Manager", desc: "View online players, manage whitelist, ban/unban players, and monitor player activity in real-time." },
  { icon: RefreshCw, title: "Version Changer", desc: "Switch between Paper, Spigot, Forge, Fabric, and other server software instantly. Supports all Minecraft versions." },
  { icon: FileText, title: "Minecraft Logs Viewer", desc: "Access real-time and historical logs directly from the panel. Filter, search, and download logs for troubleshooting." },
  { icon: Globe, title: "Subdomains", desc: "Create custom subdomains for your server at ₹20 per subdomain. Make your server easy to find and connect to." },
  { icon: FolderOpen, title: "File Manager", desc: "Full drag-and-drop file manager with code editor. Upload, download, edit, and manage server files from your browser." },
  { icon: Terminal, title: "Console Access", desc: "Direct console access from the web panel. Execute commands, monitor output, and manage your server remotely." },
  { icon: Archive, title: "Backup & Restore", desc: "Create manual or automated backups. Restore your server to any backup point with a single click. Never lose progress." },
];

export default function PterodactylFeaturesPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Control Panel
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="pterodactyl-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl">
            Pterodactyl <span className="text-primary">Panel Features</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Full-featured game server management panel with everything you need to run your server.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass-card rounded-lg p-8 group flex gap-6"
                data-testid={`panel-feature-${f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
