"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { SearchForm } from "@/components/search-form"

export function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const container = containerRef.current

      if (container) {
        const { left, top, width, height } = container.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        // Calculate normalized mouse position relative to center (-1 to 1)
        const normalizedX = (clientX - centerX) / (width / 2)
        const normalizedY = (clientY - centerY) / (height / 2)

        mouseX.set(normalizedX * 20) // Adjust multiplier for effect intensity
        mouseY.set(normalizedY * 20)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden pt-20">
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          scale: springScale,
          opacity: springOpacity,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop')",
            y: springY,
            x: mouseX,
            scale: springScale,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"
          style={{ opacity: springOpacity }}
        />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-20 md:py-0">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
        >
          <motion.h1
            className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
            }}
          >
            <span className="block">Buy. Sell. Drive.</span>
          </motion.h1>

         

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.8,
            }}
          >
            <SearchForm />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 100]) }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}

