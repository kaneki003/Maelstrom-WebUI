"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePool } from "@/hooks/use-mock-api"
import { Droplets, TrendingUp, Clock } from "lucide-react"

interface PoolInfoCardProps {
  token: string
}

export function PoolInfoCard({ token }: PoolInfoCardProps) {
  const { pool, loading } = usePool(token)

  if (loading || !pool) {
    return (
      <Card className="animate-pulse border-border/50">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-4 bg-muted rounded w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const buyPrice = (Number.parseFloat(pool.lastPriceBuyWAD) / 1e18).toFixed(0)
  const sellPrice = (Number.parseFloat(pool.lastPriceSellWAD) / 1e18).toFixed(0)
  const spotPrice = (Number.parseFloat(pool.spotPrice) / 1e18).toFixed(0)
  const ethReserve = (Number.parseFloat(pool.ethReserveWei) / 1e18).toFixed(1)
  const tokenReserve = (Number.parseFloat(pool.tokenReserve) / 1e18).toFixed(0)

  const timeSinceUpdate = Math.floor((Date.now() - pool.lastUpdated) / 60000)

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-accent" />
          Pool Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Buy Price</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-green-500">{buyPrice}</span>
              <Badge variant="outline" className="text-xs border-green-500/30 text-green-500">
                +{((Number.parseFloat(buyPrice) / Number.parseFloat(spotPrice) - 1) * 100).toFixed(1)}%
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Spot Price</span>
            <span className="font-semibold">{spotPrice}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sell Price</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-red-500">{sellPrice}</span>
              <Badge variant="outline" className="text-xs border-red-500/30 text-red-500">
                {((Number.parseFloat(sellPrice) / Number.parseFloat(spotPrice) - 1) * 100).toFixed(1)}%
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4 space-y-3">
          {/* Reserves */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">ETH Reserve</span>
            <span className="font-semibold">{ethReserve} ETH</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{pool.symbol} Reserve</span>
            <span className="font-semibold">
              {tokenReserve} {pool.symbol}
            </span>
          </div>

          {/* Volume & TVL */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">24h Volume</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="font-semibold">${Number(pool.volume24h).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Liquidity</span>
            <span className="font-semibold">${Number(pool.tvl).toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">APY</span>
            <span className="font-semibold text-accent">{pool.apy}%</span>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Last updated</span>
            </div>
            <span>{timeSinceUpdate}m ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
