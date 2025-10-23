# TA-PWA - Trading Analytics Progressive Web App

A fast, offline-capable Trading PWA (Solana-focused) built with Vite, React, TypeScript, Tailwind CSS, and lightweight-charts. Designed for chart analysis, replay functionality, trade journaling, and live market data integration.

## 🚀 Features

### MVP Features (Current)
- **📊 Interactive Charts**: Candlestick charts powered by lightweight-charts with dark/neon theme
- **📼 Replay Mode**: Play/pause/speed controls with scrubber (stub implementation)
- **🔴 Live Data**: Real-time market data from Dexscreener with 5s polling
- **💾 PWA Support**: Offline-first architecture with service worker (production only)
- **🎨 Modern UI**: Beautiful dark theme with neon accents using Tailwind CSS
- **⚡ Performance**: Optimized bundle size (<300KB), LCP <2.5s target

### Planned Features
- **📝 Trade Journal**: Entry tracking with tags, filters, and CSV/JSON export
- **🖼️ Screenshot Deep Dive**: Drag & drop screenshots for automatic ticker recognition
- **🔐 Token Gating**: Solana wallet integration (Phantom/Solflare)
- **📤 Share/Export**: Chart snapshots, journal exports, replay seeds
- **🔄 Hono Proxy**: Clean API routing for Dexscreener and future data sources

## 🛠️ Tech Stack

### Core
- **Vite** - Lightning-fast build tool
- **React 18** - UI framework
- **TypeScript** - Type safety (strict mode)
- **Tailwind CSS** - Utility-first styling
- **pnpm** - Fast, disk-efficient package manager

### Data & State
- **React Query** (@tanstack/react-query) - Server state management
- **Zustand** - Optional client state (lightweight)
- **lightweight-charts** - Professional-grade charting

### PWA & Quality
- **vite-plugin-pwa** - Service worker & manifest (prod-only)
- **ESLint 8.57.0** - Linting (pinned version, flat config planned)
- **Prettier** - Code formatting

## 📦 Installation

### Prerequisites
- **Node.js**: 20.x or higher
- **pnpm**: 10.17.1 or higher

```bash
# Install pnpm if needed
npm install -g pnpm@10.17.1

# Install dependencies
pnpm install
```

## 🏃 Development

```bash
# Start dev server (http://localhost:3000)
pnpm dev

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
pnpm format:check
```

### Dev Environment Notes
- **Service Worker is DISABLED in development** to avoid caching issues
- Hot Module Replacement (HMR) is active
- Strict TypeScript checks are enforced

## 🏗️ Build & Deploy

```bash
# Production build
pnpm build

# Preview production build
pnpm preview

# CI/CD approval gate
pnpm approve-builds
```

### Build Output
- Output directory: `dist/`
- Service Worker: Enabled in production only
- Assets: Precached static files, runtime caching for API/images

## 📁 Project Structure

```
/workspace
├── public/               # Static assets
│   ├── icon-192.png      # PWA icon (192x192)
│   ├── icon-512.png      # PWA icon (512x512)
│   ├── apple-touch-icon.png
│   └── robots.txt
├── src/
│   ├── components/       # React components
│   │   ├── Chart.tsx     # Candlestick chart component
│   │   ├── ReplayControls.tsx
│   │   └── ErrorBoundary.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useDexscreener.ts
│   ├── lib/              # Utilities & clients
│   │   └── dexscreener.ts
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles
│   └── vite-env.d.ts     # Type definitions
├── index.html            # HTML entry
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript config (strict)
├── .eslintrc.cjs         # ESLint config
├── .prettierrc           # Prettier config
└── package.json
```

## 🔌 API Integration

### Dexscreener Client

```typescript
// Search pairs
import { useDexscreenerSearch } from './hooks/useDexscreener'

const { data, isLoading } = useDexscreenerSearch('SOL')

// Get specific pair
import { useDexscreenerPair } from './hooks/useDexscreener'

const { data } = useDexscreenerPair('solana', 'PAIR_ADDRESS')

// Live-tail polling (5s interval)
import { useDexscreenerLiveTail } from './hooks/useDexscreener'

const { data } = useDexscreenerLiveTail('solana', 'PAIR_ADDRESS')
```

### Future: Hono Proxy
Planned API routes (localhost:8787 dev, Edge in production):
- `GET /api/ds/search?q=term` - Dexscreener search
- `GET /api/ds/pair?chain=solana&address=...` - Pair details

## 🎨 Theme & Styling

