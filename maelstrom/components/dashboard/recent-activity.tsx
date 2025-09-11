"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, TrendingDown, Droplets, ArrowUpDown, Clock } from "lucide-react"

interface Activity {
  id: string
  type: "swap" | "buy" | "sell" | "liquidity_add" | "liquidity_remove"
  tokenA: string
  tokenB?: string
  amount: string
  value: string
  timestamp: number
  status: "completed" | "pending" | "failed"
}

const activities: Activity[] = [
  {
    id: "1",
    type: "swap",
    tokenA: "ETH",
    tokenB: "DAI",
    amount: "1.25 ETH",
    value: "$4,000",
    timestamp: Date.now() - 300000, // 5 minutes ago
    status: "completed",
  },
  {
    id: "2",
    type: "liquidity_add",
    tokenA: "USDC",
    tokenB: "ETH",
    amount: "2,000 USDC",
    value: "$4,000",
    timestamp: Date.now() - 1800000, // 30 minutes ago
    status: "completed",
  },
  {
    id: "3",
    type: "buy",
    tokenA: "WBTC",
    amount: "0.05 WBTC",
    value: "$3,375",
    timestamp: Date.now() - 3600000, // 1 hour ago
    status: "completed",
  },
  {
    id: "4",
    type: "sell",
    tokenA: "DAI",
    amount: "1,500 DAI",
    value: "$1,500",
    timestamp: Date.now() - 7200000, // 2 hours ago
    status: "completed",
  },
  {
    id: "5",
    type: "liquidity_remove",
    tokenA: "ETH",
    tokenB: "USDC",
    amount: "0.8 ETH",
    value: "$2,560",
    timestamp: Date.now() - 10800000, // 3 hours ago
    status: "completed",
  },
]

export function RecentActivity() {
  const formatTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "swap":
        return <ArrowUpDown className="h-4 w-4 text-accent" />
      case "buy":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "sell":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "liquidity_add":
      case "liquidity_remove":
        return <Droplets className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getActivityLabel = (activity: Activity) => {
    switch (activity.type) {
      case "swap":
        return `Swap ${activity.tokenA} → ${activity.tokenB}`
      case "buy":
        return `Buy ${activity.tokenA}`
      case "sell":
        return `Sell ${activity.tokenA}`
      case "liquidity_add":
        return `Add ${activity.tokenA}/${activity.tokenB} Liquidity`
      case "liquidity_remove":
        return `Remove ${activity.tokenA}/${activity.tokenB} Liquidity`
      default:
        return "Unknown Activity"
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{getActivityLabel(activity)}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{activity.amount}</span>
                <span>•</span>
                <span>{activity.value}</span>
                <span>•</span>
                <span>{formatTimeAgo(activity.timestamp)}</span>
              </div>
            </div>

            <Badge
              variant={
                activity.status === "completed"
                  ? "default"
                  : activity.status === "pending"
                    ? "secondary"
                    : "destructive"
              }
              className="text-xs"
            >
              {activity.status}
            </Badge>
          </div>
        ))}

        <div className="pt-2 border-t border-border/50">
          <Button variant="ghost" size="sm" className="w-full text-accent hover:text-accent-cyan-2">
            View All Activity
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
