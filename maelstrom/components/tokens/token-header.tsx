"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePool } from "@/hooks/use-mock-api"
import { TrendingUp, TrendingDown, ExternalLink, Star } from "lucide-react"
import type { PoolData } from "@/lib/mock-api"

interface TokenHeaderProps {
  token: string
  poolData?: PoolData
}

export function TokenHeader({ token }: TokenHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-cyan-600 flex items-center justify-center">
            <span className="text-lg font-bold">{token.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {token.toUpperCase()} / ETH
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs border-blue-700/20">
                {token.toUpperCase()}-ETH Pool
              </Badge>
              <div className="flex items-center gap-1 text-xs text-foreground/60">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Live data
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
