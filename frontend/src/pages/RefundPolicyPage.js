import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const SECTIONS = [
  {
    title: "Eligibility for Refund",
    items: [
      "Refund requests must be made within 48 hours of purchase.",
      "The service must not meet the advertised specifications.",
      "Refunds are processed to the original payment method within 7-10 business days.",
      "First-time purchases are eligible for a full refund within the 48-hour window.",
    ],
  },
  {
    title: "Non-Refundable Scenarios",
    items: [
      "Services used for more than 48 hours after activation.",
      "Custom domain or subdomain purchases (₹20/subdomain).",
      "Accounts terminated due to Terms of Service violations.",
      "Promotional or discounted plan purchases (unless otherwise stated).",
      "Add-on services such as additional storage or dedicated IPs.",
    ],
  },
  {
    title: "Abuse & Policy Violations",
    items: [
      "If your account is terminated for violating our Terms of Service, no refund will be issued.",
      "Resource abuse (excessive CPU, RAM, or bandwidth beyond fair use) may result in service suspension without refund.",
      "Using our services for illegal activities forfeits all refund rights.",
      "DDoS attacks originating from our servers result in immediate termination without refund.",
    ],
  },
  {
    title: "Refund Request Process",
    items: [
      "Contact our support team via Discord or the Contact page.",
      "Provide your order ID, account email, and reason for refund.",
      "Our team will review your request within 24 hours.",
      "Approved refunds are processed within 7-10 business days.",
      "You will receive a confirmation email once the refund is processed.",
    ],
  },
];

export default function RefundPolicyPage() {
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
            data-testid="refund-heading"
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Refund <span className="text-primary">Policy</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Our commitment to fair and transparent refund practices.
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
              data-testid={`refund-section-${i}`}
            >
              <h2 className="font-heading text-xl font-bold text-white mb-5">{section.title}</h2>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
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
