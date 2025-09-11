"use client"

import { useState, useEffect } from "react"
import { enhancedMockApi, type PriceUpdate, type TradeEvent } from "@/lib/enhanced-mock-api"

export function useRealTimePrices() {
  const [priceUpdates, setPriceUpdates] = useState<PriceUpdate[]>([])

  useEffect(() => {
    const unsubscribe = enhancedMockApi.onPriceUpdate((update) => {
      setPriceUpdates((prev) => [update, ...prev.slice(0, 49)]) // Keep last 50 updates
    })

    return unsubscribe
  }, [])

  return priceUpdates
}

export function useRealTimeTrades() {
  const [trades, setTrades] = useState<TradeEvent[]>([])

  useEffect(() => {
    const unsubscribe = enhancedMockApi.onTradeEvent((trade) => {
      setTrades((prev) => [trade, ...prev.slice(0, 19)]) // Keep last 20 trades
    })

    return unsubscribe
  }, [])

  return trades
}

export function useMarketStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const marketStats = await enhancedMockApi.getMarketStats()
        setStats(marketStats)
      } catch (error) {
        console.error("Failed to fetch market stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { stats, loading }
}
