"use client"

import { useRef } from "react"
import { ShieldCheck, Banknote, Car, ThumbsUp, Search, Clock } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"

export function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const features = [
    
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Verified Listings",
      description: "Every vehicle is thoroughly checked and verified for your peace of mind.",
      illustration: "https://illustrations.popsy.co/white/security-check.svg",
    },
    {
      icon: <Banknote className="h-8 w-8 text-primary" />,
      title: "Financing Options",
      description: "Compare financing offers from multiple lenders to get the best rate for your new car.",
      illustration: "https://illustrations.popsy.co/white/payment.svg",
    },
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Vehicle History",
      description: "Access detailed vehicle history reports to know exactly what you're buying.",
      illustration: "https://illustrations.popsy.co/white/car-repair.svg",
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
    hidden: { opacity: 0, y: 50 },
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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div style={{ y }} className="absolute -right-64 -top-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute -left-64 -bottom-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />

        <motion.div
          className="mb-16 text-center relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Why Choose <span className="text-gradient">Zephyrium</span>
          </h2>
          
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-md border border-gray-100"
              variants={item}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="mb-6 rounded-full bg-primary/10 p-4"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(var(--primary), 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

