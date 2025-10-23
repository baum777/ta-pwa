import { useEffect, useRef } from 'react'
import { createChart, ColorType, CandlestickSeries, CrosshairMode } from 'lightweight-charts'
import type { IChartApi, CandlestickData, Time, ISeriesApi } from 'lightweight-charts'

export type Candle = {
  time: Time
  open: number
  high: number
  low: number
  close: number
}

export type CandleChartProps = {
  candles: Candle[]
  height?: number
}

export function CandleChart({ candles, height = 360 }: CandleChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#e5e7eb',
      },
      grid: {
        horzLines: { color: 'rgba(255,255,255,0.06)' },
        vertLines: { color: 'rgba(255,255,255,0.06)' },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      crosshair: { mode: CrosshairMode.Normal },
    })

    chartRef.current = chart
    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#00ff66',
      downColor: '#f43f5e',
      borderUpColor: '#00ff66',
      borderDownColor: '#f43f5e',
      wickUpColor: '#00ff66',
      wickDownColor: '#f43f5e',
    })
    seriesRef.current = series

    // Initial data set moved to candles effect

    const resizeObserver = new ResizeObserver(() => {
      const width = containerRef.current?.clientWidth ?? 0
      chart.applyOptions({ width })
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [height])

  useEffect(() => {
    if (!seriesRef.current) return
    if (candles.length > 0) {
      seriesRef.current.setData(candles as unknown as CandlestickData[])
    }
  }, [candles])

  return <div ref={containerRef} className="w-full" style={{ height }} />
}
