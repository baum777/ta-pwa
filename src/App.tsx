import { useState } from 'react'
import { Chart } from './components/Chart'
import { ReplayControls } from './components/ReplayControls'
import { useDexscreenerPair } from './hooks/useDexscreener'

function App() {
  const [isReplayMode, setIsReplayMode] = useState(false)
  
  // Example: Fetch SOL/USDC pair from Dexscreener
  const { data: pairData, isLoading, error } = useDexscreenerPair(
    'solana',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-neon-green">TA</span>-PWA
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsReplayMode(!isReplayMode)}
              className={isReplayMode ? 'btn-primary' : 'btn-secondary'}
            >
              {isReplayMode ? 'Live Mode' : 'Replay Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 p-4 rounded mb-4">
            Error: {error.message}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8 text-gray-400">
            Loading market data...
          </div>
        )}

        {pairData && (
          <div className="mb-4 p-4 bg-gray-900 rounded">
            <h2 className="text-lg font-semibold mb-2">
              {pairData.baseToken?.symbol || 'N/A'} / {pairData.quoteToken?.symbol || 'N/A'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Price USD:</span>{' '}
                <span className="text-neon-green">
                  ${pairData.priceUsd || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">24h Volume:</span>{' '}
                <span>${pairData.volume?.h24 ? Number(pairData.volume.h24).toLocaleString() : 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">24h Change:</span>{' '}
                <span className={pairData.priceChange && Number(pairData.priceChange.h24) >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {pairData.priceChange?.h24 || 'N/A'}%
                </span>
              </div>
              <div>
                <span className="text-gray-400">Liquidity:</span>{' '}
                <span>${pairData.liquidity?.usd ? Number(pairData.liquidity.usd).toLocaleString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <Chart isReplayMode={isReplayMode} />
        </div>

        {isReplayMode && (
          <div className="bg-gray-900 rounded-lg p-4">
            <ReplayControls />
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            TA-PWA MVP • Vite + React + TypeScript + Tailwind •{' '}
            {import.meta.env.DEV ? 'Development' : 'Production'} Mode
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
