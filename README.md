# Coin Watch Lounge —- Next.js 15

Real-time crypto dashboard + BIP39 wallet checker, migrated from Vite + React SPA to **Next.js 15 App Router** with full SSR/SSG support.

## Stack

- **Next.js 15** — App Router, Server Components, Route Handlers
- **React 18** — Client Components only where needed
- **Tailwind CSS** — preserved design tokens from original
- **Framer Motion** — animations (client-side)
- **TanStack Query** — client-side cache
- **CoinGecko API** — fetched server-side via `/api/crypto-prices`

## Key Improvements Over Vite Version

| Feature | Vite SPA | Next.js 15 |
|---|---|---|
| Google indexing | ❌ Empty HTML | ✅ Full SSR HTML |
| Crypto prices visible to bots | ❌ | ✅ ISR every 90s |
| API key exposure | ⚠️ Client-side | ✅ Server-only |
| Supabase Edge Function needed | ✅ Required | ❌ Removed (use `/api/crypto-prices`) |
| SEO metadata | Manual `<head>` | ✅ `metadata` API |
| Sitemap | Static file | ✅ Dynamic `/sitemap.xml` |
| Robots.txt | Static file | ✅ Dynamic `/robots.txt` |
| Image optimization | ❌ | ✅ `next/image` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local.example` → `.env.local`:

```env
# Optional: CoinGecko API key (server-side only, never exposed to browser)
COINGECKO_API_KEY=

# Optional: Supabase (for future lounge chat)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Deploy

### Vercel (Recommended)
```bash
npx vercel
```

### Cloudflare Pages
1. Set `output: "export"` in `next.config.ts`
2. `npm run build` → deploy `out/` folder

## Architecture

```
app/
├── layout.tsx          # Root layout + SEO metadata + JSON-LD
├── page.tsx            # Home — SERVER component, fetches initial prices
├── not-found.tsx       # 404 page
├── sitemap.ts          # Dynamic sitemap
├── robots.ts           # Dynamic robots.txt
└── api/
    └── crypto-prices/
        └── route.ts    # Replaces Supabase Edge Function

components/
├── Providers.tsx       # QueryClient + Tooltip (CLIENT)
├── CryptoTicker.tsx    # Ticker — CLIENT, hydrates from SSR data
├── HeroSection.tsx     # CLIENT (framer-motion)
├── Bip39Embed.tsx      # CLIENT (iframe + framer-motion)
├── AdBanner.tsx        # CLIENT (AdSense)
├── DemoBanners.tsx     # CLIENT (AdSense)
└── CryptoDonation.tsx  # CLIENT (clipboard API + next/image)

lib/
├── types.ts            # Shared TypeScript types
├── utils.ts            # cn() helper
└── coinMeta.ts         # Coin icons, colors, IDs
```
