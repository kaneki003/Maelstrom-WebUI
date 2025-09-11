"use client"

import { useEffect } from "react"
import { useTour } from "@/components/ui/guided-tour"
import { useNotifications } from "@/components/ui/notification-system"

const welcomeTourSteps = [
  {
    id: "welcome",
    title: "Welcome to Maelstrom",
    content: "Let's take a quick tour of the platform to get you started with DeFi trading.",
    target: "[data-tour='header']",
    position: "bottom" as const,
  },
  {
    id: "wallet",
    title: "Connect Your Wallet",
    content: "First, connect your wallet to start trading. We support MetaMask, WalletConnect, and more.",
    target: "[data-tour='wallet-button']",
    position: "bottom" as const,
    action: {
      label: "Connect Wallet",
      onClick: () => {
        // Simulate wallet connection
        console.log("Connecting wallet...")
      },
    },
  },
  {
    id: "swap",
    title: "Swap Tokens",
    content: "Use the swap interface to exchange tokens with minimal slippage and optimal pricing.",
    target: "[data-tour='swap-link']",
    position: "bottom" as const,
  },
  {
    id: "dashboard",
    title: "View Your Portfolio",
    content: "Monitor your positions, track performance, and manage your liquidity from the dashboard.",
    target: "[data-tour='dashboard-link']",
    position: "bottom" as const,
  },
  {
    id: "sandbox",
    title: "Try the Sandbox",
    content: "Experiment with trading strategies in our risk-free sandbox environment.",
    target: "[data-tour='sandbox-link']",
    position: "bottom" as const,
  },
]

export function WelcomeTour() {
  const { startTour } = useTour()
  const { addNotification } = useNotifications()

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem("maelstrom-tour-completed")

    if (!hasSeenTour) {
      // Delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        addNotification({
          type: "info",
          title: "Welcome to Maelstrom!",
          message: "Would you like a quick tour of the platform?",
          duration: 0,
          action: {
            label: "Start Tour",
            onClick: () => {
              startTour(welcomeTourSteps)
              localStorage.setItem("maelstrom-tour-completed", "true")
            },
          },
        })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [startTour, addNotification])

  return null
}
