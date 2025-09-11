"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Anchor, Play, Pause } from "lucide-react"

export function AnchorVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isAnimating, setIsAnimating] = useState(true)
  const [anchorData, setAnchorData] = useState({
    buyPrice: 3250,
    sellPrice: 3150,
    spotPrice: 3200,
    targetPrice: 3200,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    let time = 0
    const width = canvas.width / 2
    const height = canvas.height / 2

    const animate = () => {
      if (!isAnimating) return

      time += 0.02
      ctx.clearRect(0, 0, width, height)

      // Draw background grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        const y = (i / 10) * height
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Price range
      const minPrice = 3000
      const maxPrice = 3400
      const priceToY = (price: number) => height - ((price - minPrice) / (maxPrice - minPrice)) * height

      // Draw price lines
      const buyY = priceToY(anchorData.buyPrice)
      const sellY = priceToY(anchorData.sellPrice)
      const spotY = priceToY(anchorData.spotPrice)

      // Buy price line (green)
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, buyY)
      ctx.lineTo(width, buyY)
      ctx.stroke()

      // Sell price line (red)
      ctx.strokeStyle = "rgba(239, 68, 68, 0.8)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, sellY)
      ctx.lineTo(width, sellY)
      ctx.stroke()

      // Spot price line (blue)
      ctx.strokeStyle = "rgba(0, 216, 255, 0.8)"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(0, spotY)
      ctx.lineTo(width, spotY)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw anchor convergence animation
      const convergenceSpeed = 0.01
      const buyTarget =
        anchorData.spotPrice + (anchorData.buyPrice - anchorData.spotPrice) * Math.exp(-time * convergenceSpeed)
      const sellTarget =
        anchorData.spotPrice + (anchorData.sellPrice - anchorData.spotPrice) * Math.exp(-time * convergenceSpeed)

      // Animated convergence lines
      ctx.strokeStyle = "rgba(34, 197, 94, 0.3)"
      ctx.lineWidth = 1
      for (let i = 0; i < 5; i++) {
        const x = (i / 4) * width
        const y = priceToY(buyTarget + Math.sin(time * 2 + i) * 5)
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.strokeStyle = "rgba(239, 68, 68, 0.3)"
      for (let i = 0; i < 5; i++) {
        const x = (i / 4) * width
        const y = priceToY(sellTarget + Math.sin(time * 2 + i + Math.PI) * 5)
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw price labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.font = "12px monospace"
      ctx.fillText(`Buy: $${anchorData.buyPrice}`, 10, buyY - 10)
      ctx.fillText(`Sell: $${anchorData.sellPrice}`, 10, sellY + 20)
      ctx.fillText(`Spot: $${anchorData.spotPrice}`, 10, spotY - 10)

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isAnimating) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, anchorData])

  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const simulateTradeImpact = (type: "buy" | "sell") => {
    const impact = 20 + Math.random() * 30 // Random impact between 20-50
    setAnchorData((prev) => ({
      ...prev,
      buyPrice: type === "buy" ? prev.buyPrice + impact : prev.buyPrice - impact * 0.5,
      sellPrice: type === "sell" ? prev.sellPrice - impact : prev.sellPrice + impact * 0.5,
    }))

    // Reset after 3 seconds
    setTimeout(() => {
      setAnchorData((prev) => ({
        ...prev,
        buyPrice: 3250,
        sellPrice: 3150,
      }))
    }, 3000)
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Anchor className="h-5 w-5 text-accent" />
            Price Anchor Behavior
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleToggleAnimation}>
            {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visualization Canvas */}
        <div className="relative bg-gradient-to-b from-bg-900 to-bg-800 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-64" />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {isAnimating ? "Live" : "Paused"}
            </Badge>
          </div>
        </div>

        {/* Price Information */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-500 font-medium">Buy Price</p>
            <p className="text-lg font-bold text-green-500">${anchorData.buyPrice.toFixed(0)}</p>
          </div>
          <div className="text-center p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-xs text-accent font-medium">Spot Price</p>
            <p className="text-lg font-bold text-accent">${anchorData.spotPrice.toFixed(0)}</p>
          </div>
          <div className="text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-xs text-red-500 font-medium">Sell Price</p>
            <p className="text-lg font-bold text-red-500">${anchorData.sellPrice.toFixed(0)}</p>
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => simulateTradeImpact("buy")}
            className="flex-1 border-green-500/30 text-green-500 hover:bg-green-500/10"
          >
            Simulate Buy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => simulateTradeImpact("sell")}
            className="flex-1 border-red-500/30 text-red-500 hover:bg-red-500/10"
          >
            Simulate Sell
          </Button>
        </div>

        {/* Legend */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Green line: Buy price anchor (starts above spot, relaxes down)</p>
          <p>• Red line: Sell price anchor (starts below spot, relaxes up)</p>
          <p>• Blue dashed: Current spot price</p>
          <p>• Dots: Anchor convergence over time</p>
        </div>
      </CardContent>
    </Card>
  )
}
