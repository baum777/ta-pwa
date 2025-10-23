import { useEffect, useRef } from "react";
import {
  createChart,
  CrosshairMode,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time
} from "lightweight-charts";

type Candle = CandlestickData<Time>;

function generateSeriesData(len = 200): Candle[] {
  const data: Candle[] = [];
  let t = Math.floor(Date.now() / 1000) - len * 60;
  let o = 100, c = 100, h = 102, l = 98;
  for (let i = 0; i < len; i++) {
    const d = (Math.random() - 0.5) * 2;
    o = c;
    c = Math.max(50, o + d);
    h = Math.max(o, c) + Math.random() * 1.5;
    l = Math.min(o, c) - Math.random() * 1.5;
    data.push({ time: (t += 60) as Time, open: o, high: h, low: l, close: c });
  }
  return data;
}

export function LightweightCandle({
  height = 380,
  onReady
}: {
  height?: number;
  onReady?: (api: { chart: IChartApi; series: ISeriesApi<"Candlestick", Candle>; data: Candle[] }) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      const chart = createChart(containerRef.current, {
        autoSize: true,
        height,
        layout: {
          background: { color: "#0B0F14" },
          textColor: "#C5F6FF"
        },
        grid: {
          horzLines: { color: "rgba(255,255,255,0.05)" },
          vertLines: { color: "rgba(255,255,255,0.05)" }
        },
        crosshair: { mode: CrosshairMode.Magnet }
      });
      const series = chart.addCandlestickSeries({
        upColor: "#00FF66",
        borderUpColor: "#00FF66",
        wickUpColor: "#00FF66",
        downColor: "#FF6200",
        borderDownColor: "#FF6200",
        wickDownColor: "#FF6200"
      });
      const initial = generateSeriesData(200);
      series.setData(initial);
      chart.timeScale().fitContent();

      chartRef.current = chart;
      const observer = new ResizeObserver(() => {
          try { chart.applyOptions({}); } catch {}
        });
      observer.observe(containerRef.current);

      onReady?.({ chart, series, data: initial });

      return () => {
        observer.disconnect();
        chart.remove();
        chartRef.current = null;
      };
    } catch (err) {
      console.error("Chart init error:", err);
    }
  }, [height, onReady]);

  return <div ref={containerRef} className="w-full rounded-2xl border border-white/10" />;
}
