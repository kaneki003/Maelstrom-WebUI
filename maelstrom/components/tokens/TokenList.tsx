"use client"

import { TokenRow } from "./TokenRow"
import { TokenRowSkeleton } from "./TokenRowSkeleton"
import { usePools } from "@/hooks/use-pools"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

const ITEMS_PER_PAGE = 20

export function TokenList() {
  const { 
    pools, 
    loading, 
    error, 
    search, 
    setSearch, 
    sort, 
    setSort, 
    filter, 
    setFilter, 
    autoRefresh, 
    setAutoRefresh 
  } = usePools()

  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [search, sort, filter])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  if (loading && pools.length === 0) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <TokenRowSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (pools.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mx-auto max-w-md space-y-4">
          <h3 className="text-lg font-semibold">No pools found</h3>
          <p className="text-muted-foreground">
            {search
              ? "Try adjusting your search or filters"
              : "No liquidity pools available at the moment"}
          </p>
        </div>
      </div>
    )
  }

  const displayedPools = pools.slice(0, displayCount)
  const hasMore = displayCount < pools.length

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {displayedPools.map((pool) => (
          <TokenRow key={pool.slug} token={pool} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={() => setDisplayCount(prev => prev + ITEMS_PER_PAGE)}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              `Load More (${pools.length - displayCount} remaining)`
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
