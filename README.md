# Velora — Know Where Every Rupee Goes

> **One dashboard for every rupee your family spends.**
> Built for all generations in India — from grandpa's pension to your kid's pocket money.

---

## What is Velora?

Velora is a unified family expense tracking web app that solves one core problem — families lose control over spending because transactions are scattered across UPI apps, cards, wallets, and subscriptions with no single, simple view of everyday expenses in plain language.

Velora brings everything together in one warm, accessible dashboard designed for every generation — from college students to senior citizens.

---

## The Problem We Solve

| Pain Point | How Velora Fixes It |
|---|---|
| Money disappears by month end | Unified transaction feed across all sources |
| Family spending is invisible | Family dashboard with per-member breakdown |
| Finance apps are too complex | Plain language summaries, no jargon |
| No one tracks subscriptions | Subscription graveyard with unused alerts |
| Saving feels impossible | Visual savings jars with progress tracking |

---

## Target Audience

Velora is built for **all generations** in Indian families:

- **Grandparents (55+)** — Large text, pension tracker, WhatsApp weekly digest
- **Parents (35–55)** — Family budget, EMI tracker, tax helper
- **Young Adults (18–34)** — AI insights, spending streaks, goal tracking
- **Students** — Pocket money tracker, simple colorful view

---

## Design System

### Color Palette — "Midnight Trust"

| Role | Color | Hex |
|---|---|---|
| Page Background | Deep Dark Navy | `#0B1120` |
| Card Surface | Dark Slate | `#131C2E` |
| Secondary Card | Dark Blue-Gray | `#1A2540` |
| Primary Brand | Teal / Cyan | `#4ECDC4` |
| Primary Accent | Bright Teal-Green | `#2DD4BF` |
| Primary Hover | Deep Teal | `#0D9488` |
| Income / Positive | Teal-Green | `#2DD4BF` |
| Expense / Alert | Soft Red | `#F87171` |
| Warning | Amber | `#FBBF24` |
| Text Primary | Pure White | `#FFFFFF` |
| Text Secondary | Light Gray-White | `#CBD5E1` |
| Text Muted | Medium Gray | `#64748B` |
| Border | Dark Blue Border | `#1E2D45` |
| CTA Button | Teal Filled | `#2DD4BF` |
| Ghost Button | White Transparent | `#FFFFFF20` |
| Stats Band BG | Dark Teal | `#0F766E` |

### Typography

| Type | Font | Size | Weight |
|---|---|---|---|
| Headings | Plus Jakarta Sans | 24–32px | Bold / Semibold |
| Body | Nunito | 14–16px | Regular / Medium |
| Numbers / Amounts | JetBrains Mono | 13–28px | Regular / Bold |
| Minimum font size | — | 14px | — |

> All rupee amounts use the `₹` prefix and JetBrains Mono font for instant readability.

### Spacing & Shapes

- Card border radius: `16px`
- Button border radius: `100px` (pill shape)
- Input border radius: `10px`
- Card padding: `20px`
- Card shadow: `0px 2px 12px rgba(0,0,0,0.07)`
- Sidebar width: `260px`
- Max content width: `1280px`

---

## App Pages & Screens

### 1. Landing Page
Marketing homepage with hero section, problem cards, how-it-works steps, feature bento grid, generation section, testimonials, pricing plans, and footer.

### 2. Sign Up Page
Split-screen layout. Left panel with brand color background showing key benefits. Right panel with account creation form including family size selector (Just Me / Couple / Family 3–5 / Joint Family 6+).

### 3. Login Page
Centered card on warm background with two login modes — Email/Password and Mobile OTP.

### 4. Dashboard
Main post-login page with sidebar navigation, stat cards (Income / Spent / Remaining / Score), spending category chart, recent transactions feed, family member breakdown, AI coach insight, savings goals preview, subscription tracker, and cash flow forecast.

### 5. Goals Page
Dedicated savings goals page with summary stat cards, filter tabs (All / Active / Completed), goal cards grid with animated progress bars, and AI coach insight banner.

### 6. Reports Page
Analytics page with report type tabs, stat cards, monthly trend line chart, category donut chart, member spending bar chart, daily spending heatmap calendar, top merchants table, and export/download banner.

