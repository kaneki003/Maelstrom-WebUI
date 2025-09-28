"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiquidityPreviewModal } from "./liquidity-preview-modal";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, RefreshCw } from "lucide-react";

interface LiquidityActionsProps {
  tokenSymbol: string;
  tokenBalance: string;
  ethBalance: string;
  lpTokenBalance: string;
  totalLpSupply?: string;
}

export function LiquidityActions({
  tokenSymbol = "ETC",
  tokenBalance = "0",
  ethBalance = "0",
  lpTokenBalance = "0",
  totalLpSupply = "1000",
}: LiquidityActionsProps) {
  const [tokenAmount, setTokenAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [lpAmount, setLpAmount] = useState("");
  const [lpInputAmount, setLpInputAmount] = useState(""); // For Add Liquidity LP input
  const [removeTokenAmount, setRemoveTokenAmount] = useState(""); // For Remove Liquidity token input
  const [removeEthAmount, setRemoveEthAmount] = useState(""); // For Remove Liquidity eth input
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<"add" | "remove">("add");
  const { toast } = useToast();

  // Mock pool ratio: 1 ETH = 3200 tokens (example)
  const poolRatio = 3200;
  const totalEthReserve = 500; // Mock total ETH in pool
  const totalTokenReserve = totalEthReserve * poolRatio;

  // Calculate proportional amounts for Add Liquidity
  const handleTokenAmountChange = useCallback(
    (value: string) => {
      setTokenAmount(value);
      setLpInputAmount(""); // Clear LP input when manually entering token amount
      const tokenNum = parseFloat(value) || 0;
      const proportionalEth = (tokenNum / poolRatio).toFixed(6);
      setEthAmount(proportionalEth);
    },
    [poolRatio]
  );

  const handleEthAmountChange = useCallback(
    (value: string) => {
      setEthAmount(value);
      setLpInputAmount(""); // Clear LP input when manually entering ETH amount
      const ethNum = parseFloat(value) || 0;
      const proportionalToken = (ethNum * poolRatio).toFixed(6);
      setTokenAmount(proportionalToken);
    },
    [poolRatio]
  );

  const handleLpAmountChange = useCallback(
    (value: string) => {
      setLpInputAmount(value);
      const lpNum = parseFloat(value) || 0;
      if (lpNum === 0) {
        setTokenAmount("");
        setEthAmount("");
        return;
      }

      // Calculate required ETH and tokens based on LP amount
      const poolShareRatio = lpNum / parseFloat(totalLpSupply);
      const requiredEth = (totalEthReserve * poolShareRatio).toFixed(6);
      const requiredToken = (totalTokenReserve * poolShareRatio).toFixed(6);

      setEthAmount(requiredEth);
      setTokenAmount(requiredToken);
    },
    [totalEthReserve, totalTokenReserve, totalLpSupply]
  );

  // Handle remove liquidity token amount changes
  const handleRemoveTokenAmountChange = useCallback(
    (value: string) => {
      setRemoveTokenAmount(value);
      const tokenNum = parseFloat(value) || 0;
      if (tokenNum === 0) {
        setLpAmount("");
        setRemoveEthAmount("");
        return;
      }

      // Calculate required LP and proportional ETH based on token amount
      const tokenShareRatio = tokenNum / totalTokenReserve;
      const requiredLp = (parseFloat(totalLpSupply) * tokenShareRatio).toFixed(
        4
      );
      const proportionalEth = (tokenNum / poolRatio).toFixed(6);

      setLpAmount(requiredLp);
      setRemoveEthAmount(proportionalEth);
    },
    [totalTokenReserve, totalLpSupply, poolRatio]
  );

  // Handle remove liquidity ETH amount changes
  const handleRemoveEthAmountChange = useCallback(
    (value: string) => {
      setRemoveEthAmount(value);
      const ethNum = parseFloat(value) || 0;
      if (ethNum === 0) {
        setLpAmount("");
        setRemoveTokenAmount("");
        return;
      }

      // Calculate required LP and proportional token based on ETH amount
      const ethShareRatio = ethNum / totalEthReserve;
      const requiredLp = (parseFloat(totalLpSupply) * ethShareRatio).toFixed(4);
      const proportionalToken = (ethNum * poolRatio).toFixed(6);

      setLpAmount(requiredLp);
      setRemoveTokenAmount(proportionalToken);
    },
    [totalEthReserve, totalLpSupply, poolRatio]
  );

  // Calculate LP tokens to be minted
  const calculatedLpTokens = useMemo(() => {
    // If LP input is provided, use that
    if (lpInputAmount && parseFloat(lpInputAmount) >= 0) {
      return lpInputAmount;
    }

    // Otherwise calculate from ETH amount
    const ethNum = parseFloat(ethAmount) || 0;
    if (ethNum === 0) return "0.0";
    const lpMinted = (ethNum / totalEthReserve) * parseFloat(totalLpSupply);
    return lpMinted.toFixed(4);
  }, [ethAmount, lpInputAmount, totalEthReserve, totalLpSupply]);

  // Calculate tokens to receive when removing liquidity
  const calculatedTokensToReceive = useMemo(() => {
    // If manual token amounts are provided, use those
    if (removeTokenAmount || removeEthAmount) {
      return {
        token: removeTokenAmount || "0.0",
        eth: removeEthAmount || "0.0",
      };
    }

    // Otherwise calculate from LP amount
    const lpNum = parseFloat(lpAmount) || 0;
    if (lpNum === 0) return { token: "0.0", eth: "0.0" };

    const poolShareRatio = lpNum / parseFloat(totalLpSupply);
    const ethToReceive = (totalEthReserve * poolShareRatio).toFixed(6);
    const tokenToReceive = (totalTokenReserve * poolShareRatio).toFixed(6);

    return { token: tokenToReceive, eth: ethToReceive };
  }, [
    lpAmount,
    removeTokenAmount,
    removeEthAmount,
    totalLpSupply,
    totalEthReserve,
    totalTokenReserve,
  ]);

  const setMaxLp = useCallback(() => {
    setLpAmount(lpTokenBalance);
    // Clear manual token inputs when setting max LP
    setRemoveTokenAmount("");
    setRemoveEthAmount("");
  }, [lpTokenBalance]);

  const handlePreviewAdd = useCallback(() => {
    if (
      !tokenAmount ||
      !ethAmount ||
      parseFloat(tokenAmount) === 0 ||
      parseFloat(ethAmount) === 0
    ) {
      toast({
        title: "Invalid Amount",
        description: "Please enter amounts to add liquidity",
      });
      return;
    }

    // Validate against balances
    if (parseFloat(tokenAmount) > parseFloat(tokenBalance)) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${tokenBalance} ${tokenSymbol}`,
      });
      return;
    }

    if (parseFloat(ethAmount) > parseFloat(ethBalance)) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${ethBalance} ETH`,
      });
      return;
    }

    setLpAmount(calculatedLpTokens); // Clear LP input for fresh calculation
    setCurrentTab("add");
    setShowPreview(true);
  }, [tokenAmount, ethAmount, tokenBalance, ethBalance, tokenSymbol, toast]);

  const handlePreviewRemove = useCallback(() => {
    if (!lpAmount || parseFloat(lpAmount) === 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount to remove",
      });
      return;
    }

    if (parseFloat(lpAmount) > parseFloat(lpTokenBalance)) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${lpTokenBalance} LP tokens`,
      });
      return;
    }

    setCurrentTab("remove");
    setShowPreview(true);
  }, [lpAmount, lpTokenBalance, toast]);

  const handleConfirmLiquidity = async () => {
    setLoading(true);
    try {
      // Add your liquidity transaction logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay

      toast({
        title: "Success!",
        description: `Liquidity ${
          currentTab === "add" ? "added" : "removed"
        } successfully`,
      });
      setShowPreview(false);

      // Reset form
      setTokenAmount("");
      setEthAmount("");
      setLpAmount("");
      setLpInputAmount("");
      setRemoveTokenAmount("");
      setRemoveEthAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process liquidity operation",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 relative overflow-hidden border-0 flex-col items-center justify-center">
      <div className="absolute inset-0 bg-background-800/40 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] to-primary-500/[0.05]" />
      <div className="absolute inset-0 border border-white/[0.05] rounded-lg bg-gradient-to-b from-white/[0.05] to-transparent" />
      <CardContent className="relative w-full">
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/20 p-1 rounded-2xl backdrop-blur-md border border-white/[0.05]">
            <TabsTrigger
              value="add"
              className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-accent-cyan/20 data-[state=active]:to-primary-600/20 data-[state=active]:border-accent-cyan/20 data-[state=active]:shadow-lg data-[state=active]:text-accent-cyan rounded-xl transition-all duration-200"
            >
              Add Liquidity
            </TabsTrigger>
            <TabsTrigger
              value="remove"
              className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-accent-cyan/20 data-[state=active]:to-primary-600/20 data-[state=active]:border-accent-cyan/20 data-[state=active]:shadow-lg data-[state=active]:text-accent-cyan rounded-xl transition-all duration-200"
            >
              Remove Liquidity
            </TabsTrigger>
          </TabsList>

          {/* ADD LIQUIDITY TAB */}
          <TabsContent value="add" className="space-y-6">
            {/* "You are depositing" Section */}
            <div className="space-y-4 bg-white/[0.01] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
              <h3 className="text-md font-semibold text-white/90 font-plus-jakarta">
                You are depositing
              </h3>

              {/* Token Pair Inputs - Horizontal Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Token Input Panel */}
                <div className="relative bg-white/[0.02] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                        <span className="text-xs font-semibold text-accent-cyan">
                          {tokenSymbol[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{tokenSymbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-foreground/60">
                        balance: {tokenBalance}
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={tokenAmount}
                    onChange={(e) => handleTokenAmountChange(e.target.value)}
                    className="w-full h-16 text-2xl font-medium bg-black/10 rounded-xl px-4 
                  border border-white/[0.05] focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20
                  placeholder:text-white/20 transition-all duration-300 font-plus-jakarta"
                    placeholder="0.0"
                  />
                </div>

                {/* ETH Input Panel */}
                <div className="relative bg-white/[0.02] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-500">
                          Ξ
                        </span>
                      </div>
                      <span className="text-sm font-medium">ETH</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-foreground/60">
                        balance: {ethBalance}
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={ethAmount}
                    onChange={(e) => handleEthAmountChange(e.target.value)}
                    className="w-full h-16 text-2xl font-medium bg-black/10 rounded-xl px-4 
                  border border-white/[0.05] focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20
                  placeholder:text-white/20 transition-all duration-300 font-plus-jakarta"
                    placeholder="0.0"
                  />
                </div>
              </div>

              {/* Exchange Rate Display */}
              {(parseFloat(tokenAmount) > 0 ||
                parseFloat(ethAmount) > 0 ||
                parseFloat(calculatedLpTokens) > 0) && (
                <div className="text-center space-y-1 pt-2">
                  <div className="text-sm text-foreground/60">
                    1 {tokenSymbol} = {(1 / poolRatio).toFixed(6)} ETH
                    <span className="mx-2">•</span>1 ETH ={" "}
                    {poolRatio.toLocaleString()} {tokenSymbol}
                  </div>
                </div>
              )}
            </div>

            {/* "You'll mint" Section */}
            <div className="space-y-4 bg-white/[0.01] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
              <h3 className="text-md font-semibold text-white/90 font-plus-jakarta">
                You'll mint
              </h3>

              <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white/80">
                        LP
                      </span>
                    </div>
                    <span className="text-sm font-medium">LP Token</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-foreground/60">
                      Total Supply: {totalLpSupply}
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  value={calculatedLpTokens}
                  onChange={(e) => handleLpAmountChange(e.target.value)}
                  className="w-full h-16 text-2xl font-medium bg-black/10 rounded-xl px-4 
                    border border-white/[0.05] focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20
                    placeholder:text-white/20 transition-all duration-300 font-plus-jakarta"
                  placeholder="0.0"
                />

                {calculatedLpTokens && parseFloat(calculatedLpTokens) > 0 && (
                  <div className="mt-3 text-xs text-foreground/60 text-center">
                    {(
                      (parseFloat(calculatedLpTokens) /
                        parseFloat(totalLpSupply)) *
                      100
                    ).toFixed(3)}
                    % of pool
                  </div>
                )}
              </div>
            </div>

            {/* Add Liquidity Button */}
            <Button
              onClick={handlePreviewAdd}
              className="w-full h-14 bg-gradient-to-r from-accent-cyan to-primary-500 hover:from-accent-cyan/90 hover:to-primary-500/90 
                text-white font-semibold rounded-xl shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 
                disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed disabled:text-white/50
                border border-white/[0.05] backdrop-blur-sm font-plus-jakarta text-base"
              variant="default"
              disabled={
                !tokenAmount ||
                !ethAmount ||
                parseFloat(tokenAmount) === 0 ||
                parseFloat(ethAmount) === 0 ||
                loading
              }
            >
              Preview Deposit
            </Button>
          </TabsContent>

          {/* REMOVE LIQUIDITY TAB */}
          <TabsContent value="remove" className="space-y-6">
            {/* "You are redeeming" Section */}
            <div className="space-y-4 bg-white/[0.01] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
              <h3 className="text-md font-semibold text-white/90 font-plus-jakarta">
                You are redeeming
              </h3>

              <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white/80">
                        LP
                      </span>
                    </div>
                    <span className="text-sm font-medium">LP Token</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-foreground/60">
                      LP Balance: {lpTokenBalance}
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  value={lpAmount}
                  onChange={(e) => {
                    setLpAmount(e.target.value);
                    // Clear manual token inputs when LP is manually entered
                    setRemoveTokenAmount("");
                    setRemoveEthAmount("");
                  }}
                  className="w-full h-16 text-2xl font-medium bg-black/10 rounded-xl px-4 
                    border border-white/[0.05] focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20
                    placeholder:text-white/20 transition-all duration-300 font-plus-jakarta"
                  placeholder="0.0"
                />

                <div className="mt-3 text-xs text-foreground/60 text-center">
                  {(
                    (parseFloat(lpAmount) / parseFloat(totalLpSupply)) *
                    100
                  ).toFixed(3)}
                  % of pool
                </div>
                {/* {lpAmount && parseFloat(lpAmount) > 0 && (
                )} */}
              </div>
            </div>

            {/* "You'll receive" Section */}
            <div className="space-y-4 bg-white/[0.01] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
              <h3 className="text-md font-semibold text-white/90 font-plus-jakarta">
                You'll receive
              </h3>

              {/* Token Pair Outputs - Horizontal Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Token Output Panel */}
                <div className="relative bg-white/[0.02] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                        <span className="text-xs font-semibold text-accent-cyan">
                          {tokenSymbol[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{tokenSymbol}</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={calculatedTokensToReceive.token}
                    onChange={(e) =>
                      handleRemoveTokenAmountChange(e.target.value)
                    }
                    className="w-full h-16 text-2xl font-medium bg-black/10 rounded-xl px-4 
                        border border-white/[0.05] focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20
                        placeholder:text-white/20 transition-all duration-300 font-plus-jakarta"
                    placeholder="0.0"
                  />
                </div>

                {/* ETH Output Panel */}
                <div className="relative bg-white/[0.02] rounded-2xl p-5 border border-white/[0.05] shadow-lg backdrop-blur-md">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-500">
                          Ξ
                        </span>
                      </div>
                      <span className="text-sm font-medium">ETH</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={calculatedTokensToReceive.eth}
                    onChange={(e) =>
                      handleRemoveEthAmountChange(e.target.value)
                    }
                    className="w-full h-16 text-2xl font-medium bg-black/10 rounded-xl px-4 
                        border border-white/[0.05] focus:border-accent-cyan/30 focus:ring-2 focus:ring-accent-cyan/20
                        placeholder:text-white/20 transition-all duration-300 font-plus-jakarta"
                    placeholder="0.0"
                  />
                </div>
              </div>

              {/* Exchange Rate Display */}
              {parseFloat(lpAmount) > 0 && (
                <div className="text-center space-y-1 pt-2">
                  <div className="text-sm text-foreground/60">
                    1 {tokenSymbol} = {(1 / poolRatio).toFixed(6)} ETH
                    <span className="mx-2">•</span>1 ETH ={" "}
                    {poolRatio.toLocaleString()} {tokenSymbol}
                  </div>
                </div>
              )}
            </div>
            {/* {parseFloat(lpAmount) > 0 && (
            )} */}

            {/* Remove Liquidity Button */}
            <Button
              onClick={handlePreviewRemove}
              className="w-full h-14 bg-gradient-to-r from-accent-cyan to-primary-500 hover:from-accent-cyan/90 hover:to-primary-500/90 
                text-white font-semibold rounded-xl shadow-lg hover:shadow-accent-cyan/25 transition-all duration-300 
                disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed disabled:text-white/50
                border border-white/[0.05] backdrop-blur-sm font-plus-jakarta text-base"
              variant="default"
              disabled={!lpAmount || parseFloat(lpAmount) === 0 || loading}
            >
              Preview Withdraw
            </Button>
          </TabsContent>
        </Tabs>

        <LiquidityPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onConfirm={handleConfirmLiquidity}
          tokenSymbol={tokenSymbol}
          isWithdraw={currentTab === "remove"}
          tokenAmount={tokenAmount || calculatedTokensToReceive.token}
          ethAmount={ethAmount || calculatedTokensToReceive.eth}
          lpAmount={lpAmount}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
