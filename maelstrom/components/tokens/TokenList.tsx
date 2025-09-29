"use client";

import { TokenRow } from "./TokenRow";
import { TokenRowSkeleton } from "./TokenRowSkeleton";
import { TokenSearchBar } from "./TokenSearchBar";
import { usePools } from "@/hooks/use-pools";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 20;

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
    setAutoRefresh,
  } = usePools();

  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [search, sort, filter]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-red-400 mb-4">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (loading && pools.length === 0) {
    return (
      <div className="space-y-3 animate-fade-in">
        {Array.from({ length: 5 }).map((_, i) => (
          <TokenRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pools.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <TokenSearchBar onSearch={setSearch} />
        </div>
        <div className="relative flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center space-y-4 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground/90">
              {search ? "No matches found" : "No pools available"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {search
                ? "Try adjusting your search terms"
                : "Check back later for new liquidity pools"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const displayedPools = pools.slice(0, displayCount);
  const hasMore = displayCount < pools.length;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Search Bar */}
      <div className="mb-6">
        <TokenSearchBar onSearch={setSearch} />
      </div>

      {/* Pool List */}
      <div className="space-y-3">
        {displayedPools.map((pool, index) => (
          <div
            key={pool.slug}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TokenRow token={pool} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={() => setDisplayCount((prev) => prev + ITEMS_PER_PAGE)}
            className="min-w-[200px] bg-blue-950/30 hover:bg-blue-950/50 border-blue-500/20"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              `Load More (${pools.length - displayCount} remaining)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
