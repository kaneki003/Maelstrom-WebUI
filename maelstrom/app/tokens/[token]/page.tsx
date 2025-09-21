import { Header } from "@/components/header"
import { TokenHeader } from "@/components/tokens/token-header"
import { TokenPairStats } from "@/components/tokens/token-pair-stats"
import { LiquidityBreakdown } from "@/components/tokens/liquidity-breakdown"
import { LiquidityActions } from "@/components/tokens/liquidity-actions"
import { PoolStatistics } from "@/components/tokens/pool-statistics"
import { PriceCharts } from "@/components/tokens/price-charts"
import { getPoolData } from "@/lib/mock-api"

interface TokenPageProps {
  params: {
    token: string
  }
}

export default function TokenPage({ params }: TokenPageProps) {
  const poolData = getPoolData(params.token)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-900 to-background-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TokenHeader token={params.token} />
        
        {/* Token Pair Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <TokenPairStats poolData={poolData} />
        </div>

        {/* Liquidity Breakdown & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <LiquidityBreakdown poolData={poolData} />
          <LiquidityActions poolData={poolData} />
        </div>

        {/* Pool Statistics */}
        <div className="mt-6">
          <PoolStatistics poolData={poolData} />
        </div>

        {/* Price Charts */}
        <div className="mt-6">
          <PriceCharts token={params.token} poolData={poolData} />
        </div>
      </main>
    </div>
  )
}
