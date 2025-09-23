"use client"

import { useState, useEffect } from "react"
import { mockApi, type Pool, type TradeResult } from "@/lib/mock-api"

export function usePools() {
  const [pools, setPools] = useState<Pool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPools = async () => {
    try {
      setLoading(true)
      const data = await mockApi.getPools()
      setPools(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pools")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPools()
  }, [])

  return { pools, loading, error, refetch: fetchPools }
}

export function usePool(token: string) {
  const [pool, setPool] = useState<Pool | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPool = async () => {
    try {
      setLoading(true)
      const data = await mockApi.getPool(token)
      setPool(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pool")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchPool()
    }
  }, [token])

  return { pool, loading, error, refetch: fetchPool }
}

export function useTrade() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeBuy = async (token: string, ethAmount: string): Promise<TradeResult | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await mockApi.buy(token, ethAmount)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : "Trade failed")
      return null
    } finally {
      setLoading(false)
    }
  }

  const executeSell = async (token: string, tokenAmount: string): Promise<TradeResult | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await mockApi.sell(token, tokenAmount)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : "Trade failed")
      return null
    } finally {
      setLoading(false)
    }
  }

  const executeSwap = async (tokenA: string, tokenB: string, amountIn: string): Promise<TradeResult | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await mockApi.swap(tokenA, tokenB, amountIn)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : "Swap failed")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { executeBuy, executeSell, executeSwap, loading, error }
}

interface DashboardData {
  portfolioValue: string
  totalLiquidity: string
  activePools: number
  estimatedApr: string
}

export function useMockData() {
  const [data, setData] = useState<DashboardData>({
    portfolioValue: "0.00",
    totalLiquidity: "0.00",
    activePools: 0,
    estimatedApr: "0.00"
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get pools to calculate statistics
      const pools = await mockApi.getPools()
      const activePools = pools.length
      
      // Calculate total liquidity across all pools
      const totalLiquidity = pools.reduce((sum, pool) => {
        const ethReserve = BigInt(pool.ethReserveWei)
        return sum + ethReserve
      }, BigInt(0))

      // Calculate user portfolio value (mock for now)
      const portfolioValue = totalLiquidity / BigInt(12) // Just an example fraction of total liquidity

      // Calculate average APY from pool data
      const avgApy = pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length

      setData({
        portfolioValue: (Number(portfolioValue) / 1e18).toFixed(2),
        totalLiquidity: (Number(totalLiquidity) / 1e18).toFixed(2),
        activePools,
        estimatedApr: avgApy.toFixed(1)
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return { ...data, loading, error, refetch: fetchDashboardData }
}