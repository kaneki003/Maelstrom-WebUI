"use client"

import { Header } from "@/components/header"
import { TokenList } from "@/components/tokens/TokenList"
import { TokenSearchBar } from "@/components/tokens/TokenSearchBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePools } from "@/hooks/use-pools"

export default function TokensPage() {
  const { pools, loading, search, setSearch, sort, setSort, filter, setFilter, autoRefresh, setAutoRefresh } = usePools()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-screen-xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-animated">Liquidity Pools</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse and interact with liquidity pools across the protocol, monitor performance, and find trading opportunities.
            </p>
          </div>

          {/* Main Content */}
          <Card className="border-blue-700/20 bg-background-800/50 backdrop-blur">
            <CardHeader className="border-b border-blue-700/20">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    All Pools
                  </h2>
                </div>
                <TokenSearchBar 
                  onSearch={setSearch}
                  onFilterChange={setFilter}
                  onAutoRefreshToggle={setAutoRefresh}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <TokenList />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
