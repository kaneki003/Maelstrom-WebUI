"use client"

import { Card } from "@/components/ui/card"
import { formatRelativeTime } from "@/types/pool"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const mockActivities = [
  {
    type: "Provide",
    token: "ETH/USDC",
    amount: "2.5 ETH",
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    isPositive: true,
  },
  {
    type: "Withdraw",
    token: "ETH/DAI",
    amount: "1.2 ETH",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    isPositive: false,
  },
  // Add more mock activities as needed
]

export function RecentActivity() {
  return (
    <div className="p-6">
      {/* Header with gradient text */}
      <h2 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
        Recent Activity
      </h2>

      {/* Activity List */}
      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <div
            key={index}
            className="relative group rounded-lg p-4 transition-all duration-200
              hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05]"
          >
            <div className="flex items-start gap-4">
              {/* Activity Icon */}
              <div className={`
                p-2 rounded-full 
                ${activity.isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'}
              `}>
                {activity.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm text-foreground">
                    {activity.type}
                  </p>
                  <span className="text-xs text-muted-foreground/60">
                    {formatRelativeTime(activity.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground/70">
                    {activity.token}
                  </span>
                  <span className="text-sm font-medium">
                    {activity.amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Effect Gradient */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-r from-accent/5 via-transparent to-transparent rounded-lg" />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 py-3 rounded-lg border border-white/[0.05] 
        bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-200
        text-sm text-muted-foreground/70 hover:text-white/90">
        View All Activity
      </button>
    </div>
  )
}
