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
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Liquidity</p>
                <p className="text-lg font-bold">{poolData.totalLiquidity}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pool Ratio</p>
                <p className="text-lg font-bold">{poolData.poolRatio}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Trading Fee</p>
                <p className="text-lg font-bold">{poolData.tradingFee}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Est. APR</p>
                <p className="text-lg font-bold">{poolData.estAPR}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Trading Interface */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Trade {token.toUpperCase()}</span>
              <Badge variant="secondary" className="text-xs">
                Best Price
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="buy" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Buy
                </TabsTrigger>
                <TabsTrigger value="sell" className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Sell
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>You Pay</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-sm font-medium">
                        ETH
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label>You Receive</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={amount ? (Number(amount) * 500).toString() : ""}
                        readOnly
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-sm font-medium">
                        {token.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Connect Wallet to Trade
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="sell" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>You Pay</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-sm font-medium">
                        {token.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label>You Receive</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={amount ? (Number(amount) / 500).toString() : ""}
                        readOnly
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-sm font-medium">
                        ETH
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Connect Wallet to Trade
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
