"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Activity, Users } from "lucide-react"

const stats = [
  {
    label: "24h Volume",
    value: "$12.4M",
    change: "+8.2%",
    icon: DollarSign,
    positive: true,
  },
  {
    label: "Total Swaps",
    value: "1,247",
    change: "+12.5%",
    icon: Activity,
    positive: true,
  },
  {
    label: "Active Traders",
    value: "892",
    change: "+5.1%",
    icon: Users,
    positive: true,
  },
  {
    label: "Avg. Slippage",
    value: "0.12%",
    change: "-0.03%",
    icon: TrendingUp,
    positive: true,
  },
]

export function SwapStats() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <CardTitle className="text-lg">Swap Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
            <Badge variant={stat.positive ? "default" : "destructive"} className="text-xs">
              {stat.change}
            </Badge>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Live data updated every 30s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
