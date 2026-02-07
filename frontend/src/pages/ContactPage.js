import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, Mail, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Get in Touch
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="contact-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Contact <span className="text-primary">Us</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Have questions? We're here to help. Reach out through Discord or send us a message.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Info Cards */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div initial="hidden" animate="visible" variants={fadeUp}
                className="glass-card rounded-lg p-6" data-testid="contact-discord">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-1">Discord Support</h3>
                <p className="text-sm text-muted-foreground mb-3">Fastest way to get help from our team.</p>
                <a href="https://discord.com/invite/RDPCm2vt3B" target="_blank" rel="noopener noreferrer"
                  data-testid="discord-link"
                  className="text-sm text-primary hover:underline font-mono">
                  discord.gg/hexacraft
                </a>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="glass-card rounded-lg p-6" data-testid="contact-tickets">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-1">Support Tickets</h3>
                <p className="text-sm text-muted-foreground">Open a ticket on Discord for detailed support. Our team tracks and resolves every ticket.</p>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
                className="glass-card rounded-lg p-6" data-testid="contact-availability">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-1">Availability</h3>
                <p className="text-sm text-muted-foreground">24/7 for critical issues. General support: 9 AM - 11 PM IST, 7 days a week.</p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="lg:col-span-3 glass-card rounded-lg p-8">
              <h3 className="font-heading text-xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-foreground mb-2 block">Name</Label>
                    <Input
                      data-testid="contact-name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      required
                      className="bg-secondary/50 border-white/10 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-foreground mb-2 block">Email</Label>
                    <Input
                      data-testid="contact-email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="your@email.com"
                      required
                      className="bg-secondary/50 border-white/10 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-foreground mb-2 block">Subject</Label>
                  <Input
                    data-testid="contact-subject"
                    value={form.subject}
                    onChange={update("subject")}
                    placeholder="How can we help?"
                    required
                    className="bg-secondary/50 border-white/10 focus:border-primary"
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground mb-2 block">Message</Label>
                  <Textarea
                    data-testid="contact-message"
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us more..."
                    rows={5}
                    required
                    className="bg-secondary/50 border-white/10 focus:border-primary resize-none"
                  />
                </div>

                {status === "success" && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4" data-testid="contact-success">
                    <p className="text-sm text-green-400">Message sent successfully! We'll get back to you within 24 hours.</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4" data-testid="contact-error">
                    <p className="text-sm text-destructive">Something went wrong. Please try again or contact us on Discord.</p>
                  </div>
                )}

                <Button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={loading}
                  className="w-full bg-primary text-black font-bold uppercase tracking-widest py-6 hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all"
                >
                  {loading ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
