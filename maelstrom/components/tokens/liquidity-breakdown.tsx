"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { PoolData } from "@/lib/mock-api"

interface LiquidityBreakdownProps {
  poolData: PoolData
}

export function LiquidityBreakdown({ poolData }: LiquidityBreakdownProps) {
  return (
    <Card className="bg-background-900/80 backdrop-blur">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold">Liquidity Breakdown</h2>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span>APR: {poolData.estimatedAPR}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              <span>Fee: {poolData.tradingFee}</span>
            </div>
          </div>
        </div>

        {/* First Token Tab */}
        <div className="p-4 rounded bg-background-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-7 h-7 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full flex items-center justify-center">
                  ★
                </div>
              </div>
              <span className="text-lg font-medium">EUCLID</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="text-sm">$116907.7946</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="text-sm">633.73K</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground">Value:</span>
                <span className="text-sm">$74.09B</span>
                <span className="text-sm text-green-500">(49.9%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Progress Bar */}
        <div className="h-2.5 w-full bg-background-800 rounded-full overflow-hidden my-4">
          <div className="h-full flex">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
              style={{ width: "49.9%" }}
            ></div>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
              style={{ width: "50.1%" }}
            ></div>
          </div>
        </div>

        {/* Second Token Tab */}
        <div className="p-4 rounded bg-background-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-violet-500 rounded-full flex items-center justify-center">
                  ◆
                </div>
              </div>
              <span className="text-lg font-medium">MON</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="text-sm">$2077096.1287</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="text-sm">35.78K</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground">Value:</span>
                <span className="text-sm">$74.31B</span>
                <span className="text-sm text-blue-400">(50.1%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Details */}
        <div className="mt-6 pt-4 border-t border-background-800/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Pool Ratio:</span>
            <span>1 EUCLID = 0.0565 MON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Value:</span>
            <span>$148.40B</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
