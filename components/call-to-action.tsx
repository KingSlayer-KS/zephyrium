"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

export function CallToAction() {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const handleBrowseCars = () => {
    // Navigate to cars page with no filters to show all cars and scroll to top
    router.push("/cars", { scroll: true })
  }

  // Update the handleSellCar function to include scroll: true
  const handleSellCar = () => {
    // Navigate to sell page and scroll to top
    router.push("/sell", { scroll: true })
  }

  return (
    <motion.section ref={sectionRef} className="py-24 mt-[-8rem] overflow-hidden relative" style={{ opacity }}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1920&auto=format&fit=crop')",
          y: backgroundY,
        }}
      />

      {/* Gradient overlay that starts with primary/20 to match the end of the feature section */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/60 to-primary/90 backdrop-blur-sm z-0" />

      <motion.div className="container mx-auto px-4 relative z-10" style={{ y: contentY }}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.h2
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Ready to find your dream car?
          </motion.h2>
          <motion.p
            className="mb-10 text-xl text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Join thousands of satisfied customers who found their perfect vehicle with Zephyrium.
          </motion.p>
          <motion.div
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-base font-medium bg-white text-primary hover:bg-white/90"
                onClick={handleBrowseCars}
              >
                Browse Cars
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-medium bg-transparent text-white border-white hover:bg-white hover:text-primary"
                onClick={handleSellCar}
              >
                Sell Your Car
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

