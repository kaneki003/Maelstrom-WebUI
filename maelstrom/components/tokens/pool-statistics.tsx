"use client"

import { Card } from "@/components/ui/card"
import { CoinsIcon, Clock, BarChart2, History } from "lucide-react"
import type { PoolData } from "@/lib/mock-api"

interface PoolStatisticsProps {
  poolData: PoolData
}

export function PoolStatistics({ poolData }: PoolStatisticsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Fees */}
      <Card className="p-4 bg-background-800/50 backdrop-blur border-blue-700/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-700/20">
            <CoinsIcon className="h-5 w-5 text-cyan-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Fees Collected</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{poolData.poolStatistics.totalFeesCollected.token}</span>
                <span className="text-xs text-muted-foreground">{poolData.symbol}</span>
              </div>
              <span className="text-muted-foreground">+</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{poolData.poolStatistics.totalFeesCollected.eth}</span>
                <span className="text-xs text-muted-foreground">ETH</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 24h Volume */}
      <Card className="p-4 bg-background-800/50 backdrop-blur border-blue-700/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-700/20">
            <BarChart2 className="h-5 w-5 text-cyan-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-sm font-medium mt-1">{poolData.poolStatistics.volume24h}</p>
          </div>
        </div>
      </Card>

      {/* 7d Volume */}
      <Card className="p-4 bg-background-800/50 backdrop-blur border-blue-700/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-700/20">
            <History className="h-5 w-5 text-cyan-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">7d Volume</p>
            <p className="text-sm font-medium mt-1">{poolData.poolStatistics.volume7d}</p>
          </div>
        </div>
      </Card>

      {/* Pool Age */}
      <Card className="p-4 bg-background-800/50 backdrop-blur border-blue-700/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-700/20">
            <Clock className="h-5 w-5 text-cyan-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pool Age</p>
            <p className="text-sm font-medium mt-1">{poolData.poolStatistics.poolAge}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
