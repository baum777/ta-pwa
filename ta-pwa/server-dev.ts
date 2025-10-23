import { serve } from '@hono/node-server'
import app from './server'

const port = Number(process.env.PORT || 8787)
console.log(`[ta-pwa] Hono API listening on http://localhost:${port}`)
serve({ fetch: app.fetch, port })
