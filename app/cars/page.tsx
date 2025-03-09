import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CarFilters } from "@/components/car-filters"
import { CarGrid } from "@/components/car-grid"
import { FilteredCars } from "@/components/filtered-cars"
import { MobileHeader } from "@/components/mobile-header"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function CarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
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
        <div className="container mx-auto px-4 py-4 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Filters */}
            <div className="w-full lg:w-1/4">
              <CarFilters />
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              <Suspense fallback={<CarGrid.Skeleton />}>
                <FilteredCars searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

