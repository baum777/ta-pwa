import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type DsPair = {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: { address: string; symbol: string; name: string }
  quoteToken: { address: string; symbol: string; name: string }
  priceNative?: string
  priceUsd?: string
}

export type DsSearchResponse = {
  schemaVersion: string
  pairs?: DsPair[]
}

export async function fetchDsSearch(query: string): Promise<DsSearchResponse> {
  const res = await fetch(`/api/ds/search?q=${encodeURIComponent(query)}`)
  if (!res.ok) {
    throw new Error(`Dexscreener search failed: ${res.status}`)
  }
  return res.json()
}

export function useDsSearch(query: string) {
  return useQuery({
    queryKey: ['ds', 'search', query],
    queryFn: () => fetchDsSearch(query),
    enabled: query.trim().length > 1,
    placeholderData: keepPreviousData,
  })
}
