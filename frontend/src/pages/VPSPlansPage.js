import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Shield, Wifi, MapPin, ShieldCheck, Terminal, Check, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const XEON_PLANS = [
  { name: "Xeon 2 vCore / 8 GB", price: 199, processor: "Intel Xeon e5 2690 v2 (2 vCores)", memory: "8 GB ECC Memory", storage: "80 GB SSD Storage", turbo: "3.60 GHz Turbo", popular: false },
  { name: "Xeon 4 vCore / 16 GB", price: 399, processor: "Intel Xeon e5 2690 v2 (4 vCores)", memory: "16 GB ECC Memory", storage: "150 GB SSD Storage", turbo: "3.60 GHz Turbo", popular: false },
  { name: "Xeon 6 vCore / 24 GB", price: 599, processor: "Intel Xeon e5 2690 v2 (6 vCores)", memory: "24 GB ECC Memory", storage: "200 GB SSD Storage", turbo: "3.60 GHz Turbo", popular: false },
  { name: "Xeon 8 vCore / 32 GB", price: 799, processor: "Intel Xeon e5 2690 v2 (8 vCores)", memory: "32 GB ECC Memory", storage: "200 GB SSD Storage", turbo: "3.60 GHz Turbo", popular: true },
  { name: "Xeon 10 vCore / 48 GB", price: 1199, processor: "Intel Xeon e5 2690 v2 (10 vCores)", memory: "48 GB ECC Memory", storage: "200 GB SSD Storage", turbo: "3.60 GHz Turbo", popular: false },
  { name: "Xeon 12 vCore / 64 GB", price: 1499, processor: "Intel Xeon e5 2690 v2 (12 vCores)", memory: "64 GB ECC Memory", storage: "300 GB SSD Storage", turbo: "3.60 GHz Turbo", popular: false },
];

const PLATINUM_PLANS = [
  { name: "Platinum 4 vCore / 8 GB", price: 299, processor: "Intel Platinum 8160 (4 vCores)", memory: "8 GB DDR4 ECC Memory", storage: "80 GB NVMe SSD Storage", turbo: "3.70 GHz Turbo", popular: false },
  { name: "Platinum 6 vCore / 16 GB", price: 499, processor: "Intel Platinum 8160 (6 vCores)", memory: "16 GB DDR4 ECC Memory", storage: "150 GB NVMe SSD Storage", turbo: "3.70 GHz Turbo", popular: false },
  { name: "Platinum 6 vCore / 24 GB", price: 799, processor: "Intel Platinum 8160 (6 vCores)", memory: "24 GB DDR4 ECC Memory", storage: "200 GB NVMe SSD Storage", turbo: "3.70 GHz Turbo", popular: false },
  { name: "Platinum 8 vCore / 32 GB", price: 999, processor: "Intel Platinum 8160 (8 vCores)", memory: "32 GB DDR4 ECC Memory", storage: "200 GB NVMe SSD Storage", turbo: "3.70 GHz Turbo", popular: true },
  { name: "Platinum 12 vCore / 48 GB", price: 1499, processor: "Intel Platinum 8160 (12 vCores)", memory: "48 GB DDR4 ECC Memory", storage: "300 GB NVMe SSD Storage", turbo: "3.70 GHz Turbo", popular: false },
  { name: "Platinum 16 vCore / 64 GB", price: 1999, processor: "Intel Platinum 8160 (16 vCores)", memory: "64 GB DDR4 ECC Memory", storage: "400 GB NVMe SSD Storage", turbo: "3.70 GHz Turbo", popular: false },
];

function VPSCard({ plan, index }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={fadeUp} custom={index}
      className={`glass-card rounded-lg p-6 relative group flex flex-col ${plan.popular ? "border-primary/50 neon-border" : ""}`}
      data-testid={`vps-card-${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 right-6 bg-primary text-black font-bold text-xs uppercase tracking-wider px-3">
          Popular
        </Badge>
      )}

      <h3 className="font-heading text-lg font-bold text-white mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-heading text-3xl font-bold text-primary">₹{plan.price}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>

      {/* Specs */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-2.5 text-sm">
          <Cpu className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">{plan.processor}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <HardDrive className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">{plan.memory}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <HardDrive className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">{plan.storage}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <Cpu className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">{plan.turbo}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <Wifi className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">Unmetered Bandwidth</span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2.5 mb-6 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2.5 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">Noida, IN Datacenter</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <ShieldCheck className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">Advanced DDoS Mitigation</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <Terminal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">Full Root Access</span>
        </div>
      </div>

      <div className="mt-auto">
        <a href="https://discord.com/invite/RDPCm2vt3B" target="_blank" rel="noopener noreferrer">
          <Button
            data-testid={`buy-vps-${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className={`w-full font-bold uppercase tracking-wider text-xs ${
              plan.popular
                ? "bg-primary text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
            } transition-all`}
          >
            Buy Now <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </a>
        <p className="text-[10px] text-muted-foreground text-center mt-2">Visit the ticket section on Discord to create a buy ticket</p>
      </div>
    </motion.div>
  );
}

export default function VPSPlansPage() {
  return (
    <div className="pt-20 pb-16">
      {/* Hero with background image */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="vps-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white">
            VPS <span className="text-primary">Hosting</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            High-performance VPS hosting with full root access and instant deployment
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="mt-4 text-white font-heading text-lg">
            Starting at <span className="font-bold text-primary text-2xl">₹199</span>/month
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="mt-8">
            <a href="#plans">
              <Button data-testid="vps-view-plans-btn" className="bg-primary text-black font-bold uppercase tracking-widest px-8 py-6 text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
                View Plans <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Location</p>
          <div className="inline-flex items-center gap-1 bg-secondary/40 border border-white/10 rounded-full p-1">
            <span className="bg-primary text-black font-bold text-sm px-5 py-2 rounded-full">India <span className="font-mono text-xs opacity-70">(Low Latency)</span></span>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Hosted in Noida, IN Datacenter</p>
        </div>
      </section>

      <section className="py-12" id="plans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="xeon" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-secondary/50 border border-white/5 p-1" data-testid="vps-tab-list">
                <TabsTrigger value="xeon" data-testid="tab-xeon"
                  className="data-[state=active]:bg-primary data-[state=active]:text-black font-heading uppercase tracking-wider text-sm px-6">
                  Intel Xeon
                </TabsTrigger>
                <TabsTrigger value="platinum" data-testid="tab-platinum"
                  className="data-[state=active]:bg-primary data-[state=active]:text-black font-heading uppercase tracking-wider text-sm px-6">
                  Intel Platinum
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="xeon">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {XEON_PLANS.map((p, i) => <VPSCard key={p.name} plan={p} index={i} />)}
              </div>
            </TabsContent>

            <TabsContent value="platinum">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PLATINUM_PLANS.map((p, i) => <VPSCard key={p.name} plan={p} index={i} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
