"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown } from "lucide-react";

export type ExchangeRates = {
  dai: number;
  usdc: number;
  wbtc: number;
};

interface Token {
  symbol: keyof ExchangeRates;
  name: string;
  balance: string;
  price: string;
  change24h: number;
  icon?: string;
}

const tokens: Token[] = [
  {
    symbol: "dai",
    name: "Dai Stablecoin",
    balance: "1250.50",
    price: "0.0003125 ETH",
    change24h: 0.1,
  },
  {
    symbol: "usdc",
    name: "USD Coin",
    balance: "890.25",
    price: "$1.00",
    change24h: -0.05,
  },
  {
    symbol: "wbtc",
    name: "Wrapped Bitcoin",
    balance: "0.0234",
    price: "$67,500",
    change24h: 1.8,
  },
];

interface TokenSelectorProps {
  selectedToken: keyof ExchangeRates;
  onTokenChange: (token: keyof ExchangeRates) => void;
}

export function TokenSelector({
  selectedToken,
  onTokenChange,
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedTokenData = tokens.find(
    (token) => token.symbol === selectedToken
  );
  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTokenSelect = (token: keyof ExchangeRates) => {
    onTokenChange(token);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="h-10 px-3 hover:bg-accent/10 font-medium"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-sm font-bold text-accent">
              {selectedTokenData?.symbol.toUpperCase().charAt(0)}
            </span>
          </div>
          <span>{selectedTokenData?.symbol.toUpperCase()}</span>
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

            {/* Token List */}
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
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
                        <span className="text-sm font-bold text-accent">
                          {token.symbol.toUpperCase().charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{token.symbol.toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground">
                          {token.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{token.balance}</p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-muted-foreground">
                          {token.price}
                        </p>
                        <Badge
                          variant={
                            token.change24h >= 0 ? "default" : "destructive"
                          }
                          className="text-xs h-4 px-1"
                        >
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
  );
}
