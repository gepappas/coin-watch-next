"use client";

import { useEffect, useState } from "react";
import type { CoinData } from "@/lib/types";
import { COIN_IDS, COIN_ICONS, COIN_COLORS } from "@/lib/coinMeta";

interface CryptoTickerProps {
  /** Pre-fetched server-side data for instant render (no loading flash) */
  initialCoins: CoinData[];
}

export function CryptoTicker({ initialCoins }: CryptoTickerProps) {
  const [coins, setCoins] = useState<CoinData[]>(initialCoins);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchPrices = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        // Calls our own Next.js API route — no CORS, no exposed keys
        const res = await fetch("/api/crypto-prices", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: CoinData[] = await res.json();

        if (mounted) {
          const validCoins = COIN_IDS.map((id) =>
            data.find((c) => c.id === id)
          ).filter((c): c is CoinData => !!c);

          setCoins(validCoins);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error("Price fetch error:", err);
          setError("Unable to load prices – retrying...");
        }
      }
    };

    // Only poll after mount — initial data comes from SSR
    const interval = setInterval(fetchPrices, 90_000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (error) {
    return (
      <div className="sticky top-0 z-50 h-10 bg-red-950/80 border-b border-red-800/50 backdrop-blur-md flex items-center justify-center">
        <span className="text-red-400 text-xs font-mono">{error}</span>
      </div>
    );
  }

  if (!coins.length) {
    return (
      <div className="sticky top-0 z-50 h-10 bg-ticker border-b border-border/50 backdrop-blur-md flex items-center justify-center">
        <span className="text-muted-foreground text-xs font-mono animate-pulse">
          Loading market data...
        </span>
      </div>
    );
  }

  const doubled = [...coins, ...coins];

  return (
    <div
      className="sticky top-0 z-50 h-10 bg-ticker/90 border-b border-border/50 backdrop-blur-md overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className={`ticker-animate flex items-center h-full whitespace-nowrap ${
          isPaused ? "paused" : ""
        }`}
      >
        {doubled.map((coin, i) => {
          const isUp = coin.price_change_percentage_24h >= 0;
          return (
            <div
              key={`${coin.id}-${i}`}
              className="flex items-center gap-2.5 px-5 border-r border-border/30 h-full shrink-0"
            >
              <span
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: COIN_COLORS[coin.id] || "#888" }}
              >
                {COIN_ICONS[coin.id] || coin.symbol.toUpperCase()}{" "}
                {coin.symbol.toUpperCase()}
              </span>
              <span className="font-mono tabular-nums text-sm font-medium">
                $
                {coin.current_price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={`font-mono text-xs font-medium ${
                  isUp ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {isUp ? "▲" : "▼"}{" "}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
