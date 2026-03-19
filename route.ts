import { NextResponse } from "next/server";

const COIN_IDS = [
  "bitcoin","ethereum","binancecoin","solana","ripple",
  "cardano","dogecoin","litecoin","bitcoin-cash","polkadot",
  "dash","zcash","qtum",
];

export const dynamic = "force-dynamic"; // never cache this route

export async function GET() {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}&order=market_cap_desc&sparkline=false&locale=en`;

    const headers: HeadersInit = { Accept: "application/json" };
    if (process.env.COINGECKO_API_KEY) {
      headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(`CoinGecko returned ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        // Allow browser to cache for 60s, CDN for 90s
        "Cache-Control": "public, s-maxage=90, stale-while-revalidate=60",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
