"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SwapButtonProps {
  onClick: () => void
  isAnimating?: boolean
  className?: string
}

export const SwapButton = forwardRef<HTMLButtonElement, SwapButtonProps>(
  ({ onClick, isAnimating = false, className }, ref) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = {
        id: Date.now(),
        x,
        y,
      }

      setRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)

      onClick()
    }

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        variant="outline"
        size="sm"
        className={cn(
          "relative overflow-hidden w-12 h-12 rounded-full border-2 border-accent/30 bg-accent/10 hover:bg-accent/20 transition-all duration-300 group",
          isAnimating && "scale-110 rotate-180",
          className,
        )}
      >
        <ArrowUpDown
          className={cn(
            "h-5 w-5 text-accent transition-all duration-300 group-hover:scale-110",
            isAnimating && "rotate-180",
          )}
        />

        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-accent/30 animate-ripple pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
    )
  },
)

SwapButton.displayName = "SwapButton"
