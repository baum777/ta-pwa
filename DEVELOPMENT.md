# Development Guide

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open http://localhost:3000
```

## Development Workflow

### 1. Before Making Changes
```bash
# Ensure types are correct
pnpm type-check

# Ensure code is clean
pnpm lint
```

### 2. During Development
- Dev server runs at http://localhost:3000
- HMR is active - changes reflect immediately
- Service Worker is DISABLED in dev mode

### 3. Before Committing
```bash
# Format code
pnpm format

# Run all checks
pnpm type-check && pnpm lint && pnpm build
```

## PWA Development

### Testing PWA Features
PWA features (service worker, manifest) are **only enabled in production builds**:

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Clearing Service Worker
If you encounter caching issues in development:

```javascript
// In browser console:
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(reg => reg.unregister()))

// Then hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

## Adding PWA Icons

The project needs actual PNG icons. Generate them using one of these methods:

### Method 1: Online Generator
1. Go to https://realfavicongenerator.net/
2. Upload your logo/icon
3. Download the generated icons
4. Place in `/public/`:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)
   - `apple-touch-icon.png` (180x180)

### Method 2: ImageMagick
```bash
# Install ImageMagick first
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Generate icons
convert -size 192x192 -background "#00FF66" -fill "#000000" \
  -gravity center -pointsize 72 label:"TA" public/icon-192.png

convert -size 512x512 -background "#00FF66" -fill "#000000" \
  -gravity center -pointsize 192 label:"TA" public/icon-512.png

convert -size 180x180 -background "#00FF66" -fill "#000000" \
  -gravity center -pointsize 72 label:"TA" public/apple-touch-icon.png
```

## Code Quality

### ESLint Rules
- No unused variables (prefix with `_` to ignore)
- No explicit `any` types
- React hooks rules enforced
- Prettier formatting enforced

### TypeScript
- **Strict mode enabled**
- No unchecked indexed access
- No fallthrough cases
- All types must be explicit

### Common Fixes

**Unused variable:**
```typescript
// Bad
const [data, setData] = useState()

// Good (if you don't use setData)
const [data, _setData] = useState()
```

**Any type:**
```typescript
// Bad
const value: any = getData()

// Good
import { Time } from 'lightweight-charts'
const value: Time = getData()
```

## Component Development

### Creating a New Component

```typescript
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string
  onAction?: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4 bg-gray-900 rounded">
      <h2 className="text-lg font-semibold">{title}</h2>
      {onAction && (
        <button onClick={onAction} className="btn-primary">
          Action
        </button>
      )}
    </div>
  )
}
```

### Using React Query

```typescript
import { useQuery } from '@tanstack/react-query'

function useMyData(id: string) {
  return useQuery({
    queryKey: ['myData', id],
    queryFn: () => fetch(`/api/data/${id}`).then(r => r.json()),
    staleTime: 5000,
    enabled: !!id,
  })
}

function MyComponent({ id }: { id: string }) {
  const { data, isLoading, error } = useMyData(id)
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return <div>{JSON.stringify(data)}</div>
}
```

## Debugging

### React Query DevTools
Add to `App.tsx`:

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <>
      {/* Your app */}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
```

### Vite Inspector
Check build output:
```bash
pnpm build --mode development
```

### Lighthouse Audits
```bash
# Build production
pnpm build

# Preview
pnpm preview

# Run Lighthouse in Chrome DevTools
# Targets: Performance, PWA, Accessibility
```

## Next Steps

### Immediate (R1)
- [ ] Set up Hono proxy (localhost:8787)
- [ ] Connect live-tail to chart updates
- [ ] Implement IndexedDB for trade journal
- [ ] Add CSV/JSON export for journal

### Near-term (R2)
- [ ] Drizzle ORM setup with Neon
- [ ] Solana wallet integration (Phantom)
- [ ] Token gating UI and logic
- [ ] Chart snapshot export (PNG)

### Future (R3)
- [ ] Migrate to Next.js (App Router)
- [ ] Edge middleware for token gate
- [ ] Internationalization (i18n)
- [ ] Advanced analytics

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
pnpm install
pnpm build
```

### HMR Not Working
```bash
# Check Vite server logs
# Restart dev server
pnpm dev
```

### Type Errors After Update
```bash
# Regenerate types
pnpm type-check

# Update @types packages
pnpm update @types/react @types/react-dom @types/node
```

### PWA Not Installing
1. Check manifest at `/manifest.webmanifest`
2. Verify icons exist in `/public/`
3. Use HTTPS or localhost (required for PWA)
4. Check Chrome DevTools → Application → Manifest

## Performance Tips

### Code Splitting
```typescript
// Lazy load heavy components
const HeavyChart = lazy(() => import('./components/HeavyChart'))

<Suspense fallback={<div>Loading...</div>}>
  <HeavyChart />
</Suspense>
```

### Optimize Lighthouse-charts
```typescript
// Only create chart when needed
useEffect(() => {
  if (!isVisible) return
  // Create chart
}, [isVisible])
```

### Debounce API Calls
```typescript
import { useDebouncedValue } from './hooks/useDebounce'

const debouncedQuery = useDebouncedValue(query, 300)
const { data } = useSearch(debouncedQuery)
```

## Resources

- [Vite Docs](https://vitejs.dev/)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [lightweight-charts Docs](https://tradingview.github.io/lightweight-charts/)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)
