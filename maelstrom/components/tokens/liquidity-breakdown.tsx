"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { PoolData } from "@/lib/mock-api"

interface LiquidityBreakdownProps {
  poolData: PoolData
}

export function LiquidityBreakdown({ poolData }: LiquidityBreakdownProps) {
  return (
    <Card className="relative overflow-hidden border-0">
      {/* Enhanced glass background */}
      <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
      <div className="absolute inset-0 border border-white/[0.05] rounded-lg bg-gradient-to-b from-white/[0.05] to-transparent" />
      
      <CardContent className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
            Liquidity Breakdown
          </h2>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-sm shadow-green-500/20"></div>
              <span className="text-green-400">APR: {poolData.estimatedAPR}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-blue-500/20"></div>
              <span className="text-cyan-400">Fee: {poolData.tradingFee}</span>
            </div>
          </div>
        </div>

        {/* First Token Tab */}
        <div className="p-4 rounded-lg bg-background-800/50 backdrop-blur-sm border border-white/[0.05] transition-colors hover:border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-primary-500 opacity-20 blur-sm" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-primary-500 flex items-center justify-center">
                  <span className="text-white">★</span>
                </div>
              </div>
              <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                {poolData.symbol}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground/80">Price:</span>
                <span className="text-sm font-medium">${poolData.priceData.current.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground/80">Amount:</span>
                <span className="text-sm font-medium">{poolData.tokenReserves.token.amount}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground/80">Value:</span>
                <span className="text-sm font-medium">{poolData.tokenReserves.token.value}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Progress Bar with enhanced styling */}
        <div className="h-2.5 w-full bg-background-800/50 rounded-full overflow-hidden my-4 backdrop-blur-sm">
          <div className="h-full flex">
            <div 
              className="h-full bg-gradient-to-r from-accent to-primary-500 transition-all duration-300"
              style={{ width: `${poolData.tokenReserves.token.percentage}%` }}
            />
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${poolData.tokenReserves.eth.percentage}%` }}
            />
          </div>
        </div>

        {/* Second Token Tab */}
        <div className="p-4 rounded-lg bg-background-800/50 backdrop-blur-sm border border-white/[0.05] transition-colors hover:border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-sm" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white">Ξ</span>
                </div>
              </div>
              <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                ETH
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground/80">Amount:</span>
                <span className="text-sm font-medium">{poolData.tokenReserves.eth.amount}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground/80">Value:</span>
                <span className="text-sm font-medium">{poolData.tokenReserves.eth.value}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Details with enhanced styling */}
        <div className="mt-6 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground/80">Pool Ratio:</span>
            <span className="font-medium">1 {poolData.symbol} = {poolData.poolRatio} ETH</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground/80">Total Value:</span>
            <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
              {poolData.totalValue}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
