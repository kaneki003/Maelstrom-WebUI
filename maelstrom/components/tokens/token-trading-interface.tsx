"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BuyForm } from "@/components/tokens/buy-form"
import { SellForm } from "@/components/tokens/sell-form"
import { LiquidityForm } from "@/components/tokens/liquidity-form"
import { TrendingUp, TrendingDown, Droplets } from "lucide-react"

interface TokenTradingInterfaceProps {
  token: string
}

export function TokenTradingInterface({ token }: TokenTradingInterfaceProps) {
  const [activeTab, setActiveTab] = useState("buy")

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Trade {token.toUpperCase()}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Pricing
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buy" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Sell
            </TabsTrigger>
            <TabsTrigger value="liquidity" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Liquidity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-6">
            <BuyForm token={token} />
          </TabsContent>

          <TabsContent value="sell" className="mt-6">
            <SellForm token={token} />
          </TabsContent>

          <TabsContent value="liquidity" className="mt-6">
            <LiquidityForm token={token} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
