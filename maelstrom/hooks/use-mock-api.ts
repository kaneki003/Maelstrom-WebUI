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
