import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MobileHeader } from "@/components/mobile-header"
import { CarDetails } from "@/components/car-details"
import { ScrollToTop } from "@/components/scroll-to-top"
import carsData from "@/data/cars.json"

export default function CarPage({ params }: { params: { id: string } }) {
  // Find the car with the matching ID
  const car = carsData.cars.find((car) => car.id === params.id)

  // If car not found, return 404
  if (!car) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Add ScrollToTop component */}
      <ScrollToTop />

      {/* Show different headers for mobile and desktop */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <main className="flex-1 bg-gray-50">
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
          <CarDetails car={car} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

