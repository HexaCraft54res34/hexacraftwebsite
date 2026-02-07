import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const SECTIONS = [
  {
    title: "1. Acceptable Use Policy",
    content: [
      "All services provided by HexaCraft must be used in compliance with applicable laws and regulations.",
      "Users may not use our services for any illegal activities including but not limited to: distributing malware, hosting phishing content, or facilitating cyber attacks.",
      "Servers must not be used to harass, threaten, or cause harm to other users or third parties.",
      "Automated scripts or bots that negatively impact server performance or other users' experience are prohibited.",
    ],
  },
  {
    title: "2. Resource Usage",
    content: [
      "Each hosting plan includes specific resource allocations (RAM, CPU, Storage). Users must operate within their plan's limits.",
      "Consistent resource usage exceeding plan limits may result in service throttling or suspension.",
      "Cryptocurrency mining, torrent seeding, and other resource-intensive non-gaming activities are strictly prohibited.",
      "Fair use policy applies: resources should be used for their intended purpose (Minecraft server hosting).",
    ],
  },
  {
    title: "3. Service Availability",
    content: [
      "HexaCraft strives to maintain high service availability as specified in each plan's uptime guarantee.",
      "Scheduled maintenance windows will be communicated at least 24 hours in advance via Discord and email.",
      "Force majeure events, including but not limited to natural disasters, power outages, and network provider failures, are excluded from uptime guarantees.",
      "Service level credits may be issued for downtime exceeding the guaranteed uptime percentage.",
    ],
  },
  {
    title: "4. Payment & Billing",
    content: [
      "All prices are listed in Indian Rupees (INR) and are subject to applicable taxes.",
      "Payment is required before service activation. Accepted payment methods will be displayed at checkout.",
      "Subscriptions auto-renew unless cancelled before the billing date. Cancellation must be done at least 24 hours before renewal.",
      "Failed payments will result in a 48-hour grace period. After this period, services may be suspended.",
      "Price changes will be communicated 30 days in advance. Existing subscriptions are honored until their renewal date.",
    ],
  },
  {
    title: "5. Termination Rights",
    content: [
      "HexaCraft reserves the right to terminate services immediately for Terms of Service violations.",
      "Users may cancel their services at any time. Refund eligibility is governed by our Refund Policy.",
      "Upon termination, users have 7 days to download their data. After this period, data may be permanently deleted.",
      "Accounts inactive for more than 90 days after subscription expiry may be permanently removed.",
      "HexaCraft is not liable for data loss resulting from account termination due to policy violations.",
    ],
  },
  {
    title: "6. Intellectual Property",
    content: [
      "HexaCraft branding, logos, and website content are owned by HexaCraft and protected by intellectual property laws.",
      "Users retain ownership of their server data, configurations, and custom content.",
      "Minecraft is a trademark of Mojang Studios / Microsoft. HexaCraft is not affiliated with or endorsed by Mojang or Microsoft.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-20 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Legal
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            data-testid="terms-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Terms & <span className="text-primary">Conditions</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Please read these terms carefully before using our services. Last updated: February 2026.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {SECTIONS.map((section, i) => (
            <motion.div key={section.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i}
              className="glass-card rounded-lg p-8"
              data-testid={`terms-section-${i}`}
            >
              <h2 className="font-heading text-xl font-bold text-white mb-5">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
