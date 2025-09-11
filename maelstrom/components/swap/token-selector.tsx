"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search } from "lucide-react"

interface Token {
  symbol: string
  name: string
  balance: string
  price: string
  change24h: number
}

const tokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", balance: "2.4567", price: "$3,200", change24h: 2.5 },
  { symbol: "DAI", name: "Dai Stablecoin", balance: "1250.50", price: "$1.00", change24h: 0.1 },
  { symbol: "USDC", name: "USD Coin", balance: "890.25", price: "$1.00", change24h: -0.05 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: "0.0234", price: "$67,500", change24h: 1.8 },
]

interface TokenSelectorProps {
  selectedToken: string
  onTokenChange: (token: string) => void
}

export function TokenSelector({ selectedToken, onTokenChange }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedTokenData = tokens.find((token) => token.symbol.toLowerCase() === selectedToken)
  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTokenSelect = (token: string) => {
    onTokenChange(token.toLowerCase())
    setIsOpen(false)
    setSearchQuery("")
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="h-12 px-3 bg-background/80 border-border/50 hover:bg-accent/10"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-xs font-bold text-accent">{selectedTokenData?.symbol.charAt(0)}</span>
          </div>
          <span className="font-medium">{selectedTokenData?.symbol}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Token</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Popular Tokens */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Popular Tokens</p>
              <div className="grid grid-cols-4 gap-2">
                {tokens.slice(0, 4).map((token) => (
                  <Button
                    key={token.symbol}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTokenSelect(token.symbol)}
                    className="h-auto p-2 flex flex-col items-center gap-1"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-accent">{token.symbol.charAt(0)}</span>
                    </div>
                    <span className="text-xs">{token.symbol}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Token List */}
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {filteredTokens.map((token) => (
                <Button
                  key={token.symbol}
                  variant="ghost"
                  onClick={() => handleTokenSelect(token.symbol)}
                  className="w-full h-auto p-3 justify-start hover:bg-accent/10"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent">{token.symbol.charAt(0)}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{token.symbol}</p>
                        <p className="text-xs text-muted-foreground">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{token.balance}</p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-muted-foreground">{token.price}</p>
                        <Badge variant={token.change24h >= 0 ? "default" : "destructive"} className="text-xs h-4 px-1">
                          {token.change24h >= 0 ? "+" : ""}
                          {token.change24h.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
