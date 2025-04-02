"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, Star, ChevronRight } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import carsData from "@/data/cars.json"
import type { Car } from "@/types/car"

const bodyStyles = [
  { id: "SUV", name: "SUVs" },
  { id: "Sedan", name: "Sedans" },
  { id: "Pickup", name: "Trucks" },
  { id: "Coupe", name: "Coupes" },
  { id: "Convertible", name: "Convertibles" },
]

export function BestSellers() {
  const [activeTab, setActiveTab] = useState("SUV")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  // Organize cars by body style
  const carsByBodyStyle = useMemo(() => {
    const result: Record<string, Car[]> = {}

    // Initialize with empty arrays for each body style
    bodyStyles.forEach((style) => {
      result[style.id] = []
    })

    // Fill with cars from the JSON data
    carsData.cars.forEach((car) => {
      if (result[car.bodyStyle]) {
        result[car.bodyStyle].push(car)
      }
    })

    return result
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0

        if (isInView) {
          controls.start("visible")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  const handleTabChange = (value: string) => {
    if (value) setActiveTab(value)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hover: {
      y: -15,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
      <motion.div className="container mx-auto px-4" style={{ opacity, y }}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Best Sellers by <span className="text-gradient">Body Style</span>
          </h2>
        </motion.div>

        {/* Toggle group for body styles */}
        <div className="mb-12">
          <ToggleGroup
            type="single"
            value={activeTab}
            onValueChange={handleTabChange}
            className="flex flex-wrap justify-center gap-2 p-2 bg-white rounded-xl shadow-md mx-auto max-w-3xl"
          >
            {bodyStyles.map((style) => (
              <ToggleGroupItem
                key={style.id}
                value={style.id}
                className={`px-6 py-3 text-base font-medium rounded-lg transition-all ${
                  activeTab === style.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {style.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div>
          {bodyStyles.map(
            (style) =>
              style.id === activeTab && (
                <motion.div
                  key={style.id}
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {carsByBodyStyle[style.id].slice(0, 4).map((car, index) => (
                    <motion.div
                      key={car.id}
                      custom={index}
                      variants={cardVariants}
                      whileHover="hover"
                      onHoverStart={() => setHoveredCard(car.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="perspective-container"
                    >
                      <Card className="overflow-hidden h-full flex flex-col premium-card border shadow-md">
                        <div className="relative premium-image-container">
                          <Image
                            src={car.images[0] || "/placeholder.svg?height=200&width=300"}
                            alt={`${car.year} ${car.make} ${car.model}`}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover premium-image"
                          />
                          {car.isNew && <Badge className="absolute top-2 left-2 bg-primary">New</Badge>}
                          <motion.div
                            className="absolute top-2 right-2"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
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
                              <span className="mr-3">{car.year}</span>
                              {!car.isNew && <span>{car.mileage.toLocaleString()} mi</span>}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-5 pt-0">
                          <Link href={`/cars/${car.id}`} className="w-full">
                            <Button
                              className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
                              variant="default"
                            >
                              View Details
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ),
          )}
        </div>

        <div className="flex justify-center mt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={`/cars?bodyStyle=${activeTab}`}>
              <Button variant="outline" className="px-8 py-6 text-base font-medium">
                View All {bodyStyles.find((style) => style.id === activeTab)?.name}{" "}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

