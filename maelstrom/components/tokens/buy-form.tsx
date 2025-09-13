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
import { Calculator, Info, Zap } from "lucide-react"

interface BuyFormProps {
  token: string
}

export function BuyForm({ token }: BuyFormProps) {
  const [ethAmount, setEthAmount] = useState("")
  const [slippage, setSlippage] = useState([0.5])
  const [deadline, setDeadline] = useState("20")
  const [showPreview, setShowPreview] = useState(false)
  const [estimatedOutput, setEstimatedOutput] = useState("")
  const [priceImpact, setPriceImpact] = useState(0)

  const { pool } = usePool(token)
  const { executeBuy, loading } = useTrade()
  const { toast } = useToast()

  const calculateEstimate = (amount: string) => {
    if (!amount || !pool) return

    const ethAmountNum = Number.parseFloat(amount)
    const spotPrice = Number.parseFloat(pool.spotPrice) / 1e18
    const impact = Math.min(ethAmountNum / 100, 0.05) // Max 5% impact
    const output = ethAmountNum * spotPrice * (1 - impact)

    setEstimatedOutput(output.toFixed(2))
    setPriceImpact(impact * 100)
  }

  const handleAmountChange = (value: string) => {
    setEthAmount(value)
    calculateEstimate(value)
  }

  const handlePreview = () => {
    if (!ethAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an ETH amount to buy",
        // variant: "destructive",
      })
      return
    }
    setShowPreview(true)
  }

  const handleConfirmTrade = async () => {
    const result = await executeBuy(token, ethAmount)
    if (result) {
      toast({
        title: "Trade Successful!",
        description: `Bought ${Number.parseFloat(result.amountOut).toFixed(2)} ${token.toUpperCase()}`,
      })
      setEthAmount("")
      setEstimatedOutput("")
      setShowPreview(false)
    }
  }

  if (!pool) return <div className="animate-pulse h-64 bg-muted rounded" />

  return (
    <>
      <div className="space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="eth-amount">ETH Amount</Label>
          <div className="relative">
            <Input
              id="eth-amount"
              type="number"
              placeholder="0.0"
              value={ethAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="text-lg h-12 pr-16"
              step="0.001"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="secondary">ETH</Badge>
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Balance: 2.4567 ETH</span>
            <Button variant="ghost" size="sm" onClick={() => handleAmountChange("1.0")} className="h-auto p-0">
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
                  <span className="font-semibold">
                    {estimatedOutput} {token.toUpperCase()}
                  </span>
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
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.1%</span>
              <span>5%</span>
            </div>
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
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-500 mb-1">How Buy Orders Work</p>
                <p className="text-muted-foreground">
                  Buy price starts above spot and linearly relaxes to spot over time. Your trade will nudge the price
                  anchor upward, affecting future trades.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button
          onClick={handlePreview}
          disabled={!ethAmount || loading}
          className="w-full h-12 bg-accent hover:bg-accent-cyan-2 text-accent-foreground glow-primary"
        >
          <Zap className="mr-2 h-4 w-4" />
          Preview Buy Order
        </Button>
      </div>

      <TradePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirmTrade}
        tradeType="buy"
        token={token}
        amountIn={ethAmount}
        amountOut={estimatedOutput}
        priceImpact={priceImpact}
        slippage={slippage[0]}
        loading={loading}
      />
    </>
  )
}
