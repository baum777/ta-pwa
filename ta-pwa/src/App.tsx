import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { Candle } from './components/CandleChart'
import { CandleChart } from './components/CandleChart'
import { useDsSearch } from './lib/dexscreener'

function App() {
  const [count, setCount] = useState(0)

  // simple demo candles
  const nowSec = Math.floor(Date.now() / 1000)
  const candles: Candle[] = useMemo(() => {
    return [
      { time: nowSec - 300 as any, open: 100, high: 106, low: 98, close: 103 },
      { time: nowSec - 240 as any, open: 103, high: 108, low: 101, close: 104 },
      { time: nowSec - 180 as any, open: 104, high: 110, low: 103, close: 109 },
      { time: nowSec - 120 as any, open: 109, high: 112, low: 105, close: 106 },
      { time: nowSec - 60 as any, open: 106, high: 111, low: 102, close: 103 },
    ]
  }, [nowSec])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="mb-4 text-3xl font-bold">TA-PWA</h1>
      <div className="mb-6">
        <CandleChart candles={candles} height={360} />
      </div>
      <div className="mb-6">
        <SearchDemo />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </>
  )
}

function SearchDemo() {
  const [q, setQ] = useState('solana')
  const { data, isFetching } = useDsSearch(q)
  return (
    <div className="text-left">
      <div className="mb-2 flex items-center gap-2">
        <input
          className="w-80 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Dexscreener search..."
        />
        {isFetching && <span className="text-sm text-neutral-400">Loading…</span>}
      </div>
      <ul className="space-y-1 text-sm text-neutral-300">
        {data?.pairs?.slice(0, 5).map((p) => (
          <li key={p.pairAddress} className="truncate">
            <a href={p.url} target="_blank" className="text-emerald-400 underline">
              {p.baseToken.symbol}/{p.quoteToken.symbol}
            </a>
            <span className="ml-2 text-neutral-500">{p.dexId}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
