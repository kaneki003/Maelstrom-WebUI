import { mockApi, type TradeResult } from "./mock-api"

export interface PriceUpdate {
  token: string
  price: string
  change24h: number
  volume24h: string
  timestamp: number
}

export interface LiquidityEvent {
  id: string
  type: "add" | "remove"
  token: string
  amount: string
  user: string
  timestamp: number
}

export interface TradeEvent {
  id: string
  type: "buy" | "sell" | "swap"
  tokenIn: string
  tokenOut: string
  amountIn: string
  amountOut: string
  user: string
  timestamp: number
  txHash: string
}

class EnhancedMockApi {
  private priceUpdateCallbacks: ((update: PriceUpdate) => void)[] = []
  private liquidityEventCallbacks: ((event: LiquidityEvent) => void)[] = []
  private tradeEventCallbacks: ((event: TradeEvent) => void)[] = []
  private priceUpdateInterval: NodeJS.Timeout | null = null

  constructor() {
    this.startPriceUpdates()
  }

  // Real-time price updates
  startPriceUpdates() {
    this.priceUpdateInterval = setInterval(() => {
      this.simulatePriceUpdate()
    }, 5000) // Update every 5 seconds
  }

  stopPriceUpdates() {
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval)
      this.priceUpdateInterval = null
    }
  }

  private async simulatePriceUpdate() {
    const pools = await mockApi.getPools()
    const randomPool = pools[Math.floor(Math.random() * pools.length)]

    // Simulate price movement (-2% to +2%)
    const priceChange = (Math.random() - 0.5) * 0.04
    const newPrice = (Number.parseFloat(randomPool.spotPrice) * (1 + priceChange)).toString()

    const update: PriceUpdate = {
      token: randomPool.token,
      price: newPrice,
      change24h: priceChange * 100,
      volume24h: randomPool.volume24h,
      timestamp: Date.now(),
    }

    this.priceUpdateCallbacks.forEach((callback) => callback(update))
  }

  // Event subscriptions
  onPriceUpdate(callback: (update: PriceUpdate) => void) {
    this.priceUpdateCallbacks.push(callback)
    return () => {
      const index = this.priceUpdateCallbacks.indexOf(callback)
      if (index > -1) {
        this.priceUpdateCallbacks.splice(index, 1)
      }
    }
  }

  onLiquidityEvent(callback: (event: LiquidityEvent) => void) {
    this.liquidityEventCallbacks.push(callback)
    return () => {
      const index = this.liquidityEventCallbacks.indexOf(callback)
      if (index > -1) {
        this.liquidityEventCallbacks.splice(index, 1)
      }
    }
  }

  onTradeEvent(callback: (event: TradeEvent) => void) {
    this.tradeEventCallbacks.push(callback)
    return () => {
      const index = this.tradeEventCallbacks.indexOf(callback)
      if (index > -1) {
        this.tradeEventCallbacks.splice(index, 1)
      }
    }
  }

  // Enhanced trading methods
  async enhancedBuy(token: string, ethAmount: string, slippage = 0.5): Promise<TradeResult> {
    const result = await mockApi.buy(token, ethAmount)

    // Emit trade event
    const tradeEvent: TradeEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type: "buy",
      tokenIn: "ETH",
      tokenOut: token.toUpperCase(),
      amountIn: ethAmount,
      amountOut: result.amountOut,
      user: "0x" + Math.random().toString(16).substr(2, 40),
      timestamp: result.timestamp,
      txHash: result.txHash,
    }

    this.tradeEventCallbacks.forEach((callback) => callback(tradeEvent))
    return result
  }

  async enhancedSell(token: string, tokenAmount: string, slippage = 0.5): Promise<TradeResult> {
    const result = await mockApi.sell(token, tokenAmount)

    const tradeEvent: TradeEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type: "sell",
      tokenIn: token.toUpperCase(),
      tokenOut: "ETH",
      amountIn: tokenAmount,
      amountOut: result.amountOut,
      user: "0x" + Math.random().toString(16).substr(2, 40),
      timestamp: result.timestamp,
      txHash: result.txHash,
    }

    this.tradeEventCallbacks.forEach((callback) => callback(tradeEvent))
    return result
  }

  // Advanced analytics
  async getMarketStats() {
    const pools = await mockApi.getPools()

    const totalTVL = pools.reduce((sum, pool) => sum + Number.parseFloat(pool.tvl), 0)
    const totalVolume24h = pools.reduce((sum, pool) => sum + Number.parseFloat(pool.volume24h), 0)
    const avgAPY = pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length

    return {
      totalTVL: totalTVL.toString(),
      totalVolume24h: totalVolume24h.toString(),
      avgAPY,
      activeUsers24h: Math.floor(Math.random() * 1000) + 500,
      totalTrades24h: Math.floor(Math.random() * 5000) + 2000,
      timestamp: Date.now(),
    }
  }

  // Simulate network congestion
  async getNetworkStatus() {
    const congestionLevel = Math.random()

    return {
      gasPrice: Math.floor(20 + congestionLevel * 100), // 20-120 gwei
      blockTime: 12 + congestionLevel * 8, // 12-20 seconds
      congestion: congestionLevel < 0.3 ? "low" : congestionLevel < 0.7 ? "medium" : "high",
      timestamp: Date.now(),
    }
  }

  // Delegate to original API
  async getPools() {
    return mockApi.getPools()
  }

  async getPool(token: string) {
    return mockApi.getPool(token)
  }

  async swap(tokenA: string, tokenB: string, amountIn: string) {
    return mockApi.swap(tokenA, tokenB, amountIn)
  }
}

export const enhancedMockApi = new EnhancedMockApi()
