"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const AD_CLIENT = "ca-pub-7707660268199749";

interface AdBannerProps {
  format?: string;
  className?: string;
}

export function AdBanner({ format = "auto", className }: AdBannerProps) {
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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`w-full max-w-6xl mx-auto px-4 ${className || ""}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot="auto"
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </motion.div>
  );
}
