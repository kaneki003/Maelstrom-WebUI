"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap } from "lucide-react"

interface LiquidityFlowWidgetProps {
  token: string
}

export function LiquidityFlowWidget({ token }: LiquidityFlowWidgetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [tradeSize, setTradeSize] = useState([1])
  const [flowIntensity, setFlowIntensity] = useState(0.5)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    let time = 0
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
    }> = []

    const animate = () => {
      time += 0.02
      const width = canvas.width / 2
      const height = canvas.height / 2

      // Clear canvas
      ctx.fillStyle = "rgba(4, 19, 43, 0.1)"
      ctx.fillRect(0, 0, width, height)

      // Create new particles based on flow intensity
      if (Math.random() < flowIntensity) {
        particles.push({
          x: 20,
          y: height / 2 + (Math.random() - 0.5) * 20,
          vx: 1 + Math.random() * 2,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0,
          maxLife: 100 + Math.random() * 50,
          size: 2 + Math.random() * 3,
        })
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.life++

        // Update position with flow curve
        particle.x += particle.vx
        particle.y += particle.vy + Math.sin(particle.x * 0.02 + time) * 0.3

        // Draw particle
        const alpha = 1 - particle.life / particle.maxLife
        const hue = 195 + Math.sin(time + particle.x * 0.01) * 20 // Cyan variations
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = `hsla(${hue}, 70%, 60%, ${alpha * 0.5})`
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0

        // Remove dead particles
        if (particle.life >= particle.maxLife || particle.x > width) {
          particles.splice(i, 1)
        }
      }

      // Draw flow paths
      ctx.strokeStyle = "rgba(0, 216, 255, 0.2)"
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0; x < width; x += 10) {
        const y = height / 2 + Math.sin(x * 0.02 + time) * 15
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Draw ETH and Token pools
      const ethPoolX = 30
      const tokenPoolX = width - 50
      const poolY = height / 2

      // ETH Pool
      ctx.fillStyle = "rgba(0, 216, 255, 0.3)"
      ctx.beginPath()
      ctx.arc(ethPoolX, poolY, 15 + Math.sin(time * 2) * 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 216, 255, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Token Pool
      ctx.fillStyle = "rgba(43, 211, 255, 0.3)"
      ctx.beginPath()
      ctx.arc(tokenPoolX, poolY, 15 + Math.cos(time * 2) * 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "rgba(43, 211, 255, 0.8)"
      ctx.stroke()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [flowIntensity])

  useEffect(() => {
    // Update flow intensity based on trade size
    setFlowIntensity(tradeSize[0] / 10)
  }, [tradeSize])

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent" />
          Liquidity Flow
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Canvas */}
        <div className="relative bg-gradient-to-r from-bg-900 to-bg-800 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-32" />

          {/* Pool Labels */}
          <div className="absolute top-2 left-4 text-xs text-accent font-medium">ETH</div>
          <div className="absolute top-2 right-4 text-xs text-accent font-medium">{token.toUpperCase()}</div>

          {/* Flow Direction */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <Badge variant="outline" className="text-xs border-accent/30 text-accent">
              <Zap className="h-3 w-3 mr-1" />
              Live Flow
            </Badge>
          </div>
        </div>

        {/* Trade Size Simulator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Simulate Trade Size</span>
            <Badge variant="secondary" className="text-xs">
              {tradeSize[0]} ETH
            </Badge>
          </div>

          <Slider value={tradeSize} onValueChange={setTradeSize} max={10} min={0.1} step={0.1} className="w-full" />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.1 ETH</span>
            <span>10 ETH</span>
          </div>
        </div>

        {/* Flow Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Flow Rate</p>
            <p className="text-sm font-semibold text-accent">{(flowIntensity * 100).toFixed(0)}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Price Impact</p>
            <p className="text-sm font-semibold text-yellow-500">{(tradeSize[0] * 0.3).toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
