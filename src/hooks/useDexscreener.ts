import { useQuery } from '@tanstack/react-query'
import {
  searchPairs,
  getPair,
  getPairs,
  getTokenPairs,
} from '../lib/dexscreener'

/**
 * Hook to search for pairs
 */
export function useDexscreenerSearch(query: string, enabled = true) {
  return useQuery({
    queryKey: ['dexscreener', 'search', query],
    queryFn: () => searchPairs(query),
    enabled: enabled && query.length > 0,
    staleTime: 15000, // 15s
  })
}

/**
 * Hook to get a single pair by chain and address
 */
export function useDexscreenerPair(
  chain: string,
  pairAddress: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['dexscreener', 'pair', chain, pairAddress],
    queryFn: () => getPair(chain, pairAddress),
    enabled: enabled && !!chain && !!pairAddress,
    staleTime: 15000, // 15s
  })
}

/**
 * Hook to get multiple pairs
 */
export function useDexscreenerPairs(
  chain: string,
  pairAddresses: string[],
  enabled = true
) {
  return useQuery({
    queryKey: ['dexscreener', 'pairs', chain, pairAddresses],
    queryFn: () => getPairs(chain, pairAddresses),
    enabled: enabled && !!chain && pairAddresses.length > 0,
    staleTime: 15000, // 15s
  })
}

/**
 * Hook to get pairs by token address
 */
export function useDexscreenerTokenPairs(
  tokenAddress: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['dexscreener', 'token', tokenAddress],
    queryFn: () => getTokenPairs(tokenAddress),
    enabled: enabled && !!tokenAddress,
    staleTime: 15000, // 15s
  })
}

/**
 * Hook for live-tail polling (5s interval)
 */
export function useDexscreenerLiveTail(
  chain: string,
  pairAddress: string,
  enabled = true
) {
  return useQuery({
    queryKey: ['dexscreener', 'live', chain, pairAddress],
    queryFn: () => getPair(chain, pairAddress),
    enabled: enabled && !!chain && !!pairAddress,
    refetchInterval: 5000, // 5s polling
    staleTime: 0, // Always consider stale for live updates
  })
}
