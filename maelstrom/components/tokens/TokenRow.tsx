"use client"

import { SmallSparkline } from "@/components/SmallSparkline"
import type { PoolMock } from "@/types/pool"
import { formatCurrency, formatPercentage, formatRelativeTime } from "@/types/pool"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface TokenRowProps {
  token: PoolMock;
}

export function TokenRow({ token }: TokenRowProps) {
  const {
    slug,
    symbol,
    name,
    logoUrl,
    priceUSD,
    priceChange24hPct,
    liquidityUSD,
    lastExchangeTs,
    priceHistory24h,
  } = token

  const isPositive = priceChange24hPct >= 0

  return (
    <Link
      href={`/tokens/${slug}`}
      className="group block"
      aria-label={`Open ${symbol} pool details, price ${formatCurrency(priceUSD)}`}
    >
      <div className="relative flex items-center gap-4 p-4 transition-all duration-200 hover:bg-blue-950/20 hover:backdrop-blur rounded-lg group-hover:-translate-y-[2px] group-focus:outline-none group-focus:ring-2 group-focus:ring-accent/50">
        {/* Hover effect - ripple overlay */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Logo & Name */}
        <div className="flex items-center gap-4 min-w-[240px]">
          <div className="h-10 w-10 rounded-full bg-blue-950/50 backdrop-blur flex items-center justify-center text-lg font-bold">
            {logoUrl ? (
              <img src={logoUrl} alt={symbol} className="h-8 w-8 rounded-full" />
            ) : (
              symbol.charAt(0)
            )}
          </div>
          <div>
            <div className="font-semibold">{symbol}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              {name}
              <span className="text-xs px-1 py-0.5 rounded bg-blue-950/30">/ ETH</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="min-w-[160px]">
          <div className="font-semibold">{formatCurrency(priceUSD)}</div>
          <div
            className={`text-sm ${isPositive ? "text-cyan-500" : "text-red-400"} flex items-center`}
          >
            {formatPercentage(priceChange24hPct)}
          </div>
        </div>

        {/* Total Liquidity */}
        <div className="min-w-[160px]">
          <div className="font-semibold">{formatCurrency(liquidityUSD)}</div>
        </div>

        {/* Last Exchange */}
        <div className="min-w-[120px]">
          <Tooltip>
            <TooltipTrigger>
              <div className="text-sm text-muted-foreground">
                {formatRelativeTime(lastExchangeTs)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {new Date(lastExchangeTs).toLocaleString()}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Sparkline */}
        <div className="flex-grow">
          <SmallSparkline 
            data={priceHistory24h} 
            positive={isPositive} 
            className="ml-auto"
          />
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </Link>
  )
}
