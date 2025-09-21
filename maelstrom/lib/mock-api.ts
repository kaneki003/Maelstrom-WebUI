// Mock API for Maelstrom UI - simulates blockchain interactions
// In production, replace these with actual contract calls

export interface Pool {
  token: string
  symbol: string
  name: string
  ethReserveWei: string
  tokenReserve: string
  lastPriceBuyWAD: string
  lastPriceSellWAD: string
  spotPrice: string
  lastUpdated: number
  userLP: string
  volume24h: string
  tvl: string
  apy: number
}

export interface TradeResult {
  success: boolean
  txHash: string
  amountIn: string
  amountOut: string
  priceImpact: number
  newBuyPrice: string
  newSellPrice: string
  timestamp: number
}

export interface PoolData {
  token: string
  symbol: string
  totalLiquidity: string
  liquidityChange24h: number
  poolRatio: string
  tradingFee: string
  estimatedAPR: string
  tokenReserves: {
    token: {
      amount: string
      value: string
      percentage: number
    }
    eth: {
      amount: string
      value: string
      percentage: number
    }
  }
  totalValue: string
  availableChains: string[]
  poolStatistics: {
    totalFeesCollected: {
      token: string
      eth: string
    }
    volume24h: string
    volume7d: string
    poolAge: string
  }
  priceData: {
    current: number
    change24h: number
    ethPrice: number
    history: Array<{
      timestamp: number
      price: number
    }>
  }
}

// Mock pool data
const mockPools: Pool[] = [
  {
    token: "dai",
    symbol: "DAI",
    name: "Dai Stablecoin",
    ethReserveWei: "1000000000000000000000", // 1000 ETH
    tokenReserve: "3200000000000000000000000", // 3.2M DAI
    lastPriceBuyWAD: "3250000000000000000000", // 3250 DAI per ETH (buy)
    lastPriceSellWAD: "3150000000000000000000", // 3150 DAI per ETH (sell)
    spotPrice: "3200000000000000000000", // 3200 DAI per ETH (spot)
    lastUpdated: Date.now() - 300000, // 5 minutes ago
    userLP: "0",
    volume24h: "2450000",
    tvl: "8900000",
    apy: 12.5,
  },
  {
    token: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    ethReserveWei: "800000000000000000000", // 800 ETH
    tokenReserve: "2560000000000", // 2.56M USDC (6 decimals)
    lastPriceBuyWAD: "3220000000000000000000",
    lastPriceSellWAD: "3180000000000000000000",
    spotPrice: "3200000000000000000000",
    lastUpdated: Date.now() - 180000, // 3 minutes ago
    userLP: "0",
    volume24h: "1890000",
    tvl: "6200000",
    apy: 8.3,
  },
  {
    token: "wbtc",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    ethReserveWei: "500000000000000000000", // 500 ETH
    tokenReserve: "8500000000", // 8.5 WBTC (8 decimals)
    lastPriceBuyWAD: "17200000000000000000", // 17.2 WBTC per ETH
    lastPriceSellWAD: "16800000000000000000", // 16.8 WBTC per ETH
    spotPrice: "17000000000000000000", // 17 WBTC per ETH
    lastUpdated: Date.now() - 120000, // 2 minutes ago
    userLP: "0",
    volume24h: "890000",
    tvl: "12400000",
    apy: 15.7,
  },
]

// Simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class MockApi {
  private pools: Pool[] = [...mockPools]

  async getPools(): Promise<Pool[]> {
    await delay(Math.random() * 500 + 200) // 200-700ms delay
    return [...this.pools]
  }

  async getPool(token: string): Promise<Pool | null> {
    await delay(Math.random() * 300 + 100) // 100-400ms delay
    return this.pools.find((p) => p.token === token) || null
  }

  async buy(token: string, ethAmount: string): Promise<TradeResult> {
    await delay(Math.random() * 1000 + 500) // 500-1500ms delay

    const pool = this.pools.find((p) => p.token === token)
    if (!pool) throw new Error("Pool not found")

    // Simulate price impact and anchor movement
    const ethAmountNum = Number.parseFloat(ethAmount)
    const priceImpact = Math.min(ethAmountNum / 100, 0.05) // Max 5% impact

    // Update pool state (simplified)
    const newBuyPrice = (Number.parseFloat(pool.lastPriceBuyWAD) * (1 + priceImpact * 0.1)).toString()
    const newSellPrice = (Number.parseFloat(pool.lastPriceSellWAD) * (1 + priceImpact * 0.05)).toString()

    pool.lastPriceBuyWAD = newBuyPrice
    pool.lastPriceSellWAD = newSellPrice
    pool.lastUpdated = Date.now()

    const amountOut = (ethAmountNum * Number.parseFloat(pool.spotPrice) * (1 - priceImpact)).toString()

    return {
      success: true,
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      amountIn: ethAmount,
      amountOut,
      priceImpact,
      newBuyPrice,
      newSellPrice,
      timestamp: Date.now(),
    }
  }

  async sell(token: string, tokenAmount: string): Promise<TradeResult> {
    await delay(Math.random() * 1000 + 500)

    const pool = this.pools.find((p) => p.token === token)
    if (!pool) throw new Error("Pool not found")

    const tokenAmountNum = Number.parseFloat(tokenAmount)
    const priceImpact = Math.min((tokenAmountNum / Number.parseFloat(pool.tokenReserve)) * 1000, 0.05)

    const newBuyPrice = (Number.parseFloat(pool.lastPriceBuyWAD) * (1 - priceImpact * 0.05)).toString()
    const newSellPrice = (Number.parseFloat(pool.lastPriceSellWAD) * (1 - priceImpact * 0.1)).toString()

    pool.lastPriceBuyWAD = newBuyPrice
    pool.lastPriceSellWAD = newSellPrice
    pool.lastUpdated = Date.now()

    const amountOut = ((tokenAmountNum / Number.parseFloat(pool.spotPrice)) * (1 - priceImpact)).toString()

    return {
      success: true,
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      amountIn: tokenAmount,
      amountOut,
      priceImpact,
      newBuyPrice,
      newSellPrice,
      timestamp: Date.now(),
    }
  }

  async swap(tokenA: string, tokenB: string, amountIn: string): Promise<TradeResult> {
    await delay(Math.random() * 1200 + 600)

    // Simplified swap logic - in reality this would be more complex
    const poolA = this.pools.find((p) => p.token === tokenA)
    const poolB = this.pools.find((p) => p.token === tokenB)

    if (!poolA || !poolB) throw new Error("Pool not found")

    const amountInNum = Number.parseFloat(amountIn)
    const priceImpact = Math.random() * 0.03 // 0-3% impact

    // Estimate output (simplified)
    const ethValue = tokenA === "eth" ? amountInNum : amountInNum / Number.parseFloat(poolA.spotPrice)
    const amountOut = tokenB === "eth" ? ethValue : ethValue * Number.parseFloat(poolB.spotPrice)
    const finalAmountOut = (amountOut * (1 - priceImpact)).toString()

    return {
      success: true,
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      amountIn,
      amountOut: finalAmountOut,
      priceImpact,
      newBuyPrice: poolB.lastPriceBuyWAD,
      newSellPrice: poolB.lastPriceSellWAD,
      timestamp: Date.now(),
    }
  }
}

export function getPoolData(tokenSymbol: string): PoolData {
  return {
    token: tokenSymbol,
    symbol: tokenSymbol.toUpperCase(),
    totalLiquidity: "$148.37B",
    liquidityChange24h: 2.31,
    poolRatio: "0.0565",
    tradingFee: "5.00%",
    estimatedAPR: "597.40%",
    tokenReserves: {
      token: {
        amount: "633.56K",
        value: "$74.07B",
        percentage: 49.9
      },
      eth: {
        amount: "35.77K",
        value: "$74.30B",
        percentage: 50.1
      }
    },
    totalValue: "$148.37B",
    availableChains: ["base"],
    poolStatistics: {
      totalFeesCollected: {
        token: "30.37K",
        eth: "2.06M"
      },
      volume24h: "$12.45B",
      volume7d: "N/A",
      poolAge: "84 days"
    },
    priceData: {
      current: 116907.79,
      change24h: 174.46,
      ethPrice: 2077096.13,
      history: Array.from({ length: 100 }, (_, i) => ({
        timestamp: Date.now() - (100 - i) * 600000,
        price: 116000 + Math.sin(i * 0.1) * 1000 + Math.random() * 500
      }))
    }
  }
}

// Singleton instance
export const mockApi = new MockApi()
