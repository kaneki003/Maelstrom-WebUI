"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Info } from "lucide-react"

interface SwapSettingsProps {
  isOpen: boolean
  onClose: () => void
  slippage: number
  onSlippageChange: (value: number) => void
  deadline: number
  onDeadlineChange: (value: number) => void
}

export function SwapSettings({
  isOpen,
  onClose,
  slippage,
  onSlippageChange,
  deadline,
  onDeadlineChange,
}: SwapSettingsProps) {
  const presetSlippages = [0.1, 0.5, 1.0, 3.0]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-accent" />
            Swap Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Slippage Tolerance */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Slippage Tolerance</Label>
              <Badge variant="outline" className="text-xs">
                {slippage}%
              </Badge>
            </div>

            {/* Preset Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {presetSlippages.map((preset) => (
                <Button
                  key={preset}
                  variant={slippage === preset ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSlippageChange(preset)}
                  className="text-xs"
                >
                  {preset}%
                </Button>
              ))}
            </div>

            {/* Custom Slippage */}
            <div className="space-y-2">
              <Slider
                value={[slippage]}
                onValueChange={(value) => onSlippageChange(value[0])}
                max={10}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.1%</span>
                <span>10%</span>
              </div>
            </div>

            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-500">Slippage Tolerance</p>
                    <p className="text-muted-foreground">
                      Higher slippage tolerance increases the chance of success but may result in a worse price.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Deadline */}
          <div className="space-y-3">
            <Label htmlFor="deadline">Transaction Deadline</Label>
            <div className="flex items-center gap-2">
              <Input
                id="deadline"
                type="number"
                value={deadline}
                onChange={(e) => onDeadlineChange(Number.parseInt(e.target.value))}
                className="flex-1"
                min="1"
                max="60"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your transaction will revert if it is pending for more than this long.
            </p>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-3">
            <Label>Advanced Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium">MEV Protection</p>
                  <p className="text-xs text-muted-foreground">Protect against front-running</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Gas Optimization</p>
                  <p className="text-xs text-muted-foreground">Optimize for lower gas fees</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Auto
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button onClick={onClose} className="w-full bg-accent hover:bg-accent-cyan-2 text-accent-foreground">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
