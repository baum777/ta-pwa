# Changelog

All notable changes to TA-PWA will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Hono proxy setup (localhost:8787)
- Live-tail chart updates
- Trade journal with IndexedDB
- Journal CSV/JSON export

## [0.1.0] - 2025-10-23

### Added - Initial MVP Setup

#### Core Infrastructure
- **Vite 5.4** + React 18 + TypeScript 5.6 (strict mode)
- **Tailwind CSS 3.4** with custom neon theme colors
- **pnpm 10.17** as package manager
- **ESLint 8.57** (pinned) + Prettier for code quality
- PostCSS with Autoprefixer

#### Features
- **Chart Component** - Interactive candlestick charts using lightweight-charts 4.2
  - Dark theme with neon green/red colors
  - Sample data generator for development
  - Responsive sizing with window resize handling
- **Replay Controls** - Stub implementation with play/pause/speed controls
  - Speed options: 1x, 4x, 8x
  - Progress scrubber
  - Placeholder for load/export seed functionality
- **Dexscreener Integration** - Complete API client and React Query hooks
  - Search pairs by symbol/address
  - Get pair details by chain and address
  - Live-tail polling (5s interval)
  - Multiple pairs support
  - Token pairs lookup
- **ErrorBoundary** - Global error handling with user-friendly fallback
- **React Query** - Server state management with optimized defaults
  - 5s stale time for most queries
  - 15s cache for Dexscreener API
  - Network-first strategy

#### PWA Configuration
- **vite-plugin-pwa** - Production-only service worker
  - Auto-update registration
  - Offline shell caching
  - Runtime caching strategies:
    - NetworkFirst for API (4s timeout, 15s cache)
    - StaleWhileRevalidate for images (30 day cache)
- **Web Manifest** - TA-PWA Trading Analytics
  - Standalone display mode
  - Neon green theme (#00FF66)
  - Icon placeholders (192x192, 512x512)

#### Developer Experience
- **TypeScript strict mode** with comprehensive type checking
- **ESLint configuration** with React and TypeScript plugins
- **Prettier** with consistent formatting rules
- **VS Code extensions** recommendations
- **Build approval script** for CI/CD gates
- **Comprehensive documentation** (README, DEVELOPMENT, CHANGELOG)

#### Project Structure
```
/workspace
├── src/
│   ├── components/     # Chart, ReplayControls, ErrorBoundary
│   ├── hooks/          # useDexscreener hooks
│   ├── lib/            # Dexscreener API client
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point with providers
│   └── index.css       # Tailwind + custom styles
├── public/             # Static assets
├── vite.config.ts      # Vite + PWA config
├── tailwind.config.js  # Custom theme
└── tsconfig.json       # TypeScript strict config
```

### Fixed
- **Black screen issue** - Removed `series.getData()` call that caused crashes
- **Service Worker dev issues** - Disabled SW in development mode
- **TSX parser errors** - Fixed TypeScript generics and quote escaping
- **Type safety** - Added proper Time type from lightweight-charts
- **Unused imports** - Cleaned up React and type imports

### Security
- **CSP ready** - Content Security Policy configuration documented
- **No client secrets** - Environment variables structure in place
- **Strict TypeScript** - Type safety throughout codebase

### Performance
- **Bundle size**: 353KB (112KB gzipped) - Initial baseline
- **Precache**: 8 entries (362KB)
- **Build time**: ~3.5s
- **HMR**: Instant updates in development

### Documentation
- **README.md** - Comprehensive project overview and setup guide
- **DEVELOPMENT.md** - Detailed development workflow and debugging
- **CHANGELOG.md** - This file
- **.env.example** - Environment variable template

### Known Issues
- Bundle size (112KB gz) slightly above 300KB target - optimization planned
- PWA icons are placeholders - need actual PNG files
- Replay controls are stubs - full implementation pending
- No Hono proxy yet - direct Dexscreener API calls

### Technical Decisions

#### Why ESLint 8.57?
- Pinned for MVP stability
- All plugins compatible
- Flat config (ESLint 9) migration planned for future

#### Why PWA prod-only?
- Prevents service worker caching issues in dev
- Cleaner HMR experience
- Matches production deployment

#### Why React Query?
- Industry standard for server state
- Built-in caching and refetching
- DevTools integration
- Optimistic updates ready

#### Why lightweight-charts?
- Excellent performance (60fps capable)
- Professional-grade candlestick rendering
- Small bundle impact
- Full TypeScript support

### Dependencies

#### Core
- react: 18.3.1
- react-dom: 18.3.1
- typescript: 5.6.3
- vite: 5.4.21

#### Features
- @tanstack/react-query: 5.59.0
- lightweight-charts: 4.2.0
- zustand: 4.5.5

#### Styling
- tailwindcss: 3.4.15
- autoprefixer: 10.4.20
- postcss: 8.4.49

#### Quality Tools
- eslint: 8.57.0 (pinned)
- prettier: 3.3.3
- @typescript-eslint/*: 6.21.0

#### PWA
- vite-plugin-pwa: 0.20.5
- workbox-window: 7.1.0

## Release Process

### Version Numbering
- **Major (X.0.0)**: Breaking changes, architecture shifts
- **Minor (0.X.0)**: New features, backwards compatible
- **Patch (0.0.X)**: Bug fixes, small improvements

### Release Checklist
- [ ] All tests passing (when implemented)
- [ ] Type check: `pnpm type-check`
- [ ] Lint check: `pnpm lint`
- [ ] Build check: `pnpm build`
- [ ] Performance budget met (LCP < 2.5s, bundle < 300KB)
- [ ] PWA manifest valid
- [ ] Offline functionality tested
- [ ] CHANGELOG updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Release notes written

---

**Legend**:
- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Vulnerability fixes
