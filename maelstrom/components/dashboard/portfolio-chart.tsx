"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3 } from "lucide-react"

const timeframes = ["1D", "1W", "1M", "3M", "1Y"]

export function PortfolioChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1W")

  // Mock chart data
  const generateChartData = (days: number) => {
    const data = []
    const baseValue = 20000
    for (let i = 0; i < days; i++) {
      const value = baseValue + Math.sin(i * 0.1) * 2000 + Math.random() * 1000
      data.push({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000),
        value,
      })
    }
    return data
  }

  const chartData = generateChartData(30)
  const currentValue = chartData[chartData.length - 1]?.value || 24567
  const previousValue = chartData[chartData.length - 2]?.value || 24000
  const change = ((currentValue - previousValue) / previousValue) * 100
  const isPositive = change >= 0

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-accent" />
            <div>
              <CardTitle>Portfolio Performance</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">${currentValue.toLocaleString()}</span>
                <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
                  {isPositive ? "+" : ""}
                  {change.toFixed(2)}%
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                className="text-xs"
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-gradient-to-b from-muted/20 to-transparent rounded-lg overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 800 250" preserveAspectRatio="none">
            <defs>
              <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 216, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(0, 216, 255, 0.05)" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={50 + i * 40}
                x2="800"
                y2={50 + i * 40}
                stroke="rgba(148, 163, 184, 0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Portfolio Line */}
            <path
              d={chartData
                .map((point, i) => {
                  const x = (i / (chartData.length - 1)) * 800
                  const y = 250 - ((point.value - 18000) / 8000) * 200
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`
                })
                .join(" ")}
              stroke="rgba(0, 216, 255, 0.8)"
              strokeWidth="3"
              fill="none"
            />

            {/* Fill Area */}
            <path
              d={
                chartData
                  .map((point, i) => {
                    const x = (i / (chartData.length - 1)) * 800
                    const y = 250 - ((point.value - 18000) / 8000) * 200
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`
                  })
                  .join(" ") + " L 800 250 L 0 250 Z"
              }
              fill="url(#portfolioGradient)"
            />

            {/* Data Points */}
            {chartData.map((point, i) => {
              if (i % 5 === 0) {
                const x = (i / (chartData.length - 1)) * 800
                const y = 250 - ((point.value - 18000) / 8000) * 200
                return <circle key={i} cx={x} cy={y} r="3" fill="rgba(0, 216, 255, 0.8)" className="animate-pulse" />
              }
              return null
            })}
          </svg>

          {/* Value Labels */}
          <div className="absolute top-2 left-2 text-xs text-muted-foreground">$26K</div>
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">$18K</div>
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">{selectedTimeframe}</div>
        </div>

        {/* Portfolio Breakdown */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Invested</p>
            <p className="text-lg font-semibold">$22,450</p>
            <div className="flex items-center justify-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              <span>+9.4%</span>
            </div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Unrealized P&L</p>
            <p className="text-lg font-semibold text-green-500">+$2,117</p>
            <div className="flex items-center justify-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              <span>+9.4%</span>
            </div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <p className="text-sm text-muted-foreground">24h Change</p>
            <p className="text-lg font-semibold text-green-500">+$341</p>
            <div className="flex items-center justify-center gap-1 text-xs text-green-500">
              <TrendingUp className="h-3 w-3" />
              <span>+1.4%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
