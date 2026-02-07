import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronRight, AlertTriangle, Cpu, HardDrive, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const SERVER_TYPES = [
  { value: "vanilla", label: "Vanilla", desc: "No plugins or mods" },
  { value: "light_plugins", label: "Light Plugins", desc: "Basic plugins like EssentialsX" },
  { value: "heavy_plugins", label: "Heavy Plugins", desc: "Many plugins, custom maps" },
  { value: "modded", label: "Modded", desc: "Forge/Fabric modpacks" },
];

export default function PlanCalculatorPage() {
  const [players, setPlayers] = useState(10);
  const [serverType, setServerType] = useState("vanilla");
  const [perfLevel, setPerfLevel] = useState("budget");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/calculator`, {
        players,
        server_type: serverType,
        performance_level: perfLevel,
      });
      setResult(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Calculator
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="calculator-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Plan <span className="text-primary">Calculator</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Tell us about your server and we'll recommend the perfect plan.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}
              className="glass-card rounded-lg p-8">
              <h3 className="font-heading text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" /> Server Configuration
              </h3>

              <div className="space-y-8">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">
                    Number of Players: <span className="text-primary font-mono">{players}</span>
                  </Label>
                  <Slider
                    data-testid="players-slider"
                    value={[players]}
                    onValueChange={(v) => setPlayers(v[0])}
                    min={1} max={200} step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span><span>200</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Server Type</Label>
                  <Select value={serverType} onValueChange={setServerType}>
                    <SelectTrigger data-testid="server-type-select" className="bg-secondary/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      {SERVER_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value} data-testid={`server-type-${t.value}`}>
                          <span className="font-medium">{t.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">- {t.desc}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">Performance Level</Label>
                  <Select value={perfLevel} onValueChange={setPerfLevel}>
                    <SelectTrigger data-testid="perf-level-select" className="bg-secondary/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="budget" data-testid="perf-budget">Budget (DDR4 / Intel)</SelectItem>
                      <SelectItem value="performance" data-testid="perf-performance">Performance (DDR5 / AMD EPYC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  data-testid="calculate-btn"
                  onClick={calculate}
                  disabled={loading}
                  className="w-full bg-primary text-black font-bold uppercase tracking-widest py-6 hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all"
                >
                  {loading ? "Calculating..." : "Calculate Recommendation"}
                </Button>
              </div>
            </motion.div>

            {/* Result Panel */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="glass-card rounded-lg p-8">
              <h3 className="font-heading text-xl font-bold text-white mb-8">Recommendation</h3>
              {result ? (
                <div className="space-y-6" data-testid="calculator-result">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                      <HardDrive className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="font-heading text-2xl font-bold text-primary">{result.recommended_ram}GB</p>
                      <p className="text-xs text-muted-foreground mt-1">RAM</p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                      <Cpu className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="font-heading text-2xl font-bold text-primary">{result.recommended_cpu}%</p>
                      <p className="text-xs text-muted-foreground mt-1">CPU</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Suggested Plan</p>
                    <p className="font-heading text-2xl font-bold text-white" data-testid="suggested-plan">{result.suggested_plan}</p>
                    <p className="text-xs text-muted-foreground capitalize mt-1">{result.plan_tier} Tier</p>
                    <p className="font-heading text-3xl font-bold text-primary mt-3">₹{result.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                  </div>

                  {result.upgrade_warning && (
                    <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-lg p-4" data-testid="upgrade-warning">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{result.upgrade_warning}</p>
                    </div>
                  )}

                  <Link to="/plans">
                    <Button data-testid="view-plans-btn" className="w-full bg-primary text-black font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                      View All Plans <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center" data-testid="calculator-empty">
                  <Zap className="w-12 h-12 text-white/10 mb-4" />
                  <p className="text-muted-foreground text-sm">Configure your server specs and hit calculate to get a personalized recommendation.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
