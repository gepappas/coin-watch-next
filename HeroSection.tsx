"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";

const features = [
  { icon: Shield, label: "Client-Side Security" },
  { icon: Zap, label: "Live Market Data" },
  { icon: Lock, label: "BIP39 Validator" },
];

export function HeroSection() {
  return (
    <section className="py-20 px-4 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-6"
      >
        Decentralized Finance Hub
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-mono font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6"
      >
        SECURE YOUR{" "}
        <span className="text-primary">CRYPTO</span>{" "}
        ASSETS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mb-10"
      >
        Real-time cryptocurrency prices, market analytics, and BIP39 seed phrase
        validation. All the tools you need in one place.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {features.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-surface text-sm text-secondary-foreground font-mono"
          >
            <f.icon className="w-4 h-4 text-primary" />
            {f.label}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
