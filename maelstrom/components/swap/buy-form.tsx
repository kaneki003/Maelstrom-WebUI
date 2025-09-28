"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SwapPreviewModal } from "@/components/swap/swap-preview-modal";
import { useTrade } from "@/hooks/use-mock-api";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownUp } from "lucide-react";
import { ExchangeRates, TokenSelector } from "./token-selector";

interface BuyFormProps {
  onExecute: (amount: string) => void;
}

export function BuyForm({ onExecute }: BuyFormProps) {
  const [ethAmount, setEthAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [priceImpact, setPriceImpact] = useState(0);
  const [isEthInput, setIsEthInput] = useState(true);
  const { executeSwap, loading } = useTrade();
  const { toast } = useToast();
  const [token, setToken] = useState<keyof ExchangeRates>("dai");

  // Mock exchange rates (in ETH terms)
  const exchangeRates = {
    dai: 0.0003125, // 1 DAI = 0.0003125 ETH (1 ETH = 3200 DAI)
    usdc: 0.0003125, // 1 USDC = 0.0003125 ETH (1 ETH = 3200 USDC)
    wbtc: 21.09375, // 1 WBTC = 21.09375 ETH (1 ETH = 0.047407 WBTC)
  };

  const handleInputChange = (value: string) => {
    if (!isEthInput) {
      setTokenAmount(value);
      // Convert token to ETH amount
      const ethValue = Number(value) * exchangeRates[token];
      setEthAmount(ethValue.toFixed(6));
      // Calculate price impact (example: 1% for every 1000 token units)
      setPriceImpact(Math.min(Number(value) / 1000, 3));
    } else {
      setEthAmount(value);
      // Convert ETH to token amount
      const tokenValue = Number(value) / exchangeRates[token];
      setTokenAmount(tokenValue.toFixed(token === "wbtc" ? 6 : 2));
      // Calculate price impact based on ETH amount
      setPriceImpact(Math.min(Number(value) * 10, 3));
    }
  };

  const handleSwapInputType = () => {
    setIsEthInput(!isEthInput);
  };

  const handlePreview = () => {
    if (!ethAmount || !tokenAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount to swap",
      });
      return;
    }
    setShowPreview(true);
  };

  const handleConfirmBuy = async () => {
    let result;

    if (!isEthInput) {
      // User is inputting tokens (wants to buy ETH)
      result = await executeSwap(token, "eth", tokenAmount);

      if (result) {
        toast({
          title: "Swap Successful!",
          description: `Swapped ${tokenAmount} ${token.toUpperCase()} for ${ethAmount} ETH`,
        });
      }
    } else {
      // User is inputting ETH (wants to buy tokens)
      result = await executeSwap("eth", token, ethAmount);

      if (result) {
        toast({
          title: "Swap Successful!",
          description: `Swapped ${ethAmount} ETH for ${tokenAmount} ${token.toUpperCase()}`,
        });
      }
    }

    if (result) {
      setEthAmount("");
      setTokenAmount("");
      setShowPreview(false);
      onExecute(isEthInput ? ethAmount : tokenAmount);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70 font-medium font-plus-jakarta">
            You're {isEthInput ? "paying" : "receiving"}
          </span>
          <button
            onClick={handleSwapInputType}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/[0.05] bg-white/[0.02]"
          >
            <ArrowDownUp className="h-4 w-4 text-accent-cyan" />
          </button>
        </div>
        <div className="relative flex items-center bg-black/10 group-hover:bg-black/20 rounded-xl p-4 transition-all duration-300">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={isEthInput ? ethAmount : tokenAmount}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-white/20 
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              font-plus-jakarta text-white/90 transition-all duration-300"
          />
          {!isEthInput && (
            <div className="ml-2">
              <TokenSelector selectedToken={token} onTokenChange={setToken} />
            </div>
          )}
          {isEthInput && (
            <Button
              variant="ghost"
              className="h-10 px-3 hover:bg-accent/10 font-medium ml-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">E</span>
                </div>
                <span className="text-base">ETH</span>
              </div>
            </Button>
          )}
        </div>
      </div>

      <div className="relative bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70 font-medium font-plus-jakarta">
            You'll {isEthInput ? "receive" : "pay"}
          </span>
        </div>
        <div className="relative flex items-center bg-black/10 group-hover:bg-black/20 rounded-xl p-4 transition-all duration-300">
              <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={isEthInput ? tokenAmount : ethAmount}
              readOnly
              className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-white/20 
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                font-plus-jakarta text-white/90 transition-all duration-300"
              />
          {isEthInput && (
            <div className="ml-2">
              <TokenSelector selectedToken={token} onTokenChange={setToken} />
            </div>
          )}
          {!isEthInput && (
            <Button
              variant="ghost"
              className="h-10 px-3 hover:bg-accent/10 font-medium ml-2 flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">E</span>
                </div>
                <span className="text-base">ETH</span>
              </div>
            </Button>
          )}
        </div>
      </div>

      <Button
        onClick={handlePreview}
        disabled={!ethAmount || !tokenAmount || loading}
        className="w-full h-14 mt-6 bg-gradient-to-r from-accent-cyan to-primary-500 hover:from-accent-cyan/90 hover:to-primary-500/90 
          text-white font-semibold rounded-xl shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 
          disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed disabled:text-white/50
          border border-white/[0.05] backdrop-blur-sm font-plus-jakarta text-base"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
        ) : (
          `Preview Buy`
        )}
      </Button>

      <SwapPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirmBuy}
        tokenA={isEthInput ? "eth" : token}
        tokenB={isEthInput ? token : "eth"}
        amountA={isEthInput ? ethAmount : tokenAmount}
        amountB={isEthInput ? tokenAmount : ethAmount}
        priceImpact={priceImpact}
        loading={loading}
      />
    </div>
  );
}