### 7. Budget Page
Budget planning page with health bar, category budget cards grid (with on-track / near-limit / over-budget states), member budget table, spending pace chart with forecast, and AI budget coach banner.

---

## Sidebar Navigation

All internal pages share an identical sidebar with these 9 navigation items. The active item changes per page.

| # | Icon (Lucide) | Label | Active On |
|---|---|---|---|
| 1 | Home | Dashboard | Dashboard page |
| 2 | CreditCard | Transactions | Transactions page |
| 3 | Users | Family | Family page |
| 4 | BarChart2 | Budget | Budget page |
| 5 | Target | Goals | Goals page |
| 6 | Smartphone | Subscriptions | Subscriptions page |
| 7 | Bot | AI Coach | AI Coach page |
| 8 | TrendingUp | Reports | Reports page |
| 9 | Settings | Settings | Settings page |

**Active state:** Light teal background `#E6F4F4`, teal icon and text `#0D7377`, 3px left accent bar in primary color.

---

## Key Features Explained

### AI Spending Coach
Gives plain-language weekly insights:
- "You spent ₹4,200 on Swiggy this month — 3 fewer orders saves ₹900"
- "Your electricity bill is 40% higher than usual"
- "Diwali is in 3 weeks — you usually spend ₹15,000"

### Family Budget Council
- Shared family budget visible to all members
- Personal + shared wallet view per member
- Budget approval flow for kids
- Contribution tracker for shared expenses

### Subscription Graveyard
- Detects all recurring charges automatically
- Flags unused subscriptions: "Hotstar — unused 23 days, still paying ₹299/month"
- Annual cost view: "Your subscriptions cost ₹28,400/year"

### Daily Spending Heatmap
Calendar view of the full month where darker squares = higher spending days. Instantly shows spending patterns at a glance.

---

## Accessibility — All Generations

Velora is designed to be used by everyone from 8 to 80:

- Minimum font size 14px — never smaller anywhere
- Minimum touch target 48x48px — easy for older users
- Color never used alone — always paired with icon or text
- Plain language everywhere — no finance jargon
- High contrast throughout — minimum 4.5:1 ratio
- Large font mode toggle for seniors
- Voice input for expense entry
- WhatsApp summaries for users who don't open apps

---

## Platform

Velora is a responsive website accessible on:

| Platform | Support |
|---|---|
| Desktop (Web Browser) | Full experience |
| Mobile (Web Browser) | Full responsive experience |

> No app download needed. Open Velora directly in any browser on desktop or mobile.

---

## Indian Context

Velora is built specifically for India:

- ₹ symbol on every amount — not $ or €
- Tax helper for 80C, HRA, medical deductions
- Indian merchant names in demos (DMart, Swiggy, Jio Fiber, Apollo)
- Indian family structure support (Joint family, Dada/Dadi)
- Language options: English, Hindi, Gujarati
- Familiar Indian city and name references throughout

---

## Contributing & Feedback

This project is in active design phase. Remaining pages (Transactions, Family, Subscriptions, AI Coach, Settings) will be added as the design system matures.

For design feedback or feature requests, open an issue in this repository.

---

## Pricing Plans

| Feature | Free | Family ₹199/mo | Premium ₹399/mo |
|---|---|---|---|
| Members | 1 | Up to 5 | Unlimited |
| Budget Categories | 5 | Unlimited | Unlimited |
| Savings Goals | 2 | 10 | Unlimited |
| AI Coach | — | ✓ | ✓ |
| Tax Helper | — | — | ✓ |
| WhatsApp Digest | — | ✓ | ✓ |
| Export PDF / Excel | — | ✓ | ✓ |
| Family Budget Council | — | ✓ | ✓ |

> Annual plans save 20% on Family and Premium tiers.

---

## Folder Structure

### Frontend — React JS

```
velora-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── .env
├── .gitignore
├── package.json
└── vite.config.js
```

---

### Backend — MVC Structure

```
velora-backend/
│
├── config/
│   └── db.js
│
├── controllers/
├── models/
├── routes/
├── middleware/
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Made in India

Built for Indian families. Designed for every generation.
Powered by plain language, warm design, and a deep respect for how Indian households actually manage money.