import { useState } from 'react'

type PlaybackSpeed = 1 | 4 | 8

export function ReplayControls() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState<PlaybackSpeed>(1)
  const [progress, setProgress] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // TODO: Implement actual replay logic
  }

  const handleSpeedChange = (newSpeed: PlaybackSpeed) => {
    setSpeed(newSpeed)
    // TODO: Update replay speed
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setProgress(value)
    // TODO: Seek to position
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayPause}
          className="btn-primary flex items-center gap-2"
        >
          {isPlaying ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </>
          )}
        </button>

        <div className="flex gap-2">
          <span className="text-sm text-gray-400">Speed:</span>
          {([1, 4, 8] as PlaybackSpeed[]).map(s => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`px-3 py-1 text-sm rounded ${
                speed === s
                  ? 'bg-neon-green text-black font-semibold'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-green"
        />
      </div>

      <div className="flex gap-2 text-sm">
        <button className="btn-secondary">
          📥 Load Seed
        </button>
        <button className="btn-secondary">
          💾 Export Seed
        </button>
        <button className="btn-secondary">
          🔖 Bookmark
        </button>
      </div>

      <div className="text-xs text-gray-500 italic">
        Replay controls are currently in stub mode. Implement full replay logic in future iteration.
      </div>
    </div>
  )
}
