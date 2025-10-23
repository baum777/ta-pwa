import { useState } from "react";
import { useDexsearch } from "../features/ticker/useDexsearch";
import { Button } from "./ui/button";

export function DexPricePeek({ onAppend }: { onAppend: (price: number) => void }) {
  const [q, setQ] = useState("sol");
  const { data, isFetching } = useDexsearch(q);
  const first = data?.pairs?.[0];
  const price = first?.priceUsd ? Number(first.priceUsd) : undefined;
  const label = first?.baseToken?.symbol
    ? `${first.baseToken.symbol} ${price ? `($${price.toFixed(4)})` : ""}`
    : "—";

  return (
    <div className="flex items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none"
        placeholder="Search token (e.g. sol)"
      />
      <Button variant="outline">{isFetching ? "…" : "Search"}</Button>
      <div className="text-white/70 text-sm min-w-28">{label}</div>
      <Button onClick={() => price && onAppend(price)}>Append candle</Button>
    </div>
  );
}
