"use client";

import { Card } from "@/components/ui/card";
import { useMockData } from "@/hooks/use-mock-api";

export function DashboardOverview() {
  const { portfolioValue, totalLiquidity, activePools, estimatedApr, loading } =
    useMockData();

  const stats = [
    {
      label: "Portfolio Value",
      value: loading ? "..." : `${portfolioValue} ETH`,
      change: "+12.5%",
      isPositive: true,
    },
    {
      label: "Total Liquidity",
      value: loading ? "..." : `${totalLiquidity} ETH`,
      change: "+8.2%",
      isPositive: true,
    },
    {
      label: "Active Pools",
      value: loading ? "..." : activePools.toString(),
      change: "+3",
      isPositive: true,
    },
    {
      label: "Estimated APR",
      value: loading ? "..." : `${estimatedApr}%`,
      change: "+2.1%",
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="relative overflow-hidden border-0 group"
        >
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />
          <div className="relative z-10 p-6">
            {/* Value with gradient text */}
            <div
              className="text-2xl font-bold font-clash-display mb-1 text-transparent bg-clip-text bg-gradient-to-r 
              from-white to-white/90 group-hover:to-white/100 transition-colors"
            >
              {stat.value}
            </div>

            {/* Label with subtle opacity */}
            <div className="text-sm text-muted-foreground/70 mb-3">
              {stat.label}
            </div>

            {/* Change indicator with glow effect */}
            <div
              className={`
              inline-flex items-center text-sm font-medium rounded-full px-2.5 py-0.5
              ${
                stat.isPositive
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-red-400 bg-red-500/10"
              }
              transition-transform group-hover:scale-105
            `}
            >
              {stat.change}
            </div>

            {/* Decorative gradient corner */}
            <div
              className={`
              absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity
              group-hover:opacity-30
              ${stat.isPositive ? "bg-emerald-500" : "bg-red-500"}
            `}
            />
          </div>

          {/* Hover gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-gradient-to-r from-accent/5 via-transparent to-transparent"
          />
        </Card>
      ))}
    </div>
  );
}
