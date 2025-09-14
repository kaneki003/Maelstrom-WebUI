import { Header } from "@/components/header"
import { TokenHeader } from "@/components/tokens/token-header"
import { TokenTradingInterface } from "@/components/tokens/token-trading-interface"
import { PoolInfoCard } from "@/components/tokens/pool-info-card"
import { LiquidityFlowWidget } from "@/components/tokens/liquidity-flow-widget"
import { TokenChart } from "@/components/tokens/token-chart"

interface TokenPageProps {
  params: {
    token: string
  }
}

export default function TokenPage({ params }: TokenPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TokenHeader token={params.token} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            <TokenTradingInterface token={params.token} />
            <TokenChart token={params.token} />
          </div>

          {/* Right Column - Pool Info & Liquidity Flow */}
          <div className="space-y-6">
            <PoolInfoCard token={params.token} />
            <LiquidityFlowWidget token={params.token} />
          </div>
        </div>
      </main>
    </div>
  )
}
