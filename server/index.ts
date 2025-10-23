import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

const app = new Hono();
app.use('/api/*', cors());

// Dexscreener: einfache Suche (?q=sol)
app.get('/api/ds/search', async (c: { req: { query: (arg0: string) => string; }; json: (arg0: any, arg1: number, arg2: { 'Cache-Control': string; }) => any; }) => {
  const q = c.req.query('q') ?? '';
  const r = await fetch(
    'https://api.dexscreener.com/latest/dex/search?q=' + encodeURIComponent(q)
  );
  const json = await r.json();
  return c.json(json, 200, { 'Cache-Control': 'public, s-maxage=15' });
});

// Beispiel: Pair-Info by address (DEXScreener-Standard)
app.get('/api/ds/pair', async (c: { req: { query: (arg0: string) => string; }; json: (arg0: { error: string; }, arg1: number, arg2: { 'Cache-Control': string; } | undefined) => any; }) => {
  const chain = c.req.query('chain') ?? 'solana';
  const addr = c.req.query('address'); // z.B. Raydium pool addr
  if (!addr) return c.json({ error: 'address missing' }, 400);
  const r = await fetch(
    `https://api.dexscreener.com/latest/dex/pairs/${chain}/${addr}`
  );
  return c.json(await r.json(), 200, { 'Cache-Control': 'public, s-maxage=15' });
});

serve({ fetch: app.fetch, port: 8787 });
console.log('API on http://localhost:8787');
