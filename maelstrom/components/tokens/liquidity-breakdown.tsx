"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { PoolData } from "@/lib/mock-api";

interface LiquidityBreakdownProps {
  poolData: PoolData;
}

export function LiquidityBreakdown({ poolData }: LiquidityBreakdownProps) {
  return (
    <Card className="relative overflow-hidden border-0 h-full flex flex-col">
      {/* Enhanced glass background */}
      <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
      <div className="absolute inset-0 border border-white/[0.05] rounded-lg bg-gradient-to-b from-white/[0.05] to-transparent" />

      <CardContent className="relative px-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 font-plus-jakarta">
              Pool Assets
            </h2>
          </div>

          {/* Enhanced metrics row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.02] rounded-2xl px-4 py-2 border border-white/[0.05] shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-sm shadow-green-500/20"></div>
                <span className="text-green-400 text-sm font-medium">
                  Estimated APR
                </span>
              </div>
              <span className="text-lg font-bold text-white">
                {poolData.estimatedAPR}
              </span>
            </div>
            <div className="bg-white/[0.02] rounded-2xl px-4 py-2 border border-white/[0.05] shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-blue-500/20"></div>
                <span className="text-cyan-400 text-sm font-medium">
                  Trading Fee
                </span>
              </div>
              <span className="text-lg font-bold text-white">
                {poolData.tradingFee}
              </span>
            </div>
          </div>
        </div>

        <div className="py-4 mb-4 flex items-center justify-around gap-4">
          <div className="bg-white/[0.02] rounded-2xl px-6 py-4 border border-white/[0.05] shadow-lg backdrop-blur-md w-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-primary-500 opacity-20 blur-sm" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-primary-500 flex items-center justify-center">
                  <span className="text-white text-lg">★</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 font-plus-jakarta">
                  {poolData.symbol}
                </span>
              </div>
            </div>
            <div className="bg-black/10 rounded-xl p-4 mb-3">
              <div className="text-sm text-muted-foreground/80 mb-1">
                Current Price
              </div>
              <div className="text-lg font-semibold text-white">
                $
                {poolData.priceData.current.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-black/10 rounded-xl p-4 mb-3">
              <div className="text-sm text-muted-foreground/80 mb-1">
                Amount
              </div>
              <div className="text-lg font-semibold text-white">
                {poolData.tokenReserves.token.amount}
              </div>
            </div>
            <div className="bg-black/10 rounded-xl p-4 mb-3">
              <div className="text-sm text-muted-foreground/80 mb-1">Value</div>
              <div className="text-lg font-semibold text-white">
                {poolData.tokenReserves.token.value}
              </div>
            </div>
          </div>
          <div className="bg-white/[0.02] rounded-2xl px-6 py-4 border border-white/[0.05] shadow-lg backdrop-blur-md w-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-sm" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-lg">E</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 font-plus-jakarta">
                  ETH
                </span>
              </div>
            </div>
            <div className="bg-black/10 rounded-xl p-4 mb-3">
              <div className="text-sm text-muted-foreground/80 mb-1">
                Current Price
              </div>
              <div className="text-lg font-semibold text-white">
                ${"4,008.92"}
              </div>
            </div>
            <div className="bg-black/10 rounded-xl p-4 mb-3">
              <div className="text-sm text-muted-foreground/80 mb-1">
                Amount
              </div>
              <div className="text-lg font-semibold text-white">
                {poolData.tokenReserves.eth.amount}
              </div>
            </div>
            <div className="bg-black/10 rounded-xl p-4 mb-3">
              <div className="text-sm text-muted-foreground/80 mb-1">Value</div>
              <div className="text-lg font-semibold text-white">
                {poolData.tokenReserves.eth.value}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative mb-2">
          <div className="h-4 w-full bg-background-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/[0.05]">
            <div className="h-full flex">
              <div
                className="h-full bg-gradient-to-r from-accent to-primary-500 transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${poolData.tokenReserves.token.percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${poolData.tokenReserves.eth.percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground/80">
            <span>
              {poolData.tokenReserves.token.percentage}% {poolData.symbol}
            </span>
            <span>{poolData.tokenReserves.eth.percentage}% ETH</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
