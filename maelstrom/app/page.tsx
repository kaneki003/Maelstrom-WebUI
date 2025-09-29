import { Header } from "@/components/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ValuePropsSection } from "@/components/landing/value-props-section"
import { StatsSection } from "@/components/landing/stats-section"
import { Footer } from "@/components/footer"
import { RealTimeTicker } from "@/components/ui/real-time-ticker"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <RealTimeTicker />
      <main className="bg-gradient-pattern overflow-hidden">
        <HeroSection />
        <ValuePropsSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
