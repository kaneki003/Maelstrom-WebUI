import { Header } from "@/components/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ValuePropsSection } from "@/components/landing/value-props-section"
import { StatsSection } from "@/components/landing/stats-section"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { WaitlistSection } from "@/components/landing/waitlist-section"
import { Footer } from "@/components/footer"
import { WelcomeTour } from "@/components/onboarding/welcome-tour"
import { RealTimeTicker } from "@/components/ui/real-time-ticker"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RealTimeTicker />
      <main>
        <HeroSection />
        <ValuePropsSection />
        <StatsSection />
        {/* <ProductShowcase />
        <WaitlistSection /> */}
      </main>
      <Footer />
      <WelcomeTour />
    </div>
  )
}
