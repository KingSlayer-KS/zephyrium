"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import carsData from "@/data/cars.json"

const filterSections = [
  {
    id: "make",
    label: "Make",
  },
  {
    id: "model",
    label: "Model",
  },
  {
    id: "bodyStyle",
    label: "Body Style",
  },
  {
    id: "price",
    label: "Price & Payment",
  },
  {
    id: "year",
    label: "Year",
  },
  {
    id: "mileage",
    label: "Mileage",
  },
  {
    id: "exteriorColor",
    label: "Exterior Color",
  },
  {
    id: "interiorColor",
    label: "Interior Color",
  },
  {
    id: "drivetrain",
    label: "Drivetrain",
  },
  {
    id: "transmission",
    label: "Transmission",
  },
  {
    id: "fuelType",
    label: "Fuel Type",
  },
  {
    id: "features",
    label: "Features",
  },
  {
    id: "numberOfSeats",
    label: "Number of Seats",
  },
  {
    id: "numberOfDoors",
    label: "Number of Doors",
  },
  {
    id: "dealRating",
    label: "Deal Rating",
  },
  {
    id: "vehicleHistory",
    label: "Vehicle History",
  },
]

export function FilterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  // Get current filter values from URL
  const currentFilters = Object.fromEntries(searchParams.entries())

  // Create URL with updated params
  const createQueryString = (params: Record<string, string | string[] | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key)
      } else if (Array.isArray(value)) {
        newSearchParams.delete(key)
        value.forEach((v) => newSearchParams.append(key, v))
      } else {
        newSearchParams.set(key, value)
      }
    })

    return newSearchParams.toString()
  }

  // Update filters
  const updateFilters = (params: Record<string, string | string[] | null>) => {
    router.push(`/cars?${createQueryString(params)}`, { scroll: false })
  }

  // Clear all filters
  const clearFilters = () => {
    router.push("/cars")
  }

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const renderFilterSection = (section: { id: string; label: string }) => {
    switch (section.id) {
      case "make":
        return (
          <div className="space-y-2">
            {carsData.makes.map((make) => (
              <div key={make} className="flex items-center space-x-2">
                <Checkbox
                  id={`make-${make}`}
                  checked={currentFilters.make === make}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      make: checked ? make : null,
                    })
                  }}
                />
                <Label htmlFor={`make-${make}`} className="text-sm">
                  {make}
                </Label>
              </div>
            ))}
          </div>
        )

      case "bodyStyle":
        return (
          <div className="space-y-2">
            {carsData.bodyStyles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`bodyStyle-${style}`}
                  checked={currentFilters.bodyStyle === style}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      bodyStyle: checked ? style : null,
                    })
                  }}
                />
                <Label htmlFor={`bodyStyle-${style}`} className="text-sm">
                  {style}
                </Label>
              </div>
            ))}
          </div>
        )

      case "price":
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="minPrice" className="text-sm">
                  Min Price
                </Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Min"
                  value={currentFilters.minPrice || ""}
                  onChange={(e) => updateFilters({ minPrice: e.target.value || null })}
                  className="h-10"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="maxPrice" className="text-sm">
                  Max Price
                </Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Max"
                  value={currentFilters.maxPrice || ""}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value || null })}
                  className="h-10"
                />
              </div>
            </div>
          </div>
        )

      case "year":
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="minYear" className="text-sm">
                  From
                </Label>
                <Select
                  value={currentFilters.minYear || ""}
                  onValueChange={(value) => updateFilters({ minYear: value || null })}
                >
                  <SelectTrigger id="minYear" className="h-10">
                    <SelectValue placeholder="From Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="maxYear" className="text-sm">
                  To
                </Label>
                <Select
                  value={currentFilters.maxYear || ""}
                  onValueChange={(value) => updateFilters({ maxYear: value || null })}
                >
                  <SelectTrigger id="maxYear" className="h-10">
                    <SelectValue placeholder="To Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "mileage":
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="minMileage" className="text-sm">
                  Min Mileage
                </Label>
                <Input
                  id="minMileage"
                  type="number"
                  placeholder="Min"
                  value={currentFilters.minMileage || ""}
                  onChange={(e) => updateFilters({ minMileage: e.target.value || null })}
                  className="h-10"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="maxMileage" className="text-sm">
                  Max Mileage
                </Label>
                <Input
                  id="maxMileage"
                  type="number"
                  placeholder="Max"
                  value={currentFilters.maxMileage || ""}
                  onChange={(e) => updateFilters({ maxMileage: e.target.value || null })}
                  className="h-10"
                />
              </div>
            </div>
          </div>
        )

      case "transmission":
        return (
          <div className="space-y-2">
            {carsData.transmissions.map((transmission) => (
              <div key={transmission} className="flex items-center space-x-2">
                <Checkbox
                  id={`transmission-${transmission}`}
                  checked={currentFilters.transmission === transmission}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      transmission: checked ? transmission : null,
                    })
                  }}
                />
                <Label htmlFor={`transmission-${transmission}`} className="text-sm">
                  {transmission}
                </Label>
              </div>
            ))}
          </div>
        )

      case "fuelType":
        return (
          <div className="space-y-2">
            {carsData.fuelTypes.map((fuelType) => (
              <div key={fuelType} className="flex items-center space-x-2">
                <Checkbox
                  id={`fuelType-${fuelType}`}
                  checked={currentFilters.fuelType === fuelType}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      fuelType: checked ? fuelType : null,
                    })
                  }}
                />
                <Label htmlFor={`fuelType-${fuelType}`} className="text-sm">
                  {fuelType}
                </Label>
              </div>
            ))}
          </div>
        )

      case "drivetrain":
        return (
          <div className="space-y-2">
            {carsData.drivetrains.map((drivetrain) => (
              <div key={drivetrain} className="flex items-center space-x-2">
                <Checkbox
                  id={`drivetrain-${drivetrain}`}
                  checked={currentFilters.drivetrain === drivetrain}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      drivetrain: checked ? drivetrain : null,
                    })
                  }}
                />
                <Label htmlFor={`drivetrain-${drivetrain}`} className="text-sm">
                  {drivetrain}
                </Label>
              </div>
            ))}
          </div>
        )

      case "exteriorColor":
        return (
          <div className="space-y-2">
            {carsData.colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`exteriorColor-${color}`}
                  checked={currentFilters.exteriorColor === color}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      exteriorColor: checked ? color : null,
                    })
                  }}
                />
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.toLowerCase() }} />
                  <Label htmlFor={`exteriorColor-${color}`} className="text-sm">
                    {color}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        )

      // Add more cases for other filter types as needed

      default:
        return <div className="text-sm text-gray-500 italic">Filter options coming soon</div>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <Accordion type="multiple" value={expandedSections} onValueChange={setExpandedSections} className="space-y-2">
        {filterSections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gray-50">
              <span className="text-sm font-medium">{section.label}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3">{renderFilterSection(section)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Clear Filters Button */}
      {Object.keys(currentFilters).length > 0 && (
        <Button variant="outline" className="w-full mt-6" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear All Filters ({Object.keys(currentFilters).length})
        </Button>
      )}
    </div>
  )
}

