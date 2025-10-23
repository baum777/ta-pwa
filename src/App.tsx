import { useCallback,  useEffect, useRef, useState } from "react";
import { LightweightCandle } from "./components/chart/LightweightCandle";
import type { IChartApi, ISeriesApi, CandlestickData, Time } from "lightweight-charts";
import { ReplayController } from "./features/replay/ReplayController";
import { DexPricePeek } from "./components/DexPricePeek";


type Candle = CandlestickData<Time>;

export default function App() {
  const [series, setSeries] = useState<ISeriesApi<"Candlestick", Candle> | null>(null);
  const seedRef = useRef<Candle[]>([]);

  const handleReady = useCallback(({
    chart, series, data
  }: { chart: IChartApi; series: ISeriesApi<"Candlestick", Candle>; data: Candle[] }) => {
    setSeries(series);
    seedRef.current = data;
  }, []);
const lastTsRef = useRef<number | null>(null);

function appendPriceAsCandle(price: number) {
  if (!series) return;
  const now = Math.floor(Date.now() / 1000);
  const t = (lastTsRef.current ?? now) + 60; // +1m Schritt
  lastTsRef.current = t;
  // Simple OHLC um den Preis
  const open = price * (1 - Math.random() * 0.002);
  const close = price * (1 + Math.random() * 0.002);
  const high = Math.max(open, close) * (1 + Math.random() * 0.0015);
  const low = Math.min(open, close) * (1 - Math.random() * 0.0015);
  series.update({ time: t as any, open, high, low, close });


// in App.tsx (oder eigenem Hook)
useEffect(() => {
  if (!series) return;
  let t = Math.floor(Date.now()/1000);
  const id = setInterval(async () => {
    const r = await fetch("https://api.dexscreener.com/latest/dex/search?q=sol");
    const j = await r.json();
    const p = Number(j?.pairs?.[0]?.priceUsd);
    if (!p) return;
    t += 60;
    const open=p*(1-0.001), close=p*(1+0.001);
    series.update({ time: t as any, open, high: Math.max(open,close)*1.0015, low: Math.min(open,close)*0.9985, close });
  }, 5000);
  return () => clearInterval(id);
}, [series]);
}

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/50 backdrop-blur">
        <section className="flex items-center justify-between gap-4 flex-wrap">
  <h2 className="text-xl font-semibold">Candle Chart (demo)</h2>
  <div className="flex items-center gap-3">
    <DexPricePeek onAppend={appendPriceAsCandle} />
    <ReplayController series={series} seed={seedRef.current} />
  </div>
</section>
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-neon-green animate-pulse" />
            <h1 className="text-lg font-semibold tracking-tight">$CRYPTOBER — TA-PWA</h1>
          </div>
          <nav className="text-sm text-white/70">MVP • PWA • Replay</nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl w-full px-4 py-6 space-y-4">{new URLSearchParams(location.search).get('safe')==='1' ? (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="text-xl font-semibold mb-2">Safe Mode</h2>
          <p className="text-white/70">Chart wurde absichtlich deaktiviert (?safe=1). Shell rendert, kein Black Screen.</p>
        </div>
      ) : (
        <><section className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Candle Chart (demo)</h2>
            <ReplayController series={series} seed={seedRef.current} />
          </section><LightweightCandle onReady={handleReady} /></>
      )}
      </main>

      <footer className="mt-auto py-6 text-center text-xs text-white/40">
        © 2025 $CRYPTOBER — Built with Vite + React + Tailwind (no-PWA)
      </footer>
    </div>
  );
}
