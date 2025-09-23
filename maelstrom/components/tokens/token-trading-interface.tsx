"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { TokenChart } from "@/components/tokens/token-chart"

interface TokenTradingInterfaceProps {
  token: string
}

interface Pool {
  totalLiquidity: string
  poolRatio: string
  tradingFee: string
  estAPR: string
}

export function TokenTradingInterface({ token }: TokenTradingInterfaceProps) {
  const [activeTab, setActiveTab] = useState("buy")
  const [amount, setAmount] = useState("")

  // Mock pool data - in a real app this would come from your API
  const poolData: Pool = {
    totalLiquidity: "$148.37B",
    poolRatio: "0.0565",
    tradingFee: "5.00%",
    estAPR: "597.40%",
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <TokenChart token={token} />
      </div>
      <div className="lg:col-span-1 space-y-6">
        {/* Pool Stats */}
        <Card className="relative overflow-hidden border-border/50">
          {/* Glass background with gradient */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />

          <CardContent className="relative pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">Pool Ratio</p>
                <p className="text-lg font-bold font-clash-display text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
                  {poolData.poolRatio}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">Est. APR</p>
                <p className="text-lg font-bold text-emerald-400">{poolData.estAPR}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">Trading Fee</p>
                <p className="text-lg font-bold">{poolData.tradingFee}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium">Total Liquidity</p>
                <p className="text-lg font-bold">{poolData.totalLiquidity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Interface */}
        <Card className="relative overflow-hidden">
          {/* Glass background with gradient */}
          <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
          <div className="absolute inset-0 border border-white/[0.05] rounded-lg" />

          <CardContent className="relative p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-background-900/50 border border-white/[0.05]">
                <TabsTrigger
                  value="buy"
                  className="w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600/20 data-[state=active]:to-emerald-500/10 data-[state=active]:text-emerald-400"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Buy
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600/20 data-[state=active]:to-red-500/10 data-[state=active]:text-red-400"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Sell
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Amount in ETH</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pr-16 h-12 bg-background-900/50 border-white/[0.05] focus:ring-accent-500"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Badge variant="secondary" className="bg-background-800 text-accent-400">ETH</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Balance: 2.4567 ETH</span>
                      <span>≈ $7,864.32</span>
                    </div>
                  </div>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/[0.05]" />
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-card p-1 rounded-full border border-white/[0.05]">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">You'll Receive</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={(Number(amount) * 2500).toString()}
                        readOnly
                        className="pr-20 h-12 bg-background-900/50 border-white/[0.05]"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Badge variant="secondary" className="bg-background-800 text-accent-400">{token.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Price Impact: 0.05%</span>
                      <span>Min. Received: 2,497.5 {token.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-0 font-medium">
                  Buy {token.toUpperCase()}
                </Button>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4 mt-4">
                {/* Similar structure as buy tab but with token input first and ETH output */}
                {/* Adjust colors to use red theme for sell */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
