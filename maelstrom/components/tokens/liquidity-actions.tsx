"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LiquidityActionsProps {
  tokenSymbol: string
  tokenBalance: string
  ethBalance: string
  lpTokenBalance: string
}

export function LiquidityActions({
  tokenSymbol = "EUCLID",
  tokenBalance = "0",
  ethBalance = "0",
  lpTokenBalance = "0",
}: LiquidityActionsProps) {
  const [providePercentage, setProvidePercentage] = useState(0)
  const [withdrawPercentage, setWithdrawPercentage] = useState(0)
  const [manualTokenAmount, setManualTokenAmount] = useState("")
  const [manualEthAmount, setManualEthAmount] = useState("")
  const [manualLpAmount, setManualLpAmount] = useState("")
  const [estimatedTokens, setEstimatedTokens] = useState({
    token: "0.0",
    eth: "0.0",
  })

  const handleTokenInput = (value: string) => {
    setManualTokenAmount(value)
    const percentage = (Number(value) / Number(tokenBalance)) * 100
    if (!isNaN(percentage) && isFinite(percentage)) {
      setProvidePercentage(Math.min(percentage, 100))
    }
  }

  const handleEthInput = (value: string) => {
    setManualEthAmount(value)
    const percentage = (Number(value) / Number(ethBalance)) * 100
    if (!isNaN(percentage) && isFinite(percentage)) {
      setProvidePercentage(Math.min(percentage, 100))
    }
  }

  const handleLpInput = (value: string) => {
    setManualLpAmount(value)
    const percentage = (Number(value) / Number(lpTokenBalance)) * 100
    if (!isNaN(percentage) && isFinite(percentage)) {
      setWithdrawPercentage(Math.min(percentage, 100))
    }
  }

  // Update manual amounts when percentage changes
  const updateManualAmounts = (percentage: number) => {
    const tokenAmount = (Number(tokenBalance) * percentage / 100).toFixed(6)
    const ethAmount = (Number(ethBalance) * percentage / 100).toFixed(6)
    setManualTokenAmount(tokenAmount)
    setManualEthAmount(ethAmount)
  }

  const updateLpAmount = (percentage: number) => {
    const lpAmount = (Number(lpTokenBalance) * percentage / 100).toFixed(6)
    setManualLpAmount(lpAmount)
  }

  return (
    <Card className="p-6 bg-background-800/50 backdrop-blur flex-col items-center justify-center">
      <Tabs defaultValue="provide" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="provide" className="text-base">
            Provide
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="text-base">
            Withdraw
          </TabsTrigger>
        </TabsList>

        <TabsContent value="provide">
          <div className="space-y-4 mb-6">
            {/* First Token Input */}
            <div className="rounded-lg bg-background-900/50 p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">Bal: {tokenBalance}</span>
                  <button className="text-foreground/60 hover:text-foreground">↻</button>
                </div>
                <button 
                  onClick={() => {
                    setProvidePercentage(100)
                    updateManualAmounts(100)
                  }}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Max
                </button>
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={manualTokenAmount}
                  onChange={(e) => handleTokenInput(e.target.value)}
                  className="bg-transparent text-2xl w-[70%] focus:outline-none"
                  placeholder="0.0"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tokenSymbol}</span>
                </div>
              </div>
            </div>

            {/* Percentage Slider */}
            <div className="px-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
              <Slider
                value={[providePercentage]}
                onValueChange={(value) => {
                  setProvidePercentage(value[0])
                  updateManualAmounts(value[0])
                }}
                max={100}
                step={1}
                className="my-4"
              />
            </div>

            {/* ETH Input */}
            <div className="rounded-lg bg-background-900/50 p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">Bal: {ethBalance}</span>
                  <button className="text-foreground/60 hover:text-foreground">↻</button>
                </div>
                <button 
                  onClick={() => {
                    setProvidePercentage(100)
                    updateManualAmounts(100)
                  }}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Max
                </button>
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={manualEthAmount}
                  onChange={(e) => handleEthInput(e.target.value)}
                  className="bg-transparent text-2xl w-[70%] focus:outline-none"
                  placeholder="0.0"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg text-foreground">ETH</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full py-6 text-lg bg-primary hover:bg-primary/90" 
            variant="default"
          >
            Add Liquidity
          </Button>
        </TabsContent>

        <TabsContent value="withdraw">
          <div className="space-y-4 mb-6">
            {/* LP Token Input */}
            <div className="rounded-lg bg-background-900/50 p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">Bal: {lpTokenBalance}</span>
                  <button className="text-foreground/60 hover:text-foreground">↻</button>
                </div>
                <button 
                  onClick={() => {
                    setWithdrawPercentage(100)
                    updateLpAmount(100)
                  }}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Max
                </button>
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={manualLpAmount}
                  onChange={(e) => handleLpInput(e.target.value)}
                  className="bg-transparent text-2xl w-[70%] focus:outline-none"
                  placeholder="0.0"
                />
                <span className="text-lg text-foreground">Token</span>
              </div>
            </div>

            {/* Percentage Slider */}
            <div className="px-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
              <Slider
                value={[withdrawPercentage]}
                onValueChange={(value) => {
                  setWithdrawPercentage(value[0])
                  updateLpAmount(value[0])
                }}
                max={100}
                step={1}
                className="my-4"
              />
            </div>

            {/* Estimated Tokens Section */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between w-full p-4 text-sm bg-background-900/50 rounded-lg cursor-pointer hover:bg-background-900/70">
                  <span>Estimated Tokens Receive</span>
                  <span className="text-muted-foreground">↓</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[calc(100vw-3rem)] sm:w-[340px] bg-background-800/90 backdrop-blur border-background-700"
              >
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">ETH:</span>
                    <span className="text-foreground">{estimatedTokens.eth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{tokenSymbol}:</span>
                    <span className="text-foreground">{estimatedTokens.token}</span>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button 
            className="w-full py-6 text-lg" 
            variant="destructive"
          >
            Remove Liquidity
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
