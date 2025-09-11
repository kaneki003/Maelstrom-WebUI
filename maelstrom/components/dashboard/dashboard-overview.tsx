"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wallet, Droplets, DollarSign, Percent } from "lucide-react"

const overviewStats = [
  {
    title: "Total Portfolio Value",
    value: "$24,567.89",
    change: "+12.5%",
    changeValue: "+$2,741.23",
    icon: Wallet,
    positive: true,
  },
  {
    title: "Total Liquidity Provided",
    value: "$18,450.00",
    change: "+8.2%",
    changeValue: "+$1,398.50",
    icon: Droplets,
    positive: true,
  },
  {
    title: "24h Trading Volume",
    value: "$5,234.67",
    change: "-3.1%",
    changeValue: "-$167.89",
    icon: DollarSign,
    positive: false,
  },
  {
    title: "Average APY",
    value: "14.7%",
    change: "+2.3%",
    changeValue: "+0.34%",
    icon: Percent,
    positive: true,
  },
]

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewStats.map((stat, index) => (
        <Card
          key={stat.title}
          className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-accent" />
              </div>
              <Badge variant={stat.positive ? "default" : "destructive"} className="text-xs">
                {stat.change}
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <div className="flex items-center gap-1 text-sm">
                {stat.positive ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={stat.positive ? "text-green-500" : "text-red-500"}>{stat.changeValue}</span>
                <span className="text-muted-foreground">24h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
