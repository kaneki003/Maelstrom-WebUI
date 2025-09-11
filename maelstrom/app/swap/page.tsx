import { Header } from "@/components/header"
import { SwapInterface } from "@/components/swap/swap-interface"
import { SwapStats } from "@/components/swap/swap-stats"
import { RecentSwaps } from "@/components/swap/recent-swaps"

export default function SwapPage() {
  return (
    <div className="min-h-screen bg-background liquid-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-animated">Swap Tokens</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience seamless token swaps with our advanced liquidity mechanics and zero slippage trading.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Swap Interface */}
            <div className="lg:col-span-2">
              <SwapInterface />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              <SwapStats />
              <RecentSwaps />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
