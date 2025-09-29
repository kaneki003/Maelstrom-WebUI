"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { PoolData, Token } from "@/lib/mock-api"

interface PriceChartsProps {
  token: Token
  poolData: PoolData
}

export function PriceCharts({ token, poolData }: PriceChartsProps) {
  const [timeRange, setTimeRange] = useState("1H")
  
  const generateChartData = (points: number) => {
    return poolData.priceData.history.map(point => {
      const basePrice = point.price / 3000 
      return {
        time: new Date(point.timestamp).toISOString(),
        buyPrice: basePrice * 1.02, 
        sellPrice: basePrice * 0.98, 
        formattedTime: new Date(point.timestamp).toLocaleTimeString(),
      }
    })
  }

  const chartData = generateChartData(60)
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buy Price Chart */}
        <Card className="relative overflow-hidden">
          {/* Glass morphism effects */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />
          
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-sm text-muted-foreground font-medium">Buy Price</h4>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
                  {chartData[chartData.length - 1]?.buyPrice.toFixed(4)} ETH
                </p>
              </div>
              <div className="flex gap-2">
                {["1H", "24H", "7D", "1M"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className={timeRange === range ? "bg-accent text-white" : "text-muted-foreground"}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="buyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity={0.2} />
                      <stop offset="99%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="formattedTime"
                    tick={{ fill: 'rgb(148, 163, 184)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fill: 'rgb(148, 163, 184)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value.toFixed(4)}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(17, 25, 40, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(16px)',
                    }}
                    labelStyle={{ color: 'rgb(148, 163, 184)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="buyPrice"
                    stroke="rgb(16, 185, 129)"
                    fill="url(#buyGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sell Price Chart */}
        <Card className="relative overflow-hidden">
          {/* Glass morphism effects */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />
          
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-sm text-muted-foreground font-medium">Sell Price</h4>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
                  {chartData[chartData.length - 1]?.sellPrice.toFixed(4)} ETH
                </p>
              </div>
              <div className="flex gap-2">
                {["1H", "24H", "7D", "1M"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className={timeRange === range ? "bg-accent text-white" : "text-muted-foreground"}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="sellGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity={0.2} />
                      <stop offset="99%" stopColor="rgb(239, 68, 68)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="formattedTime"
                    tick={{ fill: 'rgb(148, 163, 184)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fill: 'rgb(148, 163, 184)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value.toFixed(4)}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(17, 25, 40, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(16px)',
                    }}
                    labelStyle={{ color: 'rgb(148, 163, 184)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sellPrice"
                    stroke="rgb(239, 68, 68)"
                    fill="url(#sellGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
