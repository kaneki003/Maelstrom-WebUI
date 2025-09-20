"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface TokenChartProps {
  token: string
}

export function TokenChart({ token }: TokenChartProps) {
  const [timeRange, setTimeRange] = useState("1H")
  
  // Mock data - in real app this would come from an API
  const generateChartData = (points: number) => {
    const data = []
    const basePrice = 3200
    for (let i = 0; i < points; i++) {
      const time = new Date(Date.now() - (points - i) * 60000)
      const price = basePrice + Math.sin(i * 0.2) * 100 + Math.random() * 50
      data.push({
        time: time.toISOString(),
        price: price,
        formattedTime: time.toLocaleTimeString(),
      })
    }
    return data
  }

  const chartData = generateChartData(60)
  const currentPrice = chartData[chartData.length - 1]?.price || 0
  const firstPrice = chartData[0]?.price || 0
  const priceChange = ((currentPrice - firstPrice) / firstPrice) * 100
  const isPositive = priceChange >= 0

  const formatPrice = (price: number) => `$${price.toFixed(2)}`

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className={`flex items-center gap-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {isPositive ? "+" : ""}
                    {priceChange.toFixed(2)}%
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  24h
                </Badge>
              </div>
            </div>
            <div className="flex gap-1">
              {["1H", "4H", "1D", "1W", "1M"].map((range) => (
                <Button
                  key={range}
                  variant={range === timeRange ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(0, 216, 255)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="rgb(0, 216, 255)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="formattedTime"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                interval="preserveStartEnd"
              />
              <YAxis
                dataKey="price"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                domain={['auto', 'auto']}
                tickFormatter={formatPrice}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "6px",
                }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="rgb(0, 216, 255)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
