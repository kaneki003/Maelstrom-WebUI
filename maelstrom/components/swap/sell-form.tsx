"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TokenSelector, ExchangeRates } from "./token-selector";
import { SwapPreviewModal } from "@/components/swap/swap-preview-modal";
import { useTrade } from "@/hooks/use-mock-api";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownUp } from "lucide-react";
import {
  BuyRequest,
  DAI_MOCK,
  ETH_MOCK,
  SellResult,
  Token,
} from "@/lib/mock-api";

export function SellForm() {
  const [ethAmount, setEthAmount] = useState("");
  const [token, setToken] = useState<Token>(DAI_MOCK);
  const [tokenAmount, setTokenAmount] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isEthInput, setIsEthInput] = useState(false);
  const { executeSell, loading } = useTrade();
  const { toast } = useToast();

  const exchangeRates: ExchangeRates = {
    dai: 0.0003125,
    usdc: 0.0003125,
    wbtc: 21.09375,
  };

  const handleInputChange = (value: string) => {
    if (!token) return;
    if (!isEthInput) {
      setTokenAmount(value);
      const ethValue =
        Number(value) *
        exchangeRates[token.symbol.toLowerCase() as keyof ExchangeRates];
      setEthAmount(ethValue.toFixed(6));
    } else {
      setEthAmount(value);
      const tokenValue =
        Number(value) /
        exchangeRates[token.symbol.toLowerCase() as keyof ExchangeRates];
      setTokenAmount(
        tokenValue.toFixed(token.symbol.toLowerCase() === "wbtc" ? 8 : 6)
      );
    }
  };

  const handleSwapInputType = () => {
    setIsEthInput(!isEthInput);
  };

  const handlePreview = () => {
    if (!ethAmount || !tokenAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount to sell",
      });
      return;
    }
    setShowPreview(true);
  };

  const handleConfirmSell = async () => {
    if (!token) return;
    const buyRequest: BuyRequest = {
      token: token,
      amountIn: tokenAmount,
    };

    const result: SellResult = await executeSell(buyRequest);
    if (result.success) {
      toast({
        title: "Sell Successful!",
        description: `Tx Hash ${result.txHash}`,
      });
    } else {
      toast({
        title: "Sell Failed",
        description: `Error: ${result.error}`,
      });
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
            You're {isEthInput ? "receiving" : "selling"}
          </span>
          <button
            onClick={handleSwapInputType}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/[0.05] bg-white/[0.02]"
          >
            <ArrowDownUp className="h-4 w-4 text-accent-cyan" />
          </button>
        </div>
        <div className="relative flex items-center bg-black/10 group-hover:bg-black/20 rounded-xl p-4 transition-all duration-300">
          {isEthInput ? (
            <>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={ethAmount}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-white/20 
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                  font-plus-jakarta text-white/90 transition-all duration-300"
              />
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
            </>
          ) : (
            <>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={tokenAmount}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-white/20 
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                  font-plus-jakarta text-white/90 transition-all duration-300"
              />
              <div className="ml-2">
                <TokenSelector
                  selectedToken={token ? token : DAI_MOCK}
                  onTokenChange={setToken}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/70 font-medium font-plus-jakarta">
            You'll {isEthInput ? "sell" : "receive"}
          </span>
        </div>
        <div className="relative flex items-center bg-black/10 group-hover:bg-black/20 rounded-xl p-4 transition-all duration-300">
          {isEthInput ? (
            <>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={tokenAmount}
                readOnly
                className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-white/20 
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                font-plus-jakarta text-white/90 transition-all duration-300"
              />
              <div className="ml-2">
                <TokenSelector
                  selectedToken={token ? token : DAI_MOCK}
                  onTokenChange={setToken}
                />
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={ethAmount}
                readOnly
                className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-white/20 
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                font-plus-jakarta text-white/90 transition-all duration-300"
              />
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
            </>
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
          `Preview Sell`
        )}
      </Button>

      <SwapPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirmSell}
        tokenIn={token!}
        tokenOut={ETH_MOCK}
        amountIn={tokenAmount}
        amountOut={ethAmount}
        loading={loading}
      />
    </div>
  );
}
