"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Clock, AlertTriangle, Zap } from "lucide-react"

interface SwapPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  tokenA: string
  tokenB: string
  amountA: string
  amountB: string
  priceImpact: number
  slippage: number
  loading: boolean
}

export function SwapPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  tokenA,
  tokenB,
  amountA,
  amountB,
  priceImpact,
  slippage,
  loading,
}: SwapPreviewModalProps) {
  const tokenASymbol = tokenA.toUpperCase()
  const tokenBSymbol = tokenB.toUpperCase()
  const isHighImpact = priceImpact > 3

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Swap Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Swap Summary */}
          <Card className="bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">You pay</p>
                  <p className="text-lg font-semibold">
                    {amountA} {tokenASymbol}
                  </p>
                </div>
                <div className="relative">
                  <ArrowRight className="h-6 w-6 text-accent animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-accent/20 blur-sm animate-glow" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">You receive</p>
                  <p className="text-lg font-semibold">
                    {amountB} {tokenBSymbol}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swap Route */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Swap Route</p>
            <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
              <Badge variant="secondary" className="text-xs">
                {tokenASymbol}
              </Badge>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                Pool
              </Badge>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <Badge variant="secondary" className="text-xs">
                {tokenBSymbol}
              </Badge>
            </div>
          </div>

          {/* Swap Details */}
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
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-red-500">High Price Impact</p>
                    <p className="text-muted-foreground">
                      This swap will significantly affect the token price. Consider splitting into smaller swaps.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 bg-accent hover:bg-accent-cyan-2 text-accent-foreground glow-primary"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Swapping...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Confirm Swap
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
