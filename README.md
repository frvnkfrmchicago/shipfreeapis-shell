# ShipFreeAPIs

Curated directory of 50+ free APIs for developers building without budget.

[![live site](https://img.shields.io/badge/live-site-brightgreen)](https://shipfreeapis.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)

ShipFreeAPIs helps developers find free APIs across 22 categories — from AI and maps to weather and gaming. Features tier-based filtering (Truly Free, Generous Free, Credit-Based) and a curated collection that actually works.

🔗 https://shipfreeapis.vercel.app

---

## Features

- 50+ curated APIs across 22 categories
- Real-time search and filtering by category
- Tier-based categorization
- 3D card hover effects with spring physics
- Matrix rain background with mouse interaction
- Stripe integration for premium features
- Dark mode with custom color system

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1.1 (App Router) |
| UI | React 19.2.3 (Server Components) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4.0 |
| Animation | GSAP, Framer Motion |
| Canvas | Custom Matrix Rain |
| Payments | Stripe Checkout + Webhooks |
| Analytics | Vercel Analytics |
| Package Manager | Bun |
| Deploy | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── api/              # Stripe, email endpoints
│   ├── pricing/          # Pricing page
│   ├── success/          # Payment success
│   └── page.tsx          # Main catalog
├── components/
│   ├── APICard.tsx       # 3D hover cards
│   ├── CategoryTabs.tsx  # Filter tabs
│   ├── MatrixRain.tsx    # Canvas animation
│   ├── LeadMagnet.tsx    # Email capture
│   └── PricingCards.tsx  # Stripe pricing
├── data/
│   └── apis.json         # 50+ APIs
└── lib/
    └── stripe.ts         # Stripe client
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/frvnkfrmchicago/shipfreeapis-shell.git
cd shipfreeapis-shell

# Install
bun install

# Environment
cp .env.example .env.local

# Run
bun dev
```

---

## Environment Variables

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_URL=http://localhost:3000
GOOGLE_SCRIPT_URL=https://script.google.com/...
```

---

## License

MIT

---

## Contact

Engineered by **Frank Lawrence Jr.**

[LinkedIn](https://linkedin.com/in/franklawrencejr) • [GitHub](https://github.com/franklawrencejr)
