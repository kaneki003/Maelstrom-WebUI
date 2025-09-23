"use client"

import { SmallSparkline } from "@/components/SmallSparkline"
import type { PoolMock } from "@/types/pool"
import { formatCurrency, formatPercentage } from "@/types/pool"
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
    liquidityUSD,
    lastExchangeTs,
  } = token

  // Calculate ETH prices based on USD price (assuming 1 ETH = $3000 for this example)
  const ETH_PRICE_USD = 3000
  const buyPriceETH = (priceUSD / ETH_PRICE_USD) * 1.02 // Adding 2% spread for buy price
  const sellPriceETH = (priceUSD / ETH_PRICE_USD) * 0.98 // Subtracting 2% spread for sell price
  const liquidityETH = liquidityUSD / ETH_PRICE_USD
  
  // Format timestamp to show only the highest unit
  const formatTimestamp = (ts: number) => {
    const now = Date.now()
    const diff = now - ts
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    const minutes = Math.floor(diff / (1000 * 60))

    if (days > 0) return `${days}d`
    if (hours > 0) return `${hours}h`
    return `${minutes}m`
  }

  return (
    <Link href={`/tokens/${slug}`}>
      <div className="group relative p-4 rounded-lg backdrop-blur-sm border border-white/[0.05] 
        hover:border-accent/20 transition-all duration-300
        before:absolute before:inset-0 before:bg-background-800/30 before:-z-10">
        <div className="flex items-center gap-4">
          {/* Token Logo */}
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 to-primary-500/10" />
            <div className="absolute inset-0 rounded-full backdrop-blur-sm overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt={symbol}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Token Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                {symbol}
              </span>
              <span className="text-sm text-muted-foreground/60">{name}</span>
            </div>
            <div className="mt-1 flex items-center gap-4">
              <span className="text-sm text-muted-foreground/70">
                {formatCurrency(buyPriceETH)} ETH
              </span>
              <span className="text-sm text-emerald-400">
                {formatPercentage(2.5)}%
              </span>
            </div>
          </div>

          {/* Price Chart */}
          <div className="hidden sm:block w-32 h-12">
            <SmallSparkline data={[/* Your chart data */]} />
          </div>

          {/* Liquidity */}
          <div className="hidden lg:block text-right">
            <div className="text-sm font-medium">
              {formatCurrency(liquidityETH)} ETH
            </div>
            <div className="text-xs text-muted-foreground/60">
              Liquidity
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors duration-200" />
        </div>

        {/* Hover gradient */}
        <div className="absolute inset-0 -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-gradient-to-r from-accent/5 via-transparent to-transparent rounded-lg" />
      </div>
    </Link>
  )
}
