"use client"

import { Header } from "@/components/header"
import { TokenHeader } from "@/components/tokens/token-header"
import { TokenPairStats } from "@/components/tokens/token-pair-stats"
import { LiquidityBreakdown } from "@/components/tokens/liquidity-breakdown"
import { LiquidityActions } from "@/components/tokens/liquidity-actions"
import { PriceCharts } from "@/components/tokens/price-charts"
import { TokenPageSkeleton } from "@/components/tokens/token-page-skeleton"
import { getPoolData } from "@/lib/mock-api"
import { useEffect, useState } from "react"

interface TokenPageProps {
  params: {
    token: string
  }
}

export default function TokenPage({ params }: TokenPageProps) {
  const [poolData, setPoolData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getPoolData(params.token)
        setPoolData(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.token])

  return (
    <div className="min-h-screen relative bg-gradient-pattern overflow-hidden ">
      {/* Enhanced background effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-background-900 via-background-800 to-background-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-cyan)/5%_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--primary-600)/5%_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_40%_50%,#000510,rgb(0,216,255,0.05),#000510)]" /> */}
      
      <Header />
      <main className="container relative mx-auto px-4 py-8">
        {loading ? (
          <TokenPageSkeleton />
        ) : (
          <div className="space-y-8">
            <TokenHeader token={params.token} />
            
            {/* Token Pair Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
              <TokenPairStats poolData={poolData} />
            </div>

            {/* Liquidity Breakdown & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in" style={{ '--delay': '200ms' } as any}>
              <LiquidityBreakdown poolData={poolData} />
              <LiquidityActions 
                tokenSymbol={params.token}
                tokenBalance="1000"
                ethBalance="10"
                lpTokenBalance="100"
              />
            </div>

            {/* Price Charts */}
            <div className="animate-fade-in" style={{ '--delay': '600ms' } as any}>
              <PriceCharts token={params.token} poolData={poolData} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
