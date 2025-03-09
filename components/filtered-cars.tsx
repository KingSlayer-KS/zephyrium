import { Suspense } from "react"
import { CarGrid } from "@/components/car-grid"
import carsData from "@/data/cars.json"

interface FilteredCarsProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function FilteredCars({ searchParams }: FilteredCarsProps) {
  // Extract filter parameters
  const { make, type, bodyStyle, minPrice, maxPrice, minYear, maxYear, transmission, fuelType, drivetrain } =
    searchParams

  // Filter cars based on search parameters
  const filteredCars = carsData.cars.filter((car) => {
    if (make && car.make !== make) return false
    if (type && car.type !== type) return false
    if (bodyStyle && car.bodyStyle !== bodyStyle) return false
    if (minPrice && car.price < Number(minPrice)) return false
    if (maxPrice && car.price > Number(maxPrice)) return false
    if (minYear && car.year < Number(minYear)) return false
    if (maxYear && car.year > Number(maxYear)) return false
    if (transmission && car.transmission !== transmission) return false
    if (fuelType && car.fuelType !== fuelType) return false
    if (drivetrain && car.drivetrain !== drivetrain) return false
    return true
  })

  // Sort cars by price (you can add more sorting options)
  const sortedCars = [...filteredCars].sort((a, b) => a.price - b.price)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{filteredCars.length} vehicles available</h2>
        <div className="flex items-center gap-4">{/* Add sorting options here */}</div>
      </div>

      <Suspense fallback={<CarGrid.Skeleton />}>
        <CarGrid cars={sortedCars} />
      </Suspense>
    </div>
  )
}

