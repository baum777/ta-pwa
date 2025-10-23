import { useEffect, useRef, useState } from "react";
import type { ISeriesApi, Time, CandlestickData } from "lightweight-charts";
import { Button } from "../../components/ui/button";

type Candle = CandlestickData<Time>;

export function ReplayController({
  series,
  seed,
}: {
  series: ISeriesApi<"Candlestick", Candle> | null;
  seed: Candle[];
}) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 1x, 4x
  const idxRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  function tick() {
    if (!series) return;
    const i = idxRef.current;
    if (i >= seed.length) { setPlaying(false); return; }
    const slice = seed.slice(0, i + 1);
    series.setData(slice);
    idxRef.current = i + 1;
  }

  function play() {
    if (playing) return;
    setPlaying(true);
    const interval = Math.max(50, 500 / speed);
    timerRef.current = window.setInterval(tick, interval);
  }

  function stop() {
    setPlaying(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={playing ? stop : play} variant={playing ? "outline" : "default"}>
        {playing ? "Stop" : "Replay"}
      </Button>
      <Button variant="ghost" onClick={() => setSpeed(1)} className={speed===1 ? "ring-2 ring-neon-green/60" : ""}>
        1x
      </Button>
      <Button variant="ghost" onClick={() => setSpeed(4)} className={speed===4 ? "ring-2 ring-neon-green/60" : ""}>
        4x
      </Button>
    </div>
  );
}
