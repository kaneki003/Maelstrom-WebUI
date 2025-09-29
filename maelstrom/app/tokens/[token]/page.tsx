"use client"

import { Header } from "@/components/header"
import { TokenHeader } from "@/components/tokens/token-header"
import { TokenPairStats } from "@/components/tokens/token-pair-stats"
import { LiquidityBreakdown } from "@/components/tokens/liquidity-breakdown"
import { LiquidityActions } from "@/components/tokens/liquidity-actions"
import { PriceCharts } from "@/components/tokens/price-charts"
import { TokenPageSkeleton } from "@/components/tokens/token-page-skeleton"
import { DAI_MOCK, getPoolData, Token, TOKEN_MAP } from "@/lib/mock-api"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface TokenPageProps {
  tokenn: string
}

export default function TokenPage({tokenn}: TokenPageProps) {
  const [poolData, setPoolData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tokenData, setTokenData] = useState<Token>(DAI_MOCK)

  const params = useParams();
  const token = params.token as string;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getPoolData(token.toLowerCase())
        setTokenData(TOKEN_MAP.get(token.toUpperCase())!)
        setPoolData(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  return (
    <div className="min-h-screen relative bg-gradient-pattern overflow-hidden ">
      {/* Enhanced background effects */}
            
      <Header />
      <main className="container relative mx-auto px-4 py-8">
        {loading ? (
          <TokenPageSkeleton />
        ) : (
          <div className="space-y-8">
            <TokenHeader token={tokenData} />
            
            {/* Token Pair Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
              <TokenPairStats poolData={poolData} />
            </div>

            {/* Liquidity Breakdown & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in" style={{ '--delay': '200ms' } as any}>
              <LiquidityBreakdown poolData={poolData} />
              <LiquidityActions 
                token={tokenData}
                tokenBalance="1000"
                ethBalance="10"
                lpTokenBalance="100"
              />
            </div>

            {/* Price Charts */}
            <div className="animate-fade-in" style={{ '--delay': '600ms' } as any}>
              <PriceCharts token={tokenData} poolData={poolData} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
