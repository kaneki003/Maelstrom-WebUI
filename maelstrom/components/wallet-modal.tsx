"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

// Mock wallet data
const mockWallet = {
  address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
  balance: "2.4567",
  connected: false,
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [isConnected, setIsConnected] = useState(mockWallet.connected)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsConnected(true)
    setIsConnecting(false)
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to MetaMask",
    })
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(mockWallet.address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-accent" />
            {isConnected ? "Wallet Connected" : "Connect Wallet"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!isConnected ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Connect your wallet to start trading on Maelstrom</p>

              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full bg-accent hover:bg-accent-cyan-2 text-accent-foreground"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect MetaMask
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                This is a demo. No real wallet connection is made.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Connected
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Address:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {mockWallet.address.slice(0, 6)}...{mockWallet.address.slice(-4)}
                    </code>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ETH Balance:</span>
                  <span className="text-sm font-mono">{mockWallet.balance} ETH</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://etherscan.io", "_blank")}
                  className="flex-1"
                >
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View on Etherscan
                </Button>
                <Button variant="outline" size="sm" onClick={handleDisconnect} className="flex-1 bg-transparent">
                  Disconnect
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
