"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletModal } from "@/components/wallet-modal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Swap", href: "/swap" },
  { name: "Tokens", href: "/tokens" },
  { name: "Dashboard", href: "/dashboard" },
];

const popularTokens = [
  { symbol: "ETH", name: "Ethereum", href: "/tokens/eth" },
  { symbol: "DAI", name: "Dai Stablecoin", href: "/tokens/dai" },
  { symbol: "USDC", name: "USD Coin", href: "/tokens/usdc" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", href: "/tokens/wbtc" },
];

export function Header() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        data-tour="header"
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
      >
        <div className="p-4 w-full flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img
                src="/logo_maelstrom.svg"
                alt="Maelstrom Logo"
                className="h-8 w-8 transition-all duration-300 group-hover:scale-110 dark:invert"
              />
            </div>
            <span className="text-xl font-bold gradient-text">Maelstrom</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                data-tour={`${item.name.toLowerCase()}-link`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent relative group",
                  pathname === item.href
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <ConnectButton accountStatus={"address"} showBalance={false} />
          </div>
        </div>
      </header>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
}
