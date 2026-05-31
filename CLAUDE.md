# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Dr. Pizza** (ד"ר פיצה) is a React + TypeScript ordering website for a kosher pizzeria in Raanana, Israel. It is a demo/mockup — no backend or real checkout exists; the order flow ends by prompting the customer to call the restaurant.

- **GitHub:** https://github.com/roykimhazi1/Dr-Pizza
- **Primary branch:** `main`

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 with TypeScript |
| Build | Create React App (`react-scripts` 5) |
| Language | TypeScript (strict mode) |
| Styling | Vanilla CSS — single file `src/index.css` |
| Testing | Jest + React Testing Library |
| Fonts | Google Fonts — Assistant (body), Fredoka (headings) |

---

## Repository Structure

```
Dr-Pizza/
├── public/
│   ├── index.html            # React app shell
│   ├── manifest.json         # PWA manifest
│   └── menu_data/
│       └── menu_items.json   # Menu data served at runtime
├── src/
│   ├── index.tsx             # React DOM entry point
│   ├── index.css             # All styles — single source of truth
│   ├── App.tsx               # Root component; holds global state
│   ├── App.css               # Empty legacy file — do not use
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── setupTests.ts         # Jest / jest-dom setup
│   ├── reportWebVitals.ts    # CRA performance hook
│   ├── react-app-env.d.ts    # CRA ambient types
│   ├── App.test.tsx          # Test file (currently minimal)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── StatsBanner.tsx
│   │   ├── MenuSection.tsx   # Category filter + card grid
│   │   ├── MenuCard.tsx      # Individual menu item card
│   │   ├── CartSidebar.tsx   # Slide-in cart panel
│   │   ├── OrderModal.tsx    # "Call us" order confirmation modal
│   │   ├── HowToOrder.tsx
│   │   ├── Testimonials.tsx
│   │   └── Footer.tsx
│   └── hooks/
│       └── useMenu.ts        # Fetches + transforms menu JSON
├── menu_data/
│   └── menu_items.json       # Duplicate of public/menu_data — keep in sync
├── legacy/                   # Archived vanilla JS version — do not modify
│   ├── index.html
│   ├── style.css
│   └── script.js
├── package.json
└── tsconfig.json
```

---

## Development Workflows

### Install dependencies
```bash
npm install
```

### Start the dev server (port 3000)
```bash
npm start
```

### Run tests
```bash
npm test          # watch mode
CI=true npm test  # single-pass (for CI)
```

### Production build
```bash
npm run build     # output in /build
```

### Type-check without building
```bash
npx tsc --noEmit
```

---

## Architecture

### State management

All global state lives in `App.tsx`:
- `cartItems` — array of `CartItem` objects
- `cartOpen` — boolean controlling cart sidebar visibility
- `modalOpen` — boolean controlling the order modal

Callbacks (`addToCart`, `changeQty`, `placeOrder`) are memoised with `useCallback` and passed as props. There is no context, Redux, or other state library.

### Data flow

1. `useMenu` hook fetches `/menu_data/menu_items.json` on mount.
2. The hook transforms raw JSON: resolves category config, assigns emojis from Hebrew keyword matching, resolves tags, and attaches display colours.
3. `MenuSection` receives the transformed items, applies client-side category filtering, and renders `MenuCard` components.

### Key types (`src/types.ts`)

```ts
MenuItem        // id, name, description, price, category, emoji, tags, color
CartItem        // extends MenuItem with quantity
MenuData        // raw JSON shape from menu_items.json
```

---

## Styling Conventions

- **All styles go in `src/index.css`** — `App.css` is empty and should stay that way.
- CSS custom properties are defined in `:root` (colors, shadows, radius). Always use these tokens; do not hardcode hex values.
- The layout is **RTL** throughout (`dir="rtl"` on `<html>`). All flex/grid directions are set accordingly.
- Responsive breakpoint: `900px` (desktop → mobile).
- Animations use `@keyframes` defined at the bottom of `index.css`. Prefer adding new keyframes there rather than inline styles.

### Color tokens
```css
--red, --orange, --yellow, --green, --purple, --blue, --pink
--dark, --mid, --light, --white
--shadow-sm, --shadow-md, --shadow-lg
--radius (20px)
```

---

## Menu Data (`public/menu_data/menu_items.json`)

The file contains restaurant metadata and four categories:

| Key | Label |
|---|---|
| `pizzas` | פיצות |
| `specials` | מבצעים |
| `desserts` | קינוחים |
| `drinks` | שתייה |

Each item has `name` (Hebrew), `description` (Hebrew), and `price` (ILS integer).

**When modifying menu data**, update **both** copies:
- `public/menu_data/menu_items.json` (served at runtime)
- `menu_data/menu_items.json` (root copy)

---

## Language and Localisation

- All user-facing text is **Hebrew**.
- The app uses **RTL layout**; be careful with directional CSS properties (`margin-left` vs `margin-right`, `left`/`right` positioning, etc.).
- Hebrew emoji/tag resolution is done in `useMenu.ts` via keyword arrays — extend those arrays when adding new items.

---

## Testing

Testing infrastructure: Jest + React Testing Library.

- Tests live alongside source in `src/` (`*.test.tsx`).
- `setupTests.ts` imports `@testing-library/jest-dom` for extended matchers.
- Current coverage is minimal; the existing `App.test.tsx` has a placeholder test.
- When adding new components, add a corresponding test file.

---

## Known Issues / Watchpoints

1. **Duplicate menu JSON** — `menu_data/menu_items.json` and `public/menu_data/menu_items.json` must be kept in sync manually.
2. **Cart not persisted** — cart resets on page refresh; no localStorage integration yet.
3. **No error boundary** — `useMenu` does not handle fetch failures gracefully.
4. **Placeholder test** — `App.test.tsx` checks for "learn react" text which does not exist in this app.
5. **`App.css` is empty** — do not add styles there; use `index.css`.
6. **`legacy/`** — the old vanilla JS site; treat as read-only reference.

---

## Conventions for AI Assistants

- **Do not eject** from Create React App.
- **Do not add** state management libraries (Redux, Zustand, etc.) unless explicitly requested; local state + props is the current pattern.
- **Maintain Hebrew** for all user-visible text.
- **Maintain RTL** layout; test any layout changes in RTL context.
- **Keep styles in `index.css`**; use the existing CSS variable tokens.
- When adding a new component, place it in `src/components/` and export a named export.
- When adding new menu logic, extend `useMenu.ts` rather than scattering it in components.
- TypeScript strict mode is on — all types must be explicit; avoid `any`.
- The `legacy/` directory is archived — make no changes there.
