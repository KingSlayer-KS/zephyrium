"use client"

import { useRef } from "react"
import { ShieldCheck, Car, Banknote } from "lucide-react"
import { motion, useInView } from "framer-motion"

export function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "Verified Listings",
      description:
        "Every vehicle is thoroughly inspected and verified. Know exactly what you're buying with detailed history reports.",
    },
    {
      icon: <Car className="h-12 w-12 text-primary" />,
      title: "Largest Selection",
      description: "Access our extensive inventory of premium vehicles. Find your perfect car at the best price.",
    },
    {
      icon: <Banknote className="h-12 w-12 text-primary" />,
      title: "Flexible Financing",
      description:
        "Compare multiple financing offers and get the best rates. Quick approval process with trusted lenders.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-24 pb-48 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Why <span className="text-primary">Zephyrium</span>?
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-16 md:grid-cols-3 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} className="flex flex-col items-center text-center" variants={item}>
              <div className="mb-8 rounded-full bg-blue-50 p-8">
                <div className="text-primary">{feature.icon}</div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

