import { Hono } from 'hono'
import { HonoRequest } from 'hono/request'

const app = new Hono()

// Basic cache util: 15s in-memory
const cache = new Map<string, { ts: number; body: string; status: number; headers: Record<string, string> }>()
const TTL_MS = 15_000

async function proxyJson(req: HonoRequest, url: string) {
  const cacheKey = url
  const now = Date.now()
  const cached = cache.get(cacheKey)
  if (cached && now - cached.ts < TTL_MS) {
    return new Response(cached.body, { status: cached.status, headers: cached.headers })
  }

  const res = await fetch(url, { headers: { 'user-agent': 'ta-pwa-proxy/1.0' } })
  const body = await res.text()
  const headers: Record<string, string> = {
    'content-type': res.headers.get('content-type') || 'application/json; charset=utf-8',
    'cache-control': 'public, max-age=15',
  }
  cache.set(cacheKey, { ts: now, body, status: res.status, headers })
  return new Response(body, { status: res.status, headers })
}

app.get('/api/ds/search', (c) => {
  const q = c.req.query('q')?.trim() || ''
  if (!q) return c.json({ error: 'Missing q' }, 400)
  const url = `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(q)}`
  return proxyJson(c.req, url)
})

app.get('/api/ds/pair', (c) => {
  const chain = c.req.query('chain')?.trim() || 'solana'
  const address = c.req.query('address')?.trim() || ''
  if (!address) return c.json({ error: 'Missing address' }, 400)
  const url = `https://api.dexscreener.com/latest/dex/pairs/${encodeURIComponent(chain)}/${encodeURIComponent(address)}`
  return proxyJson(c.req, url)
})

export default app
