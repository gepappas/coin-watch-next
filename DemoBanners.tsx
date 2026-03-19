"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const AD_CLIENT = "ca-pub-7707660268199749";

function AdSlot({
  slotId,
  format,
  className,
}: {
  slotId: string;
  format: string;
  className?: string;
}) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

export function DemoBanners() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full min-h-[90px] rounded-md border border-border bg-surface flex items-center justify-center overflow-hidden"
        >
          <AdSlot slotId="auto" format="auto" className="w-full" />
        </motion.div>

        {/* Two side-by-side 300×250 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: n * 0.1 }}
              className="min-h-[250px] rounded-md border border-border bg-surface flex items-center justify-center overflow-hidden"
            >
              <AdSlot slotId="auto" format="rectangle" className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
