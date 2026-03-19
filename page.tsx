import { CryptoTicker } from "@/components/CryptoTicker";
import { HeroSection } from "@/components/HeroSection";
import { Bip39Embed } from "@/components/Bip39Embed";
import { DemoBanners } from "@/components/DemoBanners";
import { CryptoDonation } from "@/components/CryptoDonation";
import { AdBanner } from "@/components/AdBanner";
import type { CoinData } from "@/lib/types";

// Fetch initial prices on the server (SSR)
// This data is visible to Googlebot immediately — no JS required
async function getInitialPrices(): Promise<CoinData[]> {
  try {
    const COIN_IDS = [
      "bitcoin","ethereum","binancecoin","solana","ripple",
      "cardano","dogecoin","litecoin","bitcoin-cash","polkadot",
      "dash","zcash","qtum",
    ];

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}&order=market_cap_desc&sparkline=false&locale=en`;

    const headers: HeadersInit = { Accept: "application/json" };
    if (process.env.COINGECKO_API_KEY) {
      headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 90 }, // ISR: revalidate every 90 seconds
    });

    if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
    return res.json();
  } catch {
    return []; // CryptoTicker will handle empty gracefully
  }
}

export default async function HomePage() {
  const initialCoins = await getInitialPrices();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ticker receives server-fetched data as initialCoins,
          then polls client-side via /api/crypto-prices every 90s */}
      <CryptoTicker initialCoins={initialCoins} />

      <HeroSection />

      <div className="py-4">
        <AdBanner format="horizontal" />
      </div>

      <Bip39Embed />

      <div className="py-6">
        <AdBanner format="auto" />
      </div>

      <DemoBanners />

      <CryptoDonation />

      <div className="py-6">
        <AdBanner format="horizontal" />
      </div>

      <footer className="py-8 border-t border-border text-center">
        <p className="text-muted-foreground text-xs font-mono">
          © 2026 Coin Watch Lounge · Powered by CoinGecko API · All
          derivation runs locally in your browser.
        </p>
      </footer>
    </div>
  );
}
