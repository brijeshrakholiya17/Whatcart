# 🛒 WhatCart — Frontend Developer Assignment

A fully responsive e-commerce product listing application built for the WhatBytes Frontend Developer Internship assignment, using **Next.js (App Router)**, **Tailwind CSS**, and **Zustand**.

**🔗 Live Demo:** [whatbytes-frontend-assignment-rho.vercel.app](https://whatbytes-frontend-assignment-rho.vercel.app/)
**📦 Repository:** [github.com/brijeshrakholiya17/Whatcart](https://github.com/brijeshrakholiya17/Whatcart)

---

## ✨ Overview

WhatCart is a three-page shopping experience — a filterable product listing, dynamic product detail pages, and a persistent shopping cart — built with real, working filtering and state logic rather than static UI. Every filter is synced to the URL, and the cart survives a page refresh via `localStorage`.

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Product listing with sidebar filters, live search, and a responsive product grid |
| `/product/[id]` | Dynamic product detail page with quantity selector and customer reviews |
| `/cart` | Cart management — update quantities, remove items, view price summary |

## 🚀 Features

**Product Listing**
- Category, brand, and price-range filters — all synced to the URL query string (e.g. `?category=Electronics&maxPrice=200`), so filtered views are shareable and bookmarkable
- Live search with debounced input, matching across product title
- Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Graceful empty state when no products match the active filters

**Product Detail**
- Dynamic routing via Next.js App Router (`/product/[id]`)
- Quantity selector with bounds checking
- Static customer reviews section
- Custom 404 handling for invalid product IDs

**Cart**
- Add to cart from both the listing grid and detail page
- Live cart badge count in the header
- Quantity increment/decrement and item removal
- Real-time price summary
- Fully persisted via `localStorage` (Zustand `persist` middleware) — cart state survives page refreshes and browser restarts

**Engineering**
- Optimized local WebP product images via `next/image`
- Hydration-safe client state (no SSR/CSR mismatch warnings)
- Fully responsive across mobile, tablet, and desktop breakpoints

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) with `persist` middleware |
| Icons | [lucide-react](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

## 📁 Project Structure

```
whatcart/
├── app/
│   ├── page.js              # Home — product listing
│   ├── layout.js             # Root layout (Header + Footer)
│   ├── product/[id]/         # Dynamic product detail route
│   └── cart/                 # Cart page
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Sidebar.js            # Filters
│   ├── ProductCard.js
│   ├── ProductGrid.js
│   ├── ProductDetailClient.js
│   └── ReviewsSection.js
├── lib/
│   ├── products.js           # Product dataset
│   └── filterProducts.js     # Filtering logic
├── store/
│   └── cartStore.js          # Zustand cart store
└── public/images/products/   # Optimized WebP product images
```

## 🏃 Run Locally

```bash
git clone https://github.com/brijeshrakholiya17/Whatcart.git
cd Whatcart
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## ✅ Assignment Checklist

- [x] Next.js (App Router) + Tailwind CSS
- [x] Category, price, and brand filtering
- [x] Search with string matching
- [x] URL-based filter state
- [x] Client-side cart state management (Zustand)
- [x] Dynamic routing for product details
- [x] Conditional rendering for empty results
- [x] Cart persistence via localStorage
- [x] Bonus: Cart page with full quantity/remove/summary controls
- [x] Deployed to Vercel

---

Built by **Brijesh Rakholiya** — [LinkedIn](https://linkedin.com/in/brijeshrakholiya17) · [GitHub](https://github.com/brijeshrakholiya17)