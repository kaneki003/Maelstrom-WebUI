"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { PoolData } from "@/lib/mock-api"

interface TokenPairStatsProps {
  poolData: PoolData
}

export function TokenPairStats({ poolData }: TokenPairStatsProps) {
  const stats = [
    {
      label: "24h Volume",
      value: poolData.poolStatistics.volume24h,
      change: `${poolData.liquidityChange24h >= 0 ? "+" : ""}${poolData.liquidityChange24h.toFixed(1)}%`,
      positive: poolData.liquidityChange24h >= 0,
    },
    {
      label: "Total Liquidity",
      value: poolData.totalLiquidity,
      change: `${poolData.liquidityChange24h >= 0 ? "+" : ""}${poolData.liquidityChange24h.toFixed(1)}%`,
      positive: poolData.liquidityChange24h >= 0,
    },
    {
      label: "Price",
      value: `$${poolData.priceData.current.toFixed(2)}`,
      change: `${poolData.priceData.change24h >= 0 ? "+" : ""}${poolData.priceData.change24h.toFixed(1)}%`,
      positive: poolData.priceData.change24h >= 0,
    },
    {
      label: "Est. APR",
      value: poolData.estimatedAPR,
      change: "Live",
      positive: true,
    }
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <Badge variant={stat.positive ? "default" : "destructive"} className="text-xs">
                {stat.change}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              {stat.positive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
