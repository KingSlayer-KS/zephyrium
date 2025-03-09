import { PremiumHero } from "@/components/premium-hero"
import { BrandCarousel } from "@/components/brand-carousel"
import { FeatureSection } from "@/components/feature-section"
import { BestSellers } from "@/components/best-sellers"
import { BudgetCalculator } from "@/components/budget-calculator"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PremiumHero />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <BrandCarousel />
          </div>
        </section>
        <BestSellers />
        <BudgetCalculator />
        <div className="relative">
          <FeatureSection />
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  )
}

