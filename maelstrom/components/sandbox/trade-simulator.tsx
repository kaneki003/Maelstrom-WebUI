"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Play, TrendingUp, TrendingDown } from "lucide-react"

interface SimulatedTrade {
  id: string
  type: "buy" | "sell"
  token: string
  amount: string
  timestamp: number
  priceImpact: number
}

export function TradeSimulator() {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [selectedToken, setSelectedToken] = useState("dai")
  const [amount, setAmount] = useState("")
  const [simulatedTrades, setSimulatedTrades] = useState<SimulatedTrade[]>([])
  const { toast } = useToast()

  const tokens = [
    { value: "dai", label: "DAI", price: "3200" },
    { value: "usdc", label: "USDC", price: "3200" },
    { value: "wbtc", label: "WBTC", price: "0.017" },
  ]

  const handleSimulateTrade = () => {
    if (!amount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount to simulate",
        variant: "destructive",
      })
      return
    }

    const priceImpact = Math.min(Number.parseFloat(amount) / 100, 0.05) * 100 // Max 5% impact
    const newTrade: SimulatedTrade = {
      id: Date.now().toString(),
      type: tradeType,
      token: selectedToken,
      amount,
      timestamp: Date.now(),
      priceImpact,
    }

    setSimulatedTrades((prev) => [newTrade, ...prev.slice(0, 9)]) // Keep last 10 trades

    toast({
      title: "Trade Simulated",
      description: `Simulated ${tradeType} of ${amount} ETH for ${selectedToken.toUpperCase()}`,
    })

    setAmount("")
  }

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ago`
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-accent" />
          Trade Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Trade Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Trade Type</Label>
              <Select value={tradeType} onValueChange={(value: "buy" | "sell") => setTradeType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Token</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.value} value={token.value}>
                      {token.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Amount (ETH)</Label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.001"
            />
          </div>

          <Button
            onClick={handleSimulateTrade}
            disabled={!amount}
            className="w-full bg-accent hover:bg-accent-cyan-2 text-accent-foreground glow-primary"
          >
            <Play className="mr-2 h-4 w-4" />
            Simulate Trade
          </Button>
        </div>

        {/* Recent Simulated Trades */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Recent Simulations</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {simulatedTrades.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No simulated trades yet</p>
            ) : (
              simulatedTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        trade.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"
                      }`}
                    >
                      {trade.type === "buy" ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {trade.type === "buy" ? "Buy" : "Sell"} {trade.token.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {trade.amount} ETH • {formatTimeAgo(trade.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={trade.priceImpact > 3 ? "destructive" : trade.priceImpact > 1 ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {trade.priceImpact.toFixed(2)}% impact
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
