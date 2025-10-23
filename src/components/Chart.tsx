import { useEffect, useRef, useState } from 'react'
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  Time,
} from 'lightweight-charts'

interface ChartProps {
  isReplayMode?: boolean
}

// Sample data generator
function generateSampleData(count = 100): CandlestickData[] {
  const data: CandlestickData[] = []
  let basePrice = 100
  const now = Math.floor(Date.now() / 1000)
  
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * 2
    const open = basePrice
    const close = basePrice + change
    const high = Math.max(open, close) + Math.random()
    const low = Math.min(open, close) - Math.random()
    
    data.push({
      time: (now - (count - i) * 60) as Time,
      open,
      high,
      low,
      close,
    })
    
    basePrice = close
  }
  
  return data
}

export function Chart({ isReplayMode = false }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [chartError, setChartError] = useState<string | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    try {
      // Create chart
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: { color: '#000000' },
          textColor: '#d1d5db',
        },
        grid: {
          vertLines: { color: '#1f2937' },
          horzLines: { color: '#1f2937' },
        },
        timeScale: {
          borderColor: '#374151',
          timeVisible: true,
        },
        rightPriceScale: {
          borderColor: '#374151',
        },
      })

      chartRef.current = chart

      // Create candlestick series
      const series = chart.addCandlestickSeries({
        upColor: '#00FF66',
        downColor: '#FF0066',
        borderUpColor: '#00FF66',
        borderDownColor: '#FF0066',
        wickUpColor: '#00FF66',
        wickDownColor: '#FF0066',
      })

      seriesRef.current = series

      // Set initial data
      const sampleData = generateSampleData(100)
      series.setData(sampleData)

      // Fit content
      chart.timeScale().fitContent()

      // Handle resize
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          })
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        chart.remove()
        chartRef.current = null
        seriesRef.current = null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error('Chart initialization error:', err)
      setChartError(errorMessage)
    }
  }, [])

  if (chartError) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-gray-900 rounded">
        <div className="text-center text-red-400">
          <p className="font-semibold mb-2">Chart Error</p>
          <p className="text-sm text-gray-400">{chartError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {isReplayMode ? '📼 Replay Chart' : '📊 Live Chart'}
        </h3>
        <div className="text-sm text-gray-400">
          Sample Data • 1m Timeframe
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full rounded" />
    </div>
  )
}
