"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SwapPreviewModal } from "@/components/swap/swap-preview-modal";
import { useTrade } from "@/hooks/use-mock-api";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownUp } from "lucide-react";
import { ExchangeRates, TokenSelector } from "./token-selector";
import { BuyRequest, BuyResult, DAI_MOCK, ETH_MOCK, Token } from "@/lib/mock-api";


export function BuyForm() {
  const [ethAmount, setEthAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isEthInput, setIsEthInput] = useState(true);
  const { executeBuy, loading } = useTrade();
  const { toast } = useToast();
  const [token, setToken] = useState<Token>(DAI_MOCK);

  const exchangeRates = {
    dai: 0.0003125, 
    usdc: 0.0003125, 
    wbtc: 21.09375,
  };

  const handleInputChange = (value: string) => {
    if(!token) return;
    if (!isEthInput) {
      setTokenAmount(value);
      const ethValue = Number(value) * exchangeRates[token.symbol.toLowerCase() as keyof ExchangeRates];
      setEthAmount(ethValue.toFixed(6));
    } else {
      setEthAmount(value);
      const tokenValue = Number(value) / exchangeRates[token.symbol.toLowerCase() as keyof ExchangeRates];
      setTokenAmount(tokenValue.toFixed(token.symbol.toLowerCase() === "wbtc" ? 6 : 2));
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
    if(!token) return;
    const request: BuyRequest = {
      token,
      amountIn: ethAmount,
    };
    const result: BuyResult = await executeBuy(request);
    if(result.success){
      toast({
        title: "Buy Successful!",
        description: `Tx Hash: ${result.txHash}`,
      });
    }else{
      toast({
        title: "Buy Failed",
        description: result.error || "An error occurred during the buy process.",
      })
    }
    if (result) {
      setEthAmount("");
      setTokenAmount("");
      setShowPreview(false);
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
              <TokenSelector selectedToken={token? token : DAI_MOCK} onTokenChange={setToken} />
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
              <TokenSelector selectedToken={token ? token : DAI_MOCK} onTokenChange={setToken} />
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
        tokenIn={ETH_MOCK}
        tokenOut={token? token : DAI_MOCK}
        amountIn={ethAmount}
        amountOut={tokenAmount}
        loading={loading}
      />
    </div>
  );
}
