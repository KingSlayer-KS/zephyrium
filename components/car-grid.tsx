"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Star } from "lucide-react"
import type { Car } from "@/types/car"

interface CarGridProps {
  cars: Car[]
  isLoading?: boolean
}

export function CarGrid({ cars, isLoading }: CarGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  if (isLoading) {
    return <CarGrid.Skeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <motion.div
          key={car.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="perspective-container"
          onHoverStart={() => setHoveredCard(car.id)}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Card className="overflow-hidden h-full flex flex-col premium-card border shadow-md">
            <div className="relative premium-image-container">
              <Image
                src={car.images[0] || "/placeholder.svg"}
                alt={`${car.year} ${car.make} ${car.model}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover premium-image"
              />
              {car.isNew && <Badge className="absolute top-2 left-2 bg-primary">New</Badge>}
              <motion.div className="absolute top-2 right-2" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-primary"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0"
                animate={{ opacity: hoveredCard === car.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <CardContent className="flex-grow p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">
                  {car.year} {car.make} {car.model}
                </h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{car.rating}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary">${car.price.toLocaleString()}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-3">{car.mileage.toLocaleString()} km</span>
                  <span>{car.location}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{car.transmission}</Badge>
                  <Badge variant="secondary">{car.fuelType}</Badge>
                  <Badge variant="secondary">{car.drivetrain}</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Link href={`/cars/${car.id}`} className="w-full">
                <Button className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// Skeleton loader
CarGrid.Skeleton = function CarGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-5">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/2 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
          <CardFooter className="p-5 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

