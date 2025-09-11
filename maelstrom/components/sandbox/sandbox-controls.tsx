"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Settings, Play, Pause, RotateCcw, Zap } from "lucide-react"

export function SandboxControls() {
  const [isRunning, setIsRunning] = useState(false)
  const [networkLatency, setNetworkLatency] = useState([100])
  const [maxTradeCap, setMaxTradeCap] = useState([10])
  const [autoReplay, setAutoReplay] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    // Reset simulation state
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-accent" />
          Sandbox Controls
          <Badge variant="secondary" className="text-xs">
            Demo Mode
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Controls */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleStartStop}
            className={`${
              isRunning
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-accent hover:bg-accent-cyan-2 text-accent-foreground"
            } glow-primary`}
          >
            {isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Stop Simulation
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Simulation
              </>
            )}
          </Button>

          <Button variant="outline" onClick={handleReset} disabled={isRunning}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>

          <div className="flex items-center space-x-2">
            <Switch id="auto-replay" checked={autoReplay} onCheckedChange={setAutoReplay} />
            <Label htmlFor="auto-replay" className="text-sm">
              Auto Replay
            </Label>
          </div>
        </div>

        {/* Network Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Network Latency</Label>
              <Badge variant="outline" className="text-xs">
                {networkLatency[0]}ms
              </Badge>
            </div>
            <Slider
              value={networkLatency}
              onValueChange={setNetworkLatency}
              max={1000}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10ms (Fast)</span>
              <span>1000ms (Slow)</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Max Trade Cap</Label>
              <Badge variant="outline" className="text-xs">
                {maxTradeCap[0]} ETH
              </Badge>
            </div>
            <Slider value={maxTradeCap} onValueChange={setMaxTradeCap} max={100} min={1} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 ETH</span>
              <span>100 ETH</span>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-accent hover:text-accent-cyan-2"
          >
            <Zap className="mr-2 h-4 w-4" />
            {showAdvanced ? "Hide" : "Show"} Advanced Settings
          </Button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
              <div className="space-y-2">
                <Label className="text-xs">Anchor Relaxation Rate</Label>
                <Slider defaultValue={[50]} max={100} min={1} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Price Impact Sensitivity</Label>
                <Slider defaultValue={[30]} max={100} min={1} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Market Volatility</Label>
                <Slider defaultValue={[20]} max={100} min={1} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Stable</span>
                  <span>Volatile</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-green-500 animate-pulse" : "bg-muted"}`} />
            <span className="text-sm font-medium">Simulation Status: {isRunning ? "Running" : "Stopped"}</span>
          </div>
          {isRunning && (
            <Badge variant="secondary" className="text-xs">
              Live Updates
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
