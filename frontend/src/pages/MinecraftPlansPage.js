import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Shield, Zap, ChevronRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

function PlanCard({ plan, specs, tier, index }) {
  const isPopular = plan.name === "Iron" || plan.name === "Performance Iron";
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={fadeUp} custom={index}
      className={`glass-card rounded-lg p-6 relative group ${isPopular ? "border-primary/50 neon-border" : ""}`}
      data-testid={`plan-card-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {isPopular && (
        <Badge className="absolute -top-3 left-6 bg-primary text-black font-bold text-xs uppercase tracking-wider px-3">
          Popular
        </Badge>
      )}
      <h3 className="font-heading text-xl font-bold text-white mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-heading text-3xl font-bold text-primary">₹{plan.price}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <Check className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">{plan.ram}GB RAM</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Check className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">{plan.cpu}% CPU</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Check className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">{plan.storage}GB SSD</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Check className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">DDoS Protection</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Check className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground">Pterodactyl Panel</span>
        </div>
      </div>
      <a href="https://discord.com/invite/RDPCm2vt3B" target="_blank" rel="noopener noreferrer">
        <Button
          data-testid={`select-plan-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={`w-full font-bold uppercase tracking-wider text-xs ${
            isPopular
              ? "bg-primary text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
          } transition-all`}
        >
          Select Plan <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </a>
      <p className="text-[10px] text-muted-foreground text-center mt-2">Visit the ticket section on Discord to create a buy ticket</p>
    </motion.div>
  );
}

export default function MinecraftPlansPage() {
  const [plansData, setPlansData] = useState(null);

  useEffect(() => {
    axios.get(`${API}/plans`).then(res => setPlansData(res.data)).catch(console.error);
  }, []);

  const budgetPlans = plansData?.budget?.plans || [];
  const budgetSpecs = plansData?.budget?.specs || {};
  const perfPlans = plansData?.performance?.plans || [];
  const perfSpecs = plansData?.performance?.specs || {};

  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Pricing
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="plans-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Minecraft <span className="text-primary">Hosting Plans</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Choose between Budget and Performance tiers. All plans include DDoS protection, Pterodactyl panel, and instant setup.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="budget" className="w-full">
            <TabsList className="bg-secondary/50 border border-white/5 p-1 mb-12" data-testid="plans-tab-list">
              <TabsTrigger value="budget" data-testid="tab-budget"
                className="data-[state=active]:bg-primary data-[state=active]:text-black font-heading uppercase tracking-wider text-sm px-6">
                Budget Plans
              </TabsTrigger>
              <TabsTrigger value="performance" data-testid="tab-performance"
                className="data-[state=active]:bg-primary data-[state=active]:text-black font-heading uppercase tracking-wider text-sm px-6">
                Performance Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="budget">
              <SpecsBar specs={budgetSpecs} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {budgetPlans.map((p, i) => <PlanCard key={p.name} plan={p} specs={budgetSpecs} tier="budget" index={i} />)}
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <SpecsBar specs={perfSpecs} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {perfPlans.map((p, i) => <PlanCard key={p.name} plan={p} specs={perfSpecs} tier="performance" index={i} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function SpecsBar({ specs }) {
  if (!specs.processor) return null;
  return (
    <div className="glass-card rounded-lg p-6 flex flex-wrap gap-6 items-center" data-testid="specs-bar">
      <div className="flex items-center gap-2">
        <Cpu className="w-4 h-4 text-primary" />
        <span className="text-sm text-foreground font-mono">{specs.processor}</span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-sm text-foreground font-mono">{specs.memory}</span>
      </div>
      <div className="flex items-center gap-2">
        <HardDrive className="w-4 h-4 text-primary" />
        <span className="text-sm text-foreground font-mono">{specs.storage}</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-sm text-foreground font-mono">{specs.uptime}</span>
      </div>
    </div>
  );
}
