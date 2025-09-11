"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, TrendingUp, TrendingDown } from "lucide-react"

const simulationResults = [
  {
    scenario: "High Volume Trading",
    trades: 247,
    avgPriceImpact: 1.2,
    totalVolume: "$2.4M",
    anchorStability: 94,
    efficiency: 97,
  },
  {
    scenario: "Low Liquidity Stress Test",
    trades: 89,
    avgPriceImpact: 4.7,
    totalVolume: "$890K",
    anchorStability: 78,
    efficiency: 82,
  },
  {
    scenario: "Rapid Price Discovery",
    trades: 156,
    avgPriceImpact: 2.1,
    totalVolume: "$1.6M",
    anchorStability: 89,
    efficiency: 91,
  },
]

export function SimulationResults() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Simulation Results
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {simulationResults.map((result, index) => (
          <div key={index} className="p-4 bg-muted/20 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{result.scenario}</h3>
              <Badge variant="secondary" className="text-xs">
                Completed
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Trades:</span>
                  <span className="font-medium">{result.trades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Price Impact:</span>
                  <span className={`font-medium ${result.avgPriceImpact > 3 ? "text-red-500" : "text-green-500"}`}>
                    {result.avgPriceImpact}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Volume:</span>
                  <span className="font-medium">{result.totalVolume}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Anchor Stability:</span>
                  <div className="flex items-center gap-1">
                    {result.anchorStability > 90 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-yellow-500" />
                    )}
                    <span className="font-medium">{result.anchorStability}%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency:</span>
                  <div className="flex items-center gap-1">
                    {result.efficiency > 90 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-yellow-500" />
                    )}
                    <span className="font-medium">{result.efficiency}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Overall Performance</span>
                <span>{Math.round((result.anchorStability + result.efficiency) / 2)}%</span>
              </div>
              <div className="w-full bg-muted/40 rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(result.anchorStability + result.efficiency) / 2}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <Button variant="ghost" size="sm" className="w-full text-accent hover:text-accent-cyan-2">
            View Detailed Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
