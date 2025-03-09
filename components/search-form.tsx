"use client"
import { useState, useRef } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Car } from "lucide-react"
import { motion } from "framer-motion"
import { Spotlight } from "@/components/ui/aceternity/spotlight"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function SearchForm() {
  const router = useRouter()
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [activeTab, setActiveTab] = useState("buy")
  const [postalCode, setPostalCode] = useState("")
  const [bodyStyle, setBodyStyle] = useState("")
  const formRef = useRef<HTMLDivElement>(null)

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query parameters based on form values
    const params = new URLSearchParams()

    if (bodyStyle && bodyStyle !== "all") {
      params.set("bodyStyle", bodyStyle)
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString())
    }

    if (priceRange[1] < 200000) {
      params.set("maxPrice", priceRange[1].toString())
    }

    if (postalCode) {
      params.set("location", postalCode)
    }

    // Navigate to cars page with filters and scroll to top
    router.push(`/cars?${params.toString()}`, { scroll: true })
  }

  const bodyTypes = [
    { value: "all", label: "All Types" },
    { value: "SUV", label: "SUV" },
    { value: "Sedan", label: "Sedan" },
    { value: "Truck", label: "Truck" },
    { value: "Coupe", label: "Coupe" },
    { value: "Convertible", label: "Convertible" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "Wagon", label: "Wagon" },
    { value: "Van", label: "Van/Minivan" },
  ]

  return (
    <Spotlight className="w-full max-w-4xl">
      <motion.div ref={formRef} className="w-full">
        <Card className="w-full border shadow-lg bg-white overflow-hidden">
          <CardContent className="p-0">
            {/* Toggle between Buy and Sell */}
            <div className="bg-gray-50 p-6 border-b">
              <ToggleGroup
                type="single"
                value={activeTab}
                onValueChange={(value) => value && setActiveTab(value)}
                className="w-full grid grid-cols-2 gap-2"
              >
                <ToggleGroupItem
                  value="buy"
                  className={`text-base py-4 rounded-lg transition-all ${
                    activeTab === "buy" ? "bg-primary text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Search className="mr-2 h-5 w-5" /> Buy a Car
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="sell"
                  className={`text-base py-4 rounded-lg transition-all ${
                    activeTab === "sell"
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Car className="mr-2 h-5 w-5" /> Sell Your Car
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Content based on active tab */}
            <div className="p-6">
              {activeTab === "buy" ? (
                <form onSubmit={handleSearch} className="space-y-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="postal-code" className="text-base font-medium mb-2 block">
                        Postal Code
                      </Label>
                      <Input
                        id="postal-code"
                        placeholder="Enter your postal code"
                        className="h-12 text-base rounded-lg"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="body-type" className="text-base font-medium mb-2 block">
                        Body Type
                      </Label>
                      <Select value={bodyStyle} onValueChange={setBodyStyle}>
                        <SelectTrigger id="body-type" className="h-12 text-base rounded-lg">
                          <SelectValue placeholder="Any Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bodyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-medium">Price Range</Label>
                      <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                        ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                      </span>
                    </div>

                    <Slider
                      defaultValue={[0, 100000]}
                      max={200000}
                      step={1000}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="py-4"
                    />

                    <div className="flex justify-between text-sm text-gray-500 px-1">
                      <span>$0</span>
                      <span>$100k</span>
                      <span>$200k+</span>
                    </div>
                  </div>

                  <motion.div
                    className="background-shine"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-14 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-lg"
                      size="lg"
                    >
                      <Search className="mr-2 h-5 w-5" /> Find Cars
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="car-make" className="text-base font-medium mb-2 block">
                        Make
                      </Label>
                      <Select>
                        <SelectTrigger id="car-make" className="h-12 text-base rounded-lg">
                          <SelectValue placeholder="Select Make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="chevrolet">Chevrolet</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                          <SelectItem value="audi">Audi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="car-model" className="text-base font-medium mb-2 block">
                        Model
                      </Label>
                      <Select>
                        <SelectTrigger id="car-model" className="h-12 text-base rounded-lg">
                          <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="select-make-first">Select Make First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="car-year" className="text-base font-medium mb-2 block">
                        Year
                      </Label>
                      <Select>
                        <SelectTrigger id="car-year" className="h-12 text-base rounded-lg">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => {
                            const year = new Date().getFullYear() - i
                            return (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="postal-code-sell" className="text-base font-medium mb-2 block">
                        Postal Code
                      </Label>
                      <Input
                        id="postal-code-sell"
                        placeholder="Enter your postal code"
                        className="h-12 text-base rounded-lg"
                      />
                    </div>
                  </div>

                  <motion.div
                    className="background-shine"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      className="w-full h-14 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-lg"
                      size="lg"
                    >
                      <Car className="mr-2 h-5 w-5" /> Get Your Car Value
                    </Button>
                  </motion.div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Spotlight>
  )
}

