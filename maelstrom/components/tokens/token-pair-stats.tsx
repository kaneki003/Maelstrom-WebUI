"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PoolData } from "@/lib/mock-api";

interface TokenPairStatsProps {
  poolData: PoolData;
}

export function TokenPairStats({ poolData }: TokenPairStatsProps) {
  const stats = [
    {
      label: "24h Volume",
      value: `${(
        Number(poolData.poolStatistics.volume24h.replace(/[^0-9.-]+/g, "")) /
        3000
      ).toFixed(2)} ETH`,
      change: `${
        poolData.liquidityChange24h >= 0 ? "+" : ""
      }${poolData.liquidityChange24h.toFixed(1)}%`,
      positive: poolData.liquidityChange24h >= 0,
    },
    {
      label: "Total Liquidity",
      value: `${(
        Number(poolData.totalLiquidity.replace(/[^0-9.-]+/g, "")) / 3000
      ).toFixed(2)} ETH`,
      change: `${
        poolData.liquidityChange24h >= 0 ? "+" : ""
      }${poolData.liquidityChange24h.toFixed(1)}%`,
      positive: poolData.liquidityChange24h >= 0,
    },
    {
      label: "Buy Price",
      value: `${(poolData.priceData.current * 1.02).toFixed(4)} ETH`,
      change: `${
        poolData.priceData.change24h >= 0 ? "+" : ""
      }${poolData.priceData.change24h.toFixed(1)}%`,
      positive: poolData.priceData.change24h >= 0,
    },
    {
      label: "Sell Price",
      value: `${(poolData.priceData.current * 0.98).toFixed(4)} ETH`,
      change: "Current",
      positive: true,
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="relative overflow-hidden border-0 group"
        >
          {/* Glass background with gradient */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />

          <CardContent className="relative p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground/80 font-medium">
                {stat.label}
              </p>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                {stat.value}
              </p>
              <Badge
                variant={stat.positive ? "default" : "destructive"}
                className={`text-xs font-medium px-2 py-0.5 ${
                  stat.positive
                    ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                    : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                }`}
              >
                {stat.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
