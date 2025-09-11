import Link from "next/link"
import { Waves, Twitter, Github, MessageCircle, Mail } from "lucide-react"

const footerLinks = {
  Product: [
    { name: "Swap", href: "/swap" },
    { name: "Tokens", href: "/tokens" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Sandbox", href: "/sandbox" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "FAQ", href: "/faq" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Waves className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">Maelstrom</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              The next generation DeFi trading platform with fluid liquidity mechanics and seamless user experience.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://discord.com" className="text-muted-foreground hover:text-accent transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@maelstrom.fi"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2024 Maelstrom. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Built with ❤️ for the DeFi community</p>
        </div>
      </div>
    </footer>
  )
}
