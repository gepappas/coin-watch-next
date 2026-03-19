import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://coin-watch-lounge.vercel.app"),
  title: {
    default: "Coin Watch Lounge – Real-time Crypto Tracker & BIP39 Checker",
    template: "%s | Coin Watch Lounge",
  },
  description:
    "Track live Bitcoin, Ethereum and 13+ cryptocurrency prices in real-time. Verify BIP39 seed phrases across 13+ blockchain networks — all locally in your browser. No data leaves your device.",
  keywords: [
    "crypto tracker",
    "BIP39 checker",
    "bitcoin price",
    "ethereum price",
    "seed phrase validator",
    "crypto dashboard",
    "BIP39 mnemonic",
    "cryptocurrency prices",
    "wallet checker",
    "CoinGecko",
  ],
  authors: [{ name: "Coin Watch Lounge" }],
  creator: "Coin Watch Lounge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coin-watch-lounge.vercel.app",
    siteName: "Coin Watch Lounge",
    title: "Coin Watch Lounge – Real-time Crypto Tracker & BIP39 Checker",
    description:
      "Live crypto prices for Bitcoin, Ethereum & more. Plus a privacy-first BIP39 seed phrase validator — everything runs locally in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Coin Watch Lounge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coin Watch Lounge – Crypto Tracker & BIP39 Checker",
    description:
      "Real-time crypto prices + BIP39 seed phrase validator. Free, private, no signup.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7707660268199749"
          crossOrigin="anonymous"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Coin Watch Lounge",
              url: "https://coin-watch-lounge.vercel.app",
              description:
                "Real-time cryptocurrency price tracker and BIP39 seed phrase checker",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Real-time crypto prices via CoinGecko",
                "BIP39 seed phrase validation",
                "Multi-chain wallet derivation",
                "Client-side only — no data sent to servers",
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
