"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePool } from "@/hooks/use-mock-api"
import { useToast } from "@/hooks/use-toast"
import { Plus, Minus, Droplets, Info } from "lucide-react"

interface LiquidityFormProps {
  token: string
}

export function LiquidityForm({ token }: LiquidityFormProps) {
  const [ethAmount, setEthAmount] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [lpAmount, setLpAmount] = useState("")
  const [activeTab, setActiveTab] = useState("deposit")

  const { pool } = usePool(token)
  const { toast } = useToast()

  // Mock LP balance
  const lpBalance = "0.0"

  const calculateTokenAmount = (ethValue: string) => {
    if (!ethValue || !pool) return

    const ethNum = Number.parseFloat(ethValue)
    const ratio = Number.parseFloat(pool.spotPrice) / 1e18
    const tokenNeeded = ethNum * ratio

    setTokenAmount(tokenNeeded.toFixed(2))
  }

  const handleEthAmountChange = (value: string) => {
    setEthAmount(value)
    calculateTokenAmount(value)
  }

  const handleDeposit = () => {
    if (!ethAmount || !tokenAmount) {
      toast({
        title: "Invalid Amounts",
        description: "Please enter both ETH and token amounts",
        // variant: "destructive",
      })
      return
    }

    toast({
      title: "Liquidity Added!",
      description: `Added ${ethAmount} ETH and ${tokenAmount} ${token.toUpperCase()} to the pool`,
    })
    setEthAmount("")
    setTokenAmount("")
  }

  const handleWithdraw = () => {
    if (!lpAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter LP token amount to withdraw",
        // variant: "destructive",
      })
      return
    }

    toast({
      title: "Liquidity Withdrawn!",
      description: `Withdrew ${lpAmount} LP tokens from the pool`,
    })
    setLpAmount("")
  }

  if (!pool) return <div className="animate-pulse h-64 bg-muted rounded" />

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="flex items-center gap-2">
            <Minus className="h-4 w-4" />
            Withdraw
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="mt-6 space-y-6">
          {/* ETH Amount */}
          <div className="space-y-2">
            <Label htmlFor="eth-deposit">ETH Amount</Label>
            <div className="relative">
              <Input
                id="eth-deposit"
                type="number"
                placeholder="0.0"
                value={ethAmount}
                onChange={(e) => handleEthAmountChange(e.target.value)}
                className="text-lg h-12 pr-16"
                step="0.001"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Badge variant="secondary">ETH</Badge>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Balance: 2.4567 ETH</span>
              <Button variant="ghost" size="sm" onClick={() => handleEthAmountChange("1.0")} className="h-auto p-0">
                Max
              </Button>
            </div>
          </div>

          {/* Token Amount */}
          <div className="space-y-2">
            <Label htmlFor="token-deposit">{token.toUpperCase()} Amount</Label>
            <div className="relative">
              <Input
                id="token-deposit"
                type="number"
                placeholder="0.0"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                className="text-lg h-12 pr-20"
                step="0.01"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Badge variant="secondary">{token.toUpperCase()}</Badge>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Balance: 1250.50 {token.toUpperCase()}</span>
              <span>
                Required ratio: 1 ETH = {(Number.parseFloat(pool.spotPrice) / 1e18).toFixed(0)} {token.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Pool Share Preview */}
          {ethAmount && tokenAmount && (
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pool Share:</span>
                    <span className="font-semibold">~0.15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">LP Tokens:</span>
                    <span className="font-semibold">~{(Number.parseFloat(ethAmount) * 10).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Est. APY:</span>
                    <span className="font-semibold text-green-500">{pool.apy}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={handleDeposit}
            disabled={!ethAmount || !tokenAmount}
            className="w-full h-12 bg-accent hover:bg-accent-cyan-2 text-accent-foreground glow-primary"
          >
            <Droplets className="mr-2 h-4 w-4" />
            Add Liquidity
          </Button>
        </TabsContent>

        <TabsContent value="withdraw" className="mt-6 space-y-6">
          {/* LP Amount */}
          <div className="space-y-2">
            <Label htmlFor="lp-amount">LP Token Amount</Label>
            <div className="relative">
              <Input
                id="lp-amount"
                type="number"
                placeholder="0.0"
                value={lpAmount}
                onChange={(e) => setLpAmount(e.target.value)}
                className="text-lg h-12 pr-16"
                step="0.001"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Badge variant="secondary">LP</Badge>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Balance: {lpBalance} LP</span>
              <Button variant="ghost" size="sm" onClick={() => setLpAmount(lpBalance)} className="h-auto p-0">
                Max
              </Button>
            </div>
          </div>

          {/* Withdrawal Preview */}
          {lpAmount && Number.parseFloat(lpAmount) > 0 && (
            <Card className="bg-orange-500/5 border-orange-500/20">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">You'll receive:</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ETH:</span>
                    <span className="font-semibold">{(Number.parseFloat(lpAmount) * 0.1).toFixed(4)} ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{token.toUpperCase()}:</span>
                    <span className="font-semibold">
                      {(Number.parseFloat(lpAmount) * 320).toFixed(2)} {token.toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={handleWithdraw}
            disabled={!lpAmount || Number.parseFloat(lpAmount) === 0}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Minus className="mr-2 h-4 w-4" />
            Remove Liquidity
          </Button>
        </TabsContent>
      </Tabs>

      {/* Info Box */}
      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-500 mb-1">Liquidity Provider Rewards</p>
              <p className="text-muted-foreground">
                Earn fees from all trades in this pool. Your share of fees is proportional to your share of the pool.
                Current APY: {pool.apy}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
