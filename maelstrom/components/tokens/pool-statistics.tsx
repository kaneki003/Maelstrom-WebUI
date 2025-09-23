"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, History, PieChart, ArrowUpRight } from "lucide-react"
import type { PoolData } from "@/lib/mock-api"

interface PoolStatisticsProps {
  poolData: PoolData
}

export function PoolStatistics({ poolData }: PoolStatisticsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold font-clash-display">Pool Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Value Locked */}
        <Card className="relative overflow-hidden">
          {/* Glass morphism effects */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />

          <CardContent className="relative p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <PieChart className="h-4 w-4 text-accent" />
                </div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Value Locked</h4>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-accent/10 text-accent"
              >
                +{poolData.liquidityChange24h.toFixed(2)}%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                {poolData.totalValue}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Up from {poolData.tokenReserves.eth.value} last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7d Volume */}
        <Card className="relative overflow-hidden">
          {/* Glass morphism effects */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />

          <CardContent className="relative p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <History className="h-4 w-4 text-emerald-500" />
                </div>
                <h4 className="text-sm font-medium text-muted-foreground">7d Trading Volume</h4>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-emerald-500/10 text-emerald-500"
              >
                Active
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                {poolData.poolStatistics.volume7d !== "N/A" ? poolData.poolStatistics.volume7d : "Coming Soon"}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <span className="text-muted-foreground">Projected {poolData.estimatedAPR} APR</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fees Collected */}
        <Card className="relative overflow-hidden">
          {/* Glass morphism effects */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />

          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Fees Collected</h4>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In ETH</p>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                  {poolData.poolStatistics.totalFeesCollected.eth}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">In {poolData.symbol}</p>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                  {poolData.poolStatistics.totalFeesCollected.token}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pool Age & Performance */}
        <Card className="relative overflow-hidden">
          {/* Glass morphism effects */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />

          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <History className="h-4 w-4 text-blue-500" />
                </div>
                <h4 className="text-sm font-medium text-muted-foreground">Pool Performance</h4>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pool Age</p>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                  {poolData.poolStatistics.poolAge}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Trading Fee</p>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                  {poolData.tradingFee}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
