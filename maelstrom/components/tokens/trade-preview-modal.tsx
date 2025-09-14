"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface TradePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  tradeType: "buy" | "sell"
  token: string
  amountIn: string
  amountOut: string
  priceImpact: number
  slippage: number
  loading: boolean
}

export function TradePreviewModal({
  isOpen,
  onClose,
  onConfirm,
  tradeType,
  token,
  amountIn,
  amountOut,
  priceImpact,
  slippage,
  loading,
}: TradePreviewModalProps) {
  const inputToken = tradeType === "buy" ? "ETH" : token.toUpperCase()
  const outputToken = tradeType === "buy" ? token.toUpperCase() : "ETH"
  const isHighImpact = priceImpact > 3

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="capitalize">{tradeType} Order Preview</span>
            <Badge variant={tradeType === "buy" ? "default" : "secondary"} className="text-xs">
              {tradeType === "buy" ? "BUY" : "SELL"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Trade Summary */}
          <Card className="bg-muted/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">You pay</p>
                  <p className="text-lg font-semibold">
                    {amountIn} {inputToken}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">You receive</p>
                  <p className="text-lg font-semibold">
                    {amountOut} {outputToken}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trade Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={isHighImpact ? "text-red-500 font-medium" : "text-foreground"}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span>~$12.50</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Time</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>~15 seconds</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Warnings */}
          {isHighImpact && (
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-red-500">High Price Impact</p>
                    <p className="text-muted-foreground">
                      This trade will significantly affect the token price. Consider splitting into smaller orders.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Anchor Movement Simulation */}
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-accent">Price Anchor Movement</p>
                  <p className="text-muted-foreground">
                    This {tradeType} will nudge the price anchor {tradeType === "buy" ? "upward" : "downward"} by ~
                    {(priceImpact * 0.1).toFixed(3)}%, affecting future trades.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 ${
                tradeType === "buy"
                  ? "bg-accent hover:bg-accent-cyan-2 text-accent-foreground"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Confirming...
                </>
              ) : (
                `Confirm ${tradeType === "buy" ? "Buy" : "Sell"}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
