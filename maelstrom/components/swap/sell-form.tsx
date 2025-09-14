"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TokenSelector, ExchangeRates } from "./token-selector"
import { SwapPreviewModal } from "@/components/swap/swap-preview-modal"
import { useTrade } from "@/hooks/use-mock-api"
import { useToast } from "@/hooks/use-toast"
import { ArrowDownUp } from "lucide-react"

interface SellFormProps {
  onExecute: (amount: string, token: string) => void
}

export function SellForm({ onExecute }: SellFormProps) {
  const [usdAmount, setUsdAmount] = useState("")
  const [token, setToken] = useState<keyof ExchangeRates>("eth")
  const [tokenAmount, setTokenAmount] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [priceImpact, setPriceImpact] = useState(0)
  const [isUsdInput, setIsUsdInput] = useState(false)
  const { executeSwap, loading } = useTrade()
  const { toast } = useToast()

  // Mock exchange rates (use real rates in production)
  const exchangeRates: ExchangeRates = {
    eth: 3200,
    dai: 1,
    usdc: 1,
    wbtc: 67500,
  }

  const handleUsdAmountChange = (value: string) => {
    setUsdAmount(value)
    const amount = Number(value) / exchangeRates[token]
    setTokenAmount(amount.toFixed(6))
  }

  const handleTokenAmountChange = (value: string) => {
    setTokenAmount(value)
    const amount = Number(value) * exchangeRates[token]
    setUsdAmount(amount.toFixed(2))
    // Calculate price impact (1% for every X tokens depending on the token)
    const impactMultiplier = token === "wbtc" ? 0.1 : (token === "eth" ? 1 : 1000)
    setPriceImpact(Math.min((Number(value) / impactMultiplier), 3))
  }

  const handleInputChange = (value: string) => {
    if (isUsdInput) {
      handleUsdAmountChange(value)
    } else {
      handleTokenAmountChange(value)
    }
  }

  const handleSwapInputType = () => {
    setIsUsdInput(!isUsdInput)
  }

  const handlePreview = () => {
    if (!usdAmount || !tokenAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount to sell",
      });
      return;
    }
    setShowPreview(true);
  }

  const handleConfirmSell = async () => {
    let result;
    
    if (isUsdInput) {
      // If user is using USD as input, they're buying the token
      result = await executeSwap("usdc", token, usdAmount);
      
      if (result) {
        toast({
          title: "Purchase Successful!",
          description: `Bought ${tokenAmount} ${token.toUpperCase()} for $${usdAmount}`,
        });
      }
    } else {
      // If user is using token as input, they're selling the token
      result = await executeSwap(token, "usdc", tokenAmount);
      
      if (result) {
        toast({
          title: "Sale Successful!",
          description: `Sold ${tokenAmount} ${token.toUpperCase()} for $${usdAmount}`,
        });
      }
    }
    
    if (result) {
      setUsdAmount("");
      setTokenAmount("");
      setShowPreview(false);
      onExecute(isUsdInput ? usdAmount : tokenAmount, token);
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{isUsdInput ? "You'll receive" : "You're selling"}</span>
          <button 
            onClick={handleSwapInputType}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="relative flex items-center justify-between gap-4">
          {isUsdInput && <span className="text-5xl font-medium mr-1">$</span>}
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={isUsdInput ? usdAmount : tokenAmount}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full bg-transparent text-5xl font-medium outline-none placeholder:text-muted-foreground/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {!isUsdInput && (
            <div>
              <TokenSelector selectedToken={token} onTokenChange={setToken} />
            </div>
          )}
        </div>
      </div>

      <div className="relative bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{isUsdInput ? "You're selling" : "You'll receive"}</span>
        </div>
        <div className="relative flex items-center">
          {!isUsdInput && <span className="text-5xl font-medium mr-1">$</span>}
          <div className="text-5xl font-medium w-full">
            {isUsdInput ? tokenAmount || '0' : usdAmount || '0'}
          </div>
          {isUsdInput && <div className="text-xl font-medium ml-2">{token.toUpperCase()}</div>}
        </div>
      </div>

      <Button
        onClick={handlePreview}
        disabled={!usdAmount || !tokenAmount}
        className="w-full h-14 mt-2 bg-accent hover:bg-accent/90 text-white font-medium rounded-2xl text-base"
      >
        {isUsdInput ? "Preview Purchase" : "Review Sell Order"}
      </Button>

      <SwapPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirmSell}
        tokenA={isUsdInput ? "usdc" : token}
        tokenB={isUsdInput ? token : "usdc"}
        amountA={isUsdInput ? usdAmount : tokenAmount}
        amountB={isUsdInput ? tokenAmount : usdAmount}
        priceImpact={priceImpact}
        loading={loading}
      />
    </div>
  )
}
