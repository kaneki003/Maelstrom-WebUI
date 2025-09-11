"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePool } from "@/hooks/use-mock-api"
import { TrendingUp, TrendingDown, ExternalLink, Star } from "lucide-react"

interface TokenHeaderProps {
  token: string
}

export function TokenHeader({ token }: TokenHeaderProps) {
  const { pool, loading } = usePool(token)
  const [priceChange, setPriceChange] = useState(0)

  useEffect(() => {
    // Simulate price change
    setPriceChange((Math.random() - 0.5) * 10)
  }, [])

  if (loading || !pool) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-48 mb-4" />
        <div className="h-12 bg-muted rounded w-32" />
      </div>
    )
  }

  const spotPriceFormatted = (Number.parseFloat(pool.spotPrice) / 1e18).toFixed(0)
  const isPositive = priceChange >= 0

  return (
    <div className="space-y-6">
      {/* Token Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-lg font-bold text-accent">{pool.symbol.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 gradient-text">
              {pool.name}
              <Badge variant="secondary" className="text-xs">
                {pool.symbol}
              </Badge>
            </h1>
            <p className="text-muted-foreground">ERC-20 Token</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Watchlist
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Etherscan
          </Button>
        </div>
      </div>

      {/* Price Info */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Price</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {spotPriceFormatted} {pool.symbol}/ETH
                </span>
                <div className={`flex items-center gap-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">{Math.abs(priceChange).toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-xl font-semibold">${Number(pool.volume24h).toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Liquidity</p>
              <p className="text-xl font-semibold">${Number(pool.tvl).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
