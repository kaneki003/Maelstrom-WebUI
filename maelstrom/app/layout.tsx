import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { NotificationProvider } from "@/components/ui/notification-system"
import { TourProvider } from "@/components/ui/guided-tour"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Maelstrom UI - Next-Gen DeFi Trading",
  description:
    "Experience fluid, innovative DeFi trading with advanced liquidity mechanics and seamless user experience.",
  generator: "maelstrom-ui",
  keywords: ["DeFi", "trading", "liquidity", "blockchain", "swap", "tokens"],
  authors: [{ name: "Maelstrom Team" }],
  openGraph: {
    title: "Maelstrom UI - Next-Gen DeFi Trading",
    description: "Experience fluid, innovative DeFi trading with advanced liquidity mechanics.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maelstrom UI - Next-Gen DeFi Trading",
    description: "Experience fluid, innovative DeFi trading with advanced liquidity mechanics.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <NotificationProvider>
              <TourProvider>{children}</TourProvider>
            </NotificationProvider>
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
