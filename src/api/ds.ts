export type DexSearch = {
  pairs?: Array<{
    chainId?: string;
    pairAddress?: string;
    priceUsd?: string;
    baseToken?: { symbol?: string };
    quoteToken?: { symbol?: string };
  }>;
};

export async function dsSearch(q: string): Promise<DexSearch> {
  const r = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(q)}`);
  if (!r.ok) throw new Error(`dexscreener ${r.status}`);
  return r.json();
}
