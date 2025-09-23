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
      <div className="relative bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70 font-medium font-plus-jakarta">
            {isUsdInput ? "You'll receive" : "You're selling"}
          </span>
          <button
            onClick={handleSwapInputType}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/[0.05] bg-white/[0.02]"
          >
            <ArrowDownUp className="h-4 w-4 text-accent-cyan" />
          </button>
        </div>
        <div className="relative flex items-center bg-black/10 group-hover:bg-black/20 rounded-xl p-4 transition-all duration-300">
          {isUsdInput && <span className="text-4xl font-medium mr-2 font-plus-jakarta text-white/90">$</span>}
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={isUsdInput ? usdAmount : tokenAmount}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-white/20 
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              font-plus-jakarta text-white/90 transition-all duration-300"
          />
          {!isUsdInput && (
            <div className="ml-2">
              <TokenSelector selectedToken={token} onTokenChange={setToken} />
            </div>
          )}
        </div>
      </div>

      <div className="relative bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70 font-medium font-plus-jakarta">
            {isUsdInput ? "You're selling" : "You'll receive"}
          </span>
        </div>
        <div className="relative flex items-center bg-black/10 group-hover:bg-black/20 rounded-xl p-4 transition-all duration-300">
          {!isUsdInput && <span className="text-4xl font-medium mr-2 font-plus-jakarta text-white/90">$</span>}
          <div className="text-4xl font-medium w-full font-plus-jakarta text-white/90">
            {isUsdInput ? tokenAmount || "0" : usdAmount || "0"}
          </div>
          {isUsdInput && (
            <div className="ml-2">
              <TokenSelector selectedToken={token} onTokenChange={setToken} />
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handlePreview}
        disabled={!usdAmount || !tokenAmount || loading}
        className="w-full h-14 mt-6 bg-gradient-to-r from-accent-cyan to-primary-500 hover:from-accent-cyan/90 hover:to-primary-500/90 
          text-white font-semibold rounded-xl shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 
          disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed disabled:text-white/50
          border border-white/[0.05] backdrop-blur-sm font-plus-jakarta text-base"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
        ) : (
          isUsdInput ? "Preview Purchase" : "Review Sell Order"
        )}
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
  );
}
