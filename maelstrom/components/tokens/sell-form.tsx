"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { TradePreviewModal } from "@/components/tokens/trade-preview-modal"
import { usePool, useTrade } from "@/hooks/use-mock-api"
import { useToast } from "@/hooks/use-toast"
import { Calculator, Info, AlertTriangle, TrendingDown } from "lucide-react"

interface SellFormProps {
  token: string
}

export function SellForm({ token }: SellFormProps) {
  const [tokenAmount, setTokenAmount] = useState("")
  const [slippage, setSlippage] = useState([0.5])
  const [deadline, setDeadline] = useState("20")
  const [showPreview, setShowPreview] = useState(false)
  const [estimatedOutput, setEstimatedOutput] = useState("")
  const [priceImpact, setPriceImpact] = useState(0)

  const { pool } = usePool(token)
  const { executeSell, loading } = useTrade()
  const { toast } = useToast()

  // Mock token balance
  const tokenBalance = "1250.50"

  const calculateEstimate = (amount: string) => {
    if (!amount || !pool) return

    const tokenAmountNum = Number.parseFloat(amount)
    const spotPrice = Number.parseFloat(pool.spotPrice) / 1e18
    const impact = Math.min((tokenAmountNum / Number.parseFloat(pool.tokenReserve)) * 1000, 0.05)
    const output = (tokenAmountNum / spotPrice) * (1 - impact)

    setEstimatedOutput(output.toFixed(4))
    setPriceImpact(impact * 100)
  }

  const handleAmountChange = (value: string) => {
    setTokenAmount(value)
    calculateEstimate(value)
  }

  const handlePreview = () => {
    if (!tokenAmount) {
      toast({
        title: "Invalid Amount",
        description: `Please enter a ${token.toUpperCase()} amount to sell`,
        // variant: "destructive",
      })
      return
    }
    setShowPreview(true)
  }

  const handleConfirmTrade = async () => {
    const result = await executeSell(token, tokenAmount)
    if (result) {
      toast({
        title: "Trade Successful!",
        description: `Sold ${tokenAmount} ${token.toUpperCase()} for ${Number.parseFloat(result.amountOut).toFixed(4)} ETH`,
      })
      setTokenAmount("")
      setEstimatedOutput("")
      setShowPreview(false)
    }
  }

  if (!pool) return <div className="animate-pulse h-64 bg-muted rounded" />

  const isLargeOrder = Number.parseFloat(tokenAmount) > Number.parseFloat(tokenBalance) * 0.5

  return (
    <>
      <div className="space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="token-amount">{token.toUpperCase()} Amount</Label>
          <div className="relative">
            <Input
              id="token-amount"
              type="number"
              placeholder="0.0"
              value={tokenAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="text-lg h-12 pr-20"
              step="0.01"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary">{token.toUpperCase()}</Badge>
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Balance: {tokenBalance} {token.toUpperCase()}
            </span>
            <Button variant="ghost" size="sm" onClick={() => handleAmountChange(tokenBalance)} className="h-auto p-0">
              Max
            </Button>
          </div>
        </div>

        {/* Estimated Output */}
        {estimatedOutput && (
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">You'll receive approximately:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{estimatedOutput} ETH</span>
                  <Calculator className="h-4 w-4 text-accent" />
                </div>
              </div>
              {priceImpact > 0 && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-accent/20">
                  <span className="text-xs text-muted-foreground">Price Impact:</span>
                  <span className={`text-xs ${priceImpact > 3 ? "text-red-500" : "text-yellow-500"}`}>
                    {priceImpact.toFixed(2)}%
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Large Order Warning */}
        {isLargeOrder && (
          <Card className="bg-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-500 mb-1">Large Order Warning</p>
                  <p className="text-muted-foreground">
                    You're selling more than 50% of your balance. Consider splitting into smaller orders to minimize
                    price impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Advanced Settings */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slippage">Slippage Tolerance</Label>
              <span className="text-sm text-muted-foreground">{slippage[0]}%</span>
            </div>
            <Slider
              id="slippage"
              min={0.1}
              max={5}
              step={0.1}
              value={slippage}
              onValueChange={setSlippage}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Transaction Deadline (minutes)</Label>
            <Input
              id="deadline"
              type="number"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="h-10"
              min="1"
              max="60"
            />
          </div>
        </div>

        {/* Info Box */}
        <Card className="bg-orange-500/5 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-orange-500 mb-1">How Sell Orders Work</p>
                <p className="text-muted-foreground">
                  Sell price starts below spot and linearly relaxes to spot over time. Your trade will nudge the price
                  anchor downward, affecting future trades.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button
          onClick={handlePreview}
          disabled={!tokenAmount || loading}
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
        >
          <TrendingDown className="mr-2 h-4 w-4" />
          Preview Sell Order
        </Button>
      </div>

      <TradePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirmTrade}
        tradeType="sell"
        token={token}
        amountIn={tokenAmount}
        amountOut={estimatedOutput}
        priceImpact={priceImpact}
        slippage={slippage[0]}
        loading={loading}
      />
    </>
  )
}
