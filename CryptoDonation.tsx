"use client";

import Image from "next/image";

const BTC_ADDRESS = "bc1q0d0ccaxuw065ezdulr68azp2fjhc0avaqf0pyz";

export function CryptoDonation() {
  const copyAddress = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
  };

  return (
    <section className="py-12 px-4 border-t border-border">
      <div className="max-w-sm mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
          <span className="text-[hsl(var(--chart-4))]">₿</span> Support with
          Crypto
        </h2>
        <p className="text-muted-foreground text-sm">
          If you find this tool useful, consider donating BTC
        </p>
        <div className="bg-card border border-border rounded-xl p-4 inline-block">
          {/* next/image for automatic optimization */}
          <Image
            src="/btc-qr.jpg"
            alt="BTC Donation QR Code"
            width={224}
            height={224}
            className="mx-auto rounded-lg object-cover"
            priority={false}
          />
        </div>
        <button
          onClick={copyAddress}
          className="block w-full font-mono text-xs text-muted-foreground bg-muted/50 hover:bg-muted rounded-lg px-3 py-2 break-all transition-colors cursor-pointer"
          title="Click to copy"
        >
          {BTC_ADDRESS}
        </button>
      </div>
    </section>
  );
}
