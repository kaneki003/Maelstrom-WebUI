"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TokenSelector } from "@/components/swap/token-selector"
import { SwapButton } from "@/components/swap/swap-button"
import { SwapPreviewModal } from "@/components/swap/swap-preview-modal"
import { SwapSettings } from "@/components/swap/swap-settings"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTrade } from "@/hooks/use-mock-api"
import { useToast } from "@/hooks/use-toast"
import { ArrowUpDown, Settings, Zap, Info } from "lucide-react"

interface SwapState {
  tokenA: string
  tokenB: string
  amountA: string
  amountB: string
}

export function SwapInterface() {
  const [swapState, setSwapState] = useState<SwapState>({
    tokenA: "eth",
    tokenB: "dai",
    amountA: "",
    amountB: "",
  })
  const [showPreview, setShowPreview] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [slippage, setSlippage] = useState(0.5)
  const [deadline, setDeadline] = useState(20)
  const [priceImpact, setPriceImpact] = useState(0)
  const [isSwapping, setIsSwapping] = useState(false)

  const { executeSwap, loading } = useTrade()
  const { toast } = useToast()
  const swapButtonRef = useRef<HTMLButtonElement>(null)

  // Mock exchange rates
  const exchangeRates: Record<string, Record<string, number>> = {
    eth: { dai: 3200, usdc: 3200, wbtc: 0.017 },
    dai: { eth: 0.0003125, usdc: 1, wbtc: 0.0000053 },
    usdc: { eth: 0.0003125, dai: 1, wbtc: 0.0000053 },
    wbtc: { eth: 58.8, dai: 188160, usdc: 188160 },
  }

  const calculateOutput = (inputAmount: string, fromToken: string, toToken: string) => {
    if (!inputAmount || !exchangeRates[fromToken]?.[toToken]) return ""

    const amount = Number.parseFloat(inputAmount)
    const rate = exchangeRates[fromToken][toToken]
    const impact = Math.min(amount / 100, 0.05) // Max 5% impact
    const output = amount * rate * (1 - impact)

    setPriceImpact(impact * 100)
    return output.toFixed(toToken === "wbtc" ? 6 : 2)
  }

  const handleAmountAChange = (value: string) => {
    setSwapState((prev) => ({
      ...prev,
      amountA: value,
      amountB: calculateOutput(value, prev.tokenA, prev.tokenB),
    }))
  }

  const handleAmountBChange = (value: string) => {
    setSwapState((prev) => ({
      ...prev,
      amountB: value,
      amountA: calculateOutput(value, prev.tokenB, prev.tokenA),
    }))
  }

  const handleTokenAChange = (token: string) => {
    setSwapState((prev) => {
      const newState = { ...prev, tokenA: token }
      if (prev.amountA) {
        newState.amountB = calculateOutput(prev.amountA, token, prev.tokenB)
      }
      return newState
    })
  }

  const handleTokenBChange = (token: string) => {
    setSwapState((prev) => {
      const newState = { ...prev, tokenB: token }
      if (prev.amountA) {
        newState.amountB = calculateOutput(prev.amountA, prev.tokenA, token)
      }
      return newState
    })
  }

  const handleSwapTokens = () => {
    setIsSwapping(true)
    setSwapState((prev) => ({
      tokenA: prev.tokenB,
      tokenB: prev.tokenA,
      amountA: prev.amountB,
      amountB: prev.amountA,
    }))

    // Trigger ripple animation
    if (swapButtonRef.current) {
      swapButtonRef.current.classList.add("animate-ripple")
      setTimeout(() => {
        swapButtonRef.current?.classList.remove("animate-ripple")
        setIsSwapping(false)
      }, 600)
    }
  }

  const handlePreviewSwap = () => {
    if (!swapState.amountA || !swapState.amountB) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount to swap",
        variant: "destructive",
      })
      return
    }
    setShowPreview(true)
  }

  const handleConfirmSwap = async () => {
    const result = await executeSwap(swapState.tokenA, swapState.tokenB, swapState.amountA)
    if (result) {
      toast({
        title: "Swap Successful!",
        description: `Swapped ${swapState.amountA} ${swapState.tokenA.toUpperCase()} for ${Number.parseFloat(result.amountOut).toFixed(4)} ${swapState.tokenB.toUpperCase()}`,
      })
      setSwapState((prev) => ({ ...prev, amountA: "", amountB: "" }))
      setShowPreview(false)
    }
  }

  const tokenASymbol = swapState.tokenA.toUpperCase()
  const tokenBSymbol = swapState.tokenB.toUpperCase()

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Swap Tokens
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token A Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">From</span>
              <span className="text-xs text-muted-foreground">Balance: 2.4567 {tokenASymbol}</span>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={swapState.amountA}
                onChange={(e) => handleAmountAChange(e.target.value)}
                className="text-xl h-16 pr-32 bg-muted/20 border-border/50"
                step="0.001"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <TokenSelector selectedToken={swapState.tokenA} onTokenChange={handleTokenAChange} />
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <SwapButton
              ref={swapButtonRef}
              onClick={handleSwapTokens}
              isAnimating={isSwapping}
              className="relative z-10"
            />
          </div>

          {/* Token B Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">To</span>
              <span className="text-xs text-muted-foreground">Balance: 1250.50 {tokenBSymbol}</span>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={swapState.amountB}
                onChange={(e) => handleAmountBChange(e.target.value)}
                className="text-xl h-16 pr-32 bg-muted/20 border-border/50"
                step="0.001"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <TokenSelector selectedToken={swapState.tokenB} onTokenChange={handleTokenBChange} />
              </div>
            </div>
          </div>

          {/* Swap Details */}
          {swapState.amountA && swapState.amountB && (
            <div className="space-y-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span>
                  1 {tokenASymbol} = {exchangeRates[swapState.tokenA]?.[swapState.tokenB]?.toFixed(2)} {tokenBSymbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price Impact</span>
                <span className={priceImpact > 3 ? "text-red-500" : "text-yellow-500"}>{priceImpact.toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Slippage Tolerance</span>
                <span>{slippage}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span>~$12.50</span>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-500 mb-1">Smart Routing</p>
              <p className="text-muted-foreground">
                Your swap is automatically routed through the most efficient path to minimize price impact and maximize
                output.
              </p>
            </div>
          </div>

          {/* Swap Action Button */}
          <Button
            onClick={handlePreviewSwap}
            disabled={!swapState.amountA || !swapState.amountB || loading}
            className="w-full h-14 text-lg bg-accent hover:bg-accent-cyan-2 text-accent-foreground glow-primary"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />
                Processing...
              </>
            ) : (
              <>
                <ArrowUpDown className="mr-2 h-5 w-5" />
                Preview Swap
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <SwapPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirmSwap}
        tokenA={swapState.tokenA}
        tokenB={swapState.tokenB}
        amountA={swapState.amountA}
        amountB={swapState.amountB}
        priceImpact={priceImpact}
        slippage={slippage}
        loading={loading}
      />

      <SwapSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        slippage={slippage}
        onSlippageChange={setSlippage}
        deadline={deadline}
        onDeadlineChange={setDeadline}
      />
    </>
  )
}
