"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePools } from "@/hooks/use-mock-api"
import { Search, ArrowUpDown, TrendingUp, TrendingDown, ExternalLink } from "lucide-react"

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

  if (loading) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Liquidity Pools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            Liquidity Pools
            <Badge variant="secondary" className="text-xs">
              {filteredAndSortedPools.length} pools
            </Badge>
          </CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20">
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("symbol")}
                    className="h-auto p-0 font-semibold"
                  >
                    Token
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("tvl")}
                    className="h-auto p-0 font-semibold"
                  >
                    TVL
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("volume24h")}
                    className="h-auto p-0 font-semibold"
                  >
                    24h Volume
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("apy")}
                    className="h-auto p-0 font-semibold"
                  >
                    APY
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPools.map((pool) => {
                const spotPrice = (Number.parseFloat(pool.spotPrice) / 1e18).toFixed(0)
                const priceChange = (Math.random() - 0.5) * 10 // Mock price change
                const isPositive = priceChange >= 0

                return (
                  <TableRow key={pool.token} className="hover:bg-muted/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-accent">{pool.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{pool.symbol}</p>
                          <p className="text-xs text-muted-foreground">{pool.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">${Number(pool.tvl).toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-green-500">+5.2%</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">${Number(pool.volume24h).toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-xs">
                          {isPositive ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span className={isPositive ? "text-green-500" : "text-red-500"}>
                            {isPositive ? "+" : ""}
                            {priceChange.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        {pool.apy.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">
                          {spotPrice} {pool.symbol}/ETH
                        </p>
                        <div className="flex items-center gap-1 text-xs">
                          {isPositive ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span className={isPositive ? "text-green-500" : "text-red-500"}>
                            {isPositive ? "+" : ""}
                            {priceChange.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/tokens/${pool.token}`}>Trade</a>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
