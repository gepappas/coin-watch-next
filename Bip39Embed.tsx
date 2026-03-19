"use client";

import { motion } from "framer-motion";

export function Bip39Embed() {
  return (
    <section className="px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-6 text-center">
          <h2 className="font-mono font-semibold text-2xl md:text-3xl tracking-tight mb-2">
            Sovereign Key Audit
          </h2>
          <p className="text-muted-foreground text-sm font-mono">
            Verify BIP39 mnemonics across 13+ chains with local-first
            derivation. No data leaves your browser.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl shadow-black/40">
          <iframe
            src="/bip39_multicoin_checker_v2.html"
            title="BIP39 Multicoin Checker v2"
            className="w-full border-0"
            style={{ height: "85vh", minHeight: "700px" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
