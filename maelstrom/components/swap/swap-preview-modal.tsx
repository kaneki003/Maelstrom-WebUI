"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, AlertTriangle, Zap } from "lucide-react";

interface SwapPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  priceImpact: number;
  loading: boolean;
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
  loading,
}: SwapPreviewModalProps) {
  const tokenASymbol = tokenA.toUpperCase();
  const tokenBSymbol = tokenB.toUpperCase();
  const isHighImpact = priceImpact > 3;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Swap Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Swap Summary */}
          <Card className="bg-linear-to-r from-accent/5 to-accent/10 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between px-4">
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

          {/* Swap Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span
                className={
                  isHighImpact ? "text-red-500 font-medium" : "text-foreground"
                }
              >
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span>~$12.50</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
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
                <>Confirm Swap</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
