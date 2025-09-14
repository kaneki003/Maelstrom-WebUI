"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3, Maximize2 } from "lucide-react"

interface TokenChartProps {
  token: string
}

export function TokenChart({ token }: TokenChartProps) {
  // Mock chart data - in a real app, this would come from an API
  const chartData = Array.from({ length: 50 }, (_, i) => ({
    time: Date.now() - (50 - i) * 60000,
    price: 3200 + Math.sin(i * 0.2) * 100 + Math.random() * 50,
  }))

  const currentPrice = chartData[chartData.length - 1]?.price || 3200
  const previousPrice = chartData[chartData.length - 2]?.price || 3200
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100
  const isPositive = priceChange >= 0

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Price Chart
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
              {isPositive ? "+" : ""}
              {priceChange.toFixed(2)}%
            </Badge>
            <Button variant="ghost" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Simple SVG Chart */}
        <div className="relative h-48 bg-linear-to-b from-muted/20 to-transparent rounded-lg overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 216, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(0, 216, 255, 0.05)" />
              </linearGradient>
            </defs>

            {/* Price Line */}
            <path
              d={chartData
                .map((point, i) => {
                  const x = (i / (chartData.length - 1)) * 400
                  const y = 200 - ((point.price - 3100) / 200) * 200
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`
                })
                .join(" ")}
              stroke="rgba(0, 216, 255, 0.8)"
              strokeWidth="2"
              fill="none"
            />

            {/* Fill Area */}
            <path
              d={
                chartData
                  .map((point, i) => {
                    const x = (i / (chartData.length - 1)) * 400
                    const y = 200 - ((point.price - 3100) / 200) * 200
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`
                  })
                  .join(" ") + " L 400 200 L 0 200 Z"
              }
              fill="url(#priceGradient)"
            />
          </svg>

          {/* Price Labels */}
          <div className="absolute top-2 left-2 text-xs text-muted-foreground">${currentPrice.toFixed(0)}</div>
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">1H</div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            {["1H", "4H", "1D", "1W"].map((period) => (
              <Button key={period} variant={period === "1H" ? "secondary" : "ghost"} size="sm" className="text-xs">
                {period}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className={`h-4 w-4 ${isPositive ? "text-green-500" : "text-red-500"}`} />
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {isPositive ? "+" : ""}
              {priceChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
