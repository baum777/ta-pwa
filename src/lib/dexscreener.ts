// Dexscreener API client
// Docs: https://docs.dexscreener.com/api/reference

export interface DexscreenerToken {
  address: string
  name: string
  symbol: string
}

export interface DexscreenerPair {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: DexscreenerToken
  quoteToken: DexscreenerToken
  priceNative: string
  priceUsd?: string
  txns?: {
    m5?: { buys: number; sells: number }
    h1?: { buys: number; sells: number }
    h6?: { buys: number; sells: number }
    h24?: { buys: number; sells: number }
  }
  volume?: {
    h24?: number
    h6?: number
    h1?: number
    m5?: number
  }
  priceChange?: {
    m5?: number
    h1?: number
    h6?: number
    h24?: number
  }
  liquidity?: {
    usd?: number
    base?: number
    quote?: number
  }
  fdv?: number
  marketCap?: number
  pairCreatedAt?: number
}

export interface DexscreenerSearchResult {
  schemaVersion: string
  pairs: DexscreenerPair[] | null
}

export interface DexscreenerPairResult {
  schemaVersion: string
  pair: DexscreenerPair | null
}

const BASE_URL = 'https://api.dexscreener.com/latest'

/**
 * Search for pairs by token symbol or address
 */
export async function searchPairs(query: string): Promise<DexscreenerPair[]> {
  const response = await fetch(`${BASE_URL}/dex/search?q=${encodeURIComponent(query)}`)
  
  if (!response.ok) {
    throw new Error(`Dexscreener API error: ${response.status} ${response.statusText}`)
  }
  
  const data: DexscreenerSearchResult = await response.json()
  return data.pairs || []
}

/**
 * Get pair by chain and address
 */
export async function getPair(
  chain: string,
  pairAddress: string
): Promise<DexscreenerPair | null> {
  const response = await fetch(
    `${BASE_URL}/dex/pairs/${chain}/${pairAddress}`
  )
  
  if (!response.ok) {
    throw new Error(`Dexscreener API error: ${response.status} ${response.statusText}`)
  }
  
  const data: DexscreenerPairResult = await response.json()
  return data.pair
}

/**
 * Get multiple pairs by chain and addresses
 */
export async function getPairs(
  chain: string,
  pairAddresses: string[]
): Promise<DexscreenerPair[]> {
  const addressList = pairAddresses.join(',')
  const response = await fetch(
    `${BASE_URL}/dex/pairs/${chain}/${addressList}`
  )
  
  if (!response.ok) {
    throw new Error(`Dexscreener API error: ${response.status} ${response.statusText}`)
  }
  
  const data: DexscreenerSearchResult = await response.json()
  return data.pairs || []
}

/**
 * Get pairs by token address
 */
export async function getTokenPairs(
  tokenAddress: string
): Promise<DexscreenerPair[]> {
  const response = await fetch(
    `${BASE_URL}/dex/tokens/${tokenAddress}`
  )
  
  if (!response.ok) {
    throw new Error(`Dexscreener API error: ${response.status} ${response.statusText}`)
  }
  
  const data: DexscreenerSearchResult = await response.json()
  return data.pairs || []
}
