"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"

const showcaseItems = [
  {
    title: "Advanced Trading Interface",
    description: "Professional-grade tools with real-time price feeds and advanced order types.",
    image: "/modern-trading-interface-dashboard.jpg",
    badge: "Live",
    features: ["Real-time Charts", "Advanced Orders", "Portfolio Analytics"],
  },
  {
    title: "Liquidity Pool Management",
    description: "Intuitive pool creation and management with automated rebalancing strategies.",
    image: "/liquidity-pool-management-interface.jpg",
    badge: "New",
    features: ["Auto-Rebalancing", "Yield Optimization", "Risk Management"],
  },
  {
    title: "Mobile-First Experience",
    description: "Trade on the go with our responsive mobile interface and native app.",
    image: "/mobile-trading-app-interface.png",
    badge: "Coming Soon",
    features: ["Native Apps", "Push Notifications", "Offline Mode"],
  },
]

export function ProductShowcase() {
  const [activeItem, setActiveItem] = useState(0)

  return (
    <section className="py-24 bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Experience the <span className="text-accent">Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the features that make Maelstrom the most advanced DeFi trading platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-6">
            {showcaseItems.map((item, index) => (
              <Card
                key={item.title}
                className={`cursor-pointer transition-all duration-300 border-border/50 ${
                  activeItem === index ? "bg-accent/10 border-accent/50 shadow-medium" : "bg-card/50 hover:bg-accent/5"
                }`}
                onClick={() => setActiveItem(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <Badge
                      variant={item.badge === "Live" ? "default" : item.badge === "New" ? "secondary" : "outline"}
                      className={
                        item.badge === "Live"
                          ? "bg-green-500/10 text-green-500"
                          : item.badge === "New"
                            ? "bg-accent/10 text-accent"
                            : ""
                      }
                    >
                      {item.badge}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4 text-pretty">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  {activeItem === index && (
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent-cyan-2">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Preview Image */}
          <div className="relative">
            <Card className="overflow-hidden border-border/50 shadow-medium">
              <div className="relative aspect-3/2 bg-muted/20">
                <Image
                  src={showcaseItems[activeItem].image || "/placeholder.svg"}
                  alt={showcaseItems[activeItem].title}
                  fill
                  className="object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-accent/20 animate-float" />
            <div
              className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-accent/30 animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
