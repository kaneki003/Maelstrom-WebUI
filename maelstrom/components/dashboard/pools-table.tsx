"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePools } from "@/hooks/use-pools"
import { Search, ArrowUpDown, TrendingUp, TrendingDown, ExternalLink } from "lucide-react"
import { TokenRow } from "../tokens/TokenRow"
import { TokenRowSkeleton } from "../tokens/TokenRowSkeleton"

type SortField = "symbol" | "tvl" | "volume24h" | "apy"
type SortDirection = "asc" | "desc"

export function PoolsTable() {
  const { pools, loading } = usePools()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("tvl")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredAndSortedPools = pools
    .filter(
      (pool) =>
        pool.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pool.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      let aValue: number
      let bValue: number

      switch (sortField) {
        case "symbol":
          return sortDirection === "asc" ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol)
        case "tvl":
          aValue = Number.parseFloat(a.tvl)
          bValue = Number.parseFloat(b.tvl)
          break
        case "volume24h":
          aValue = Number.parseFloat(a.volume24h)
          bValue = Number.parseFloat(b.volume24h)
          break
        case "apy":
          aValue = a.apy
          bValue = b.apy
          break
        default:
          return 0
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    })

  return (
    <div className="p-6">
      {/* Table Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
          Your Active Pools
        </h2>
        <div className="text-sm text-muted-foreground/70">
          Total Pools: {pools.length}
        </div>
      </div>

      {/* Table Content with Glass Effect */}
      <div className="relative space-y-3">
        {loading ? (
          // Loading state with skeleton rows
          Array.from({ length: 3 }).map((_, i) => (
            <TokenRowSkeleton key={i} />
          ))
        ) : pools.length > 0 ? (
          // Pool list with hover effects
          pools.map((pool) => (
            <div
              key={pool.id}
              className="transform transition-all duration-200 hover:scale-[1.02] hover:shadow-glow-sm"
            >
              <TokenRow token={pool} />
            </div>
          ))
        ) : (
          // Empty state with glass effect
          <div className="relative rounded-lg p-8 text-center backdrop-blur-sm border border-white/[0.05]
            before:absolute before:inset-0 before:bg-background-800/30 before:-z-10">
            <p className="text-muted-foreground/70">No active pools found</p>
            <button className="mt-4 text-sm text-accent hover:text-accent-foreground transition-colors">
              Explore Available Pools
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
