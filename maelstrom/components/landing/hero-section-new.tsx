"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LiquidCanvas } from "@/components/ui/liquid-canvas";
import { WaveRippleCanvas } from "@/components/ui/wave-ripple-canvas";
import { AnimatedCircularText } from "@/components/ui/animated-circular-text";
import CircularText from "@/components/CircularText";
import { ArrowRight, Play, Waves, Droplets } from "lucide-react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [canvasType, setCanvasType] = useState<'liquid' | 'wave'>('wave');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Canvas Layer */}
      <div className="absolute inset-0 z-0">
        {canvasType === 'liquid' ? (
          <LiquidCanvas mousePosition={mousePosition} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90" />
        )}
      </div>

      {/* Canvas Toggle Button */}
      <div className="absolute top-4 right-4 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCanvasType(canvasType === 'liquid' ? 'wave' : 'liquid')}
          className="bg-background/20 backdrop-blur-sm border border-border/50 hover:bg-background/30"
        >
          {canvasType === 'liquid' ? (
            <>
              <Waves className="h-4 w-4 mr-2" />
              Wave Effect
            </>
          ) : (
            <>
              <Droplets className="h-4 w-4 mr-2" />
              Liquid Effect
            </>
          )}
        </Button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/40 to-background/80 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Animated Circular Text */}
          <div className="absolute inset-0">
          </div>
          <CircularText
            text="LIQUIDITY*MAELSTROM*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              <span className="gradient-text-animated">Liquid Trading</span>
              <br />
              <span className="text-foreground">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience the future of DeFi with fluid price discovery, deep
              liquidity pools, and seamless trading mechanics that adapt to
              market dynamics.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent-cyan-2 text-accent-foreground glow-primary"
            >
              <Link href="/swap">
                Enter App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-accent/30 hover:border-accent bg-transparent"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Audited Smart Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>$50M+ TVL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Zero Slippage Trading</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Canvas Overlay - This will create distortion effects on top of content */}
      {canvasType === 'wave' && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <WaveRippleCanvas mousePosition={mousePosition} text="Maelstrom" />
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
