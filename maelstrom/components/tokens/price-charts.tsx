"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { PoolData } from "@/lib/mock-api"

interface PriceChartsProps {
  token: string
  poolData: PoolData
}

export function PriceCharts({ token, poolData }: PriceChartsProps) {
  const formatPrice = (price: number) => `$${price.toLocaleString()}`
  const isPositive = poolData.priceData.change24h >= 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Token/ETH Price Chart */}
      <Card className="bg-background-800/50 backdrop-blur border-blue-700/20">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>{token}/ETH</CardTitle>
                <Badge 
                  variant={isPositive ? "default" : "destructive"}
                  className={`${isPositive ? "bg-green-500/20 text-green-500" : ""}`}
                >
                  {isPositive ? "+" : ""}{poolData.priceData.change24h.toFixed(2)}%
                </Badge>
              </div>
              <p className="text-2xl font-bold mt-1">${poolData.priceData.current.toLocaleString()}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[240px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={poolData.priceData.history}>
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(0, 216, 255)" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="rgb(0, 216, 255)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatPrice}
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(3, 16, 24, 0.8)",
                    border: "1px solid rgba(11, 58, 102, 0.5)",
                    borderRadius: "6px",
                  }}
                  labelFormatter={(time) => new Date(time).toLocaleString()}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="rgb(0, 216, 255)"
                  strokeWidth={2}
                  fill="url(#gradientArea)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ETH/USD Price Chart */}
      <Card className="bg-background-800/50 backdrop-blur border-blue-700/20">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>ETH/USD</CardTitle>
                <Badge 
                  variant="default"
                  className="bg-green-500/20 text-green-500"
                >
                  +2.34%
                </Badge>
              </div>
              <p className="text-2xl font-bold mt-1">${poolData.priceData.ethPrice.toLocaleString()}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[240px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={poolData.priceData.history.map(h => ({ ...h, price: h.price * 2 }))}>
                <defs>
                  <linearGradient id="gradientArea2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(0, 216, 255)" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="rgb(0, 216, 255)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatPrice}
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(3, 16, 24, 0.8)",
                    border: "1px solid rgba(11, 58, 102, 0.5)",
                    borderRadius: "6px",
                  }}
                  labelFormatter={(time) => new Date(time).toLocaleString()}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="rgb(0, 216, 255)"
                  strokeWidth={2}
                  fill="url(#gradientArea2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
