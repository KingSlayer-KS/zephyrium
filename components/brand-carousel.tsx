"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

const brands = [
  {
    name: "Mercedes-Benz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png",
    slug: "mercedes-benz",
  },
  {
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/800px-BMW.svg.png",
    slug: "bmw",
  },
  {
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/800px-Audi-Logo_2016.svg.png",
    slug: "audi",
  },
  {
    name: "Porsche",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Porsche_logo.svg/800px-Porsche_logo.svg.png",
    slug: "porsche",
  },
  {
    name: "Lexus",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Lexus_logo.svg/800px-Lexus_logo.svg.png",
    slug: "lexus",
  },
  {
    name: "Ferrari",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ferrari-Logo.svg/800px-Ferrari-Logo.svg.png",
    slug: "ferrari",
  },
  {
    name: "Lamborghini",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Lamborghini_Logo.svg/800px-Lamborghini_Logo.svg.png",
    slug: "lamborghini",
  },
  {
    name: "Bentley",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Bentley_logo.svg/800px-Bentley_logo.svg.png",
    slug: "bentley",
  },
  {
    name: "Rolls-Royce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Rolls-Royce_Motor_Cars_logo.svg/800px-Rolls-Royce_Motor_Cars_logo.svg.png",
    slug: "rolls-royce",
  },
  {
    name: "Maserati",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Maserati_logo.svg/800px-Maserati_logo.svg.png",
    slug: "maserati",
  },
  {
    name: "Jaguar",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Jaguar_2012_logo.svg/800px-Jaguar_2012_logo.svg.png",
    slug: "jaguar",
  },
  {
    name: "Land Rover",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Land_Rover_logo2.svg/800px-Land_Rover_logo2.svg.png",
    slug: "land-rover",
  },
]

export function BrandCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)
  const controls = useAnimation()

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollButtons)
      window.addEventListener("resize", checkScrollButtons)
      checkScrollButtons()

      // Initial animation
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        },
      }))

      return () => {
        carousel.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [controls])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleMouseEnter = (slug: string) => {
    setHoveredBrand(slug)
  }

  const handleMouseLeave = () => {
    setHoveredBrand(null)
  }

  return (
    <div className="relative py-8">
      <motion.h2
        className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span className="text-gradient">Premium</span> Brands
      </motion.h2>

      <div
        ref={carouselRef}
        className="flex space-x-10 overflow-x-auto scrollbar-hide pb-8 pt-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {brands.map((brand, index) => (
          <motion.div
            key={brand.slug}
            custom={index}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            className="flex-shrink-0"
          >
            <Link
              href={`/brands/${brand.slug}`}
              className="flex flex-col items-center justify-center space-y-3"
              onMouseEnter={() => handleMouseEnter(brand.slug)}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-md overflow-hidden logo-container"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain brand-logo"
                />
              </motion.div>

              <motion.span
                className="text-sm font-medium"
                animate={{
                  scale: hoveredBrand === brand.slug ? 1.1 : 1,
                  color: hoveredBrand === brand.slug ? "hsl(var(--primary))" : "#000",
                }}
                transition={{ duration: 0.2 }}
              >
                {brand.name}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-2 top-1/2 z-10"
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-lg border-0"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-2 top-1/2 z-10"
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white shadow-lg border-0"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