### Color Palette
- **Primary**: `#00FF66` (neon-green)
- **Secondary**: `#00D4FF` (neon-blue)
- **Accent**: `#B000FF` (neon-purple)
- **Background**: `#000000` (black)
- **Text**: `#FFFFFF` (white)

### Tailwind Utilities
```tsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
```

## 🔒 Security & Performance

### Content Security Policy (CSP)
- **Production**: Strict CSP (default-src 'self')
- **Development**: Relaxed for HMR/eval

### Performance Budgets
- **LCP**: < 2.5s
- **TTI**: < 3s (4G)
- **Bundle Size**: < 300KB (gzipped)
- **CLS**: ~0
- **Frame Rate**: 60fps

### Caching Strategy
- **Static Assets**: Precached (HTML, CSS, JS, icons)
- **API Calls**: NetworkFirst (4s timeout, 15s cache)
- **Images**: StaleWhileRevalidate (30 day cache)

## 📱 PWA Features

### Manifest
- **Name**: TA-PWA Trading Analytics
- **Theme Color**: #00FF66
- **Display**: Standalone
- **Start URL**: /
- **Icons**: 192x192, 512x512

### Offline Support
- App shell cached for offline use
- Runtime caching for dynamic content
- Update prompt for new versions

### Clear Service Worker (if needed)
```javascript
// In browser console
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(reg => reg.unregister()))
```

## 🧪 Testing (Planned)

### Unit Tests (Vitest + RTL)
- Component smoke tests
- Hook behavior tests
- Utility function tests

### E2E Tests (Playwright)
- Journal add/filter/export
- Replay play/pause
- Deep dive upload flow

### Release Gates
- ✅ Lint checks pass
- ✅ TypeScript builds without errors
- ✅ LCP budget met
- ✅ Offline functionality works

## 📚 Architecture Decisions

### Why Vite over Next.js (for MVP)?
- Faster dev experience
- Simpler deployment (static)
- No SSR complexity initially
- Migration path to Next.js exists (R3 roadmap)

### Why ESLint 8.57.0?
- Pinned for stability during MVP
- Flat config (ESLint 9) planned for future
- Compatible with all current plugins

### Why React Query?
- Automatic caching & refetching
- Optimistic updates ready
- DevTools for debugging
- Industry standard

### Why lightweight-charts?
- Excellent performance (60fps)
- Professional candlestick rendering
- Small bundle size
- TypeScript support

## 🗺️ Roadmap

### R1 (Current MVP)
- [x] Vite + React + TS + Tailwind setup
- [x] lightweight-charts integration
- [x] Replay controls (stub)
- [x] Dexscreener client & hooks
- [x] PWA configuration (prod-only)
- [x] ErrorBoundary & runtime safety
- [ ] Hono proxy setup
- [ ] Live-tail connected to chart
- [ ] Journal (IndexedDB + export)

### R2 (Enhanced Features)
- [ ] Drizzle ORM + Neon Postgres
- [ ] Solana wallet integration
- [ ] Token gating
- [ ] Share snapshots (PNG export)
- [ ] Screenshot → Deep Dive

### R3 (Production Ready)
- [ ] Next.js migration (SSR/SEO)
- [ ] Edge middleware (token gate)
- [ ] i18n support
- [ ] Advanced analytics
- [ ] Social features

## 🐛 Known Issues & Fixes

### 2025-10-23 Timeline
- ✅ Black screen fix: Removed `series.getData()` call
- ✅ SW only in prod: Prevents dev caching issues
- ✅ TSX parser errors: Fixed generics and quote escaping
- ✅ Brave/Chrome SW cleanup: Documented unregister process
- ✅ React Query integration: Provider configured
- ✅ ESLint 8.57.0: Pinned for stability

### Common Issues

**Issue**: Service worker caching old code in dev
**Fix**: SW is disabled in dev mode by default

**Issue**: PWA icons not found
**Fix**: Generate actual PNG files (see `public/*.png.txt` placeholders)

**Issue**: TypeScript errors with lightweight-charts
**Fix**: Ensure `vite-plugin-pwa/client` types are included in tsconfig

## 🤝 Contributing

1. Ensure pnpm 10.17.1+ and Node 20+ are installed
2. Run `pnpm install`
3. Create feature branch: `git checkout -b feature/my-feature`
4. Make changes and test: `pnpm lint && pnpm type-check && pnpm build`
5. Commit with clear message
6. Submit PR

## 📄 License

See LICENSE file for details.

## 📞 Support

For issues, questions, or feature requests, open an issue on GitHub.

---

**Built with ⚡ by the TA-PWA team**

*Trading PWA MVP • Focused on stability and developer experience*
