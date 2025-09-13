"use client"

import { useEffect, useRef } from "react"

interface AnimatedCircularTextProps {
  text: string
  className?: string
  radius?: number
  speed?: number
}

export function AnimatedCircularText({ text, className = "", radius = 120, speed = 0.02 }: AnimatedCircularTextProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const textPath = svg.querySelector("textPath")
    if (!textPath) return

    let rotation = 0

    const animate = () => {
      rotation += speed
      textPath.setAttribute("startOffset", `${(rotation * 100) % 100}%`)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed])

  const circumference = 2 * Math.PI * radius
  const adjustedText = text.length < 50 ? text.repeat(Math.ceil(50 / text.length)) : text

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        ref={svgRef}
        width={radius * 2 + 40}
        height={radius * 2 + 40}
        viewBox={`0 0 ${radius * 2 + 40} ${radius * 2 + 40}`}
        className={className}
      >
        <defs>
          <path id="circle-path" d={`M ${radius + 20} 20 A ${radius} ${radius} 0 1 1 ${radius + 19.9} 20`} />
        </defs>
        <text fontSize="14" fontWeight="500" letterSpacing="2px" className="fill-current">
          <textPath href="#circle-path" startOffset="0%">
            {adjustedText}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
