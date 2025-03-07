"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Shield, Sparkles } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function BudgetCalculator() {
  const [downPayment, setDownPayment] = useState(2350)
  const [monthlyPayment, setMonthlyPayment] = useState(418)
  const [includeTradeIn, setIncludeTradeIn] = useState(false)
  const [tradeInValue, setTradeInValue] = useState(0)
  const [totalLoan, setTotalLoan] = useState(22970)
  const [animateTotalLoan, setAnimateTotalLoan] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Calculate total loan amount when parameters change
  useEffect(() => {
    // Interest rate is fixed at 7.99%
    const interestRate = 7.99 / 100 / 12
    const loanTerm = 60 // 60 months

    // Formula: Monthly Payment = P * (r(1+r)^n) / ((1+r)^n - 1)
    // Solving for P (principal/loan amount)
    const numerator = monthlyPayment
    const denominator =
      (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1)
    const calculatedLoan = Math.round(numerator / denominator)

    // Adjust for down payment and trade-in
    const adjustedLoan = calculatedLoan - downPayment - (includeTradeIn ? tradeInValue : 0)

    // Trigger animation when total loan changes
    setAnimateTotalLoan(true)
    setTimeout(() => setAnimateTotalLoan(false), 1000)

    setTotalLoan(adjustedLoan > 0 ? adjustedLoan : 0)
  }, [downPayment, monthlyPayment, includeTradeIn, tradeInValue])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const benefits = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Verified Dealers",
      description: "All our dealers are thoroughly vetted and certified, ensuring you get the best service and deals.",
      illustration: "https://illustrations.popsy.co/white/car-dealer.svg",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Time Saving",
      description: "Our streamlined process saves you an average of 4 hours compared to traditional car shopping.",
      illustration: "https://illustrations.popsy.co/white/time-management.svg",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Exclusive Deals",
      description: "Access to special financing rates and exclusive offers not available elsewhere.",
      illustration: "https://illustrations.popsy.co/white/discount.svg",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Estimate Your <span className="text-gradient">Monthly Budget</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Card className="border shadow-md overflow-hidden">
              <CardContent className="p-0">
                {/* Top section with monthly payment */}
                <motion.div
                  className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 text-center"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-medium mb-2">Estimated Monthly Payment</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-2">$</span>
                    <div className="text-5xl font-bold mb-2">
                      <motion.span
                        key={monthlyPayment}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {monthlyPayment}
                      </motion.span>
                    </div>
                  </div>
                  <p className="text-white/80">Based on your preferences</p>
                </motion.div>

                {/* Loan details */}
                <div className="p-6 space-y-6">
                  <motion.div variants={itemVariants} className="space-y-4">
                    <Label className="text-base font-medium">Down Payment</Label>
                    <Slider
                      defaultValue={[2350]}
                      min={0}
                      max={10000}
                      step={50}
                      value={[downPayment]}
                      onValueChange={(value) => setDownPayment(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">$0</span>
                      <span className="text-lg font-bold text-primary">${downPayment.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">$10,000</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-4">
                    <Label className="text-base font-medium">Monthly Payment</Label>
                    <Slider
                      defaultValue={[418]}
                      min={200}
                      max={1000}
                      step={10}
                      value={[monthlyPayment]}
                      onValueChange={(value) => setMonthlyPayment(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">$200</span>
                      <span className="text-lg font-bold text-primary">${monthlyPayment.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">$1,000</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="trade-in" checked={includeTradeIn} onCheckedChange={setIncludeTradeIn} />
                      <Label htmlFor="trade-in" className="text-base font-medium">
                        Include Trade-in
                      </Label>
                    </div>

                    <AnimatePresence>
                      {includeTradeIn && (
                        <motion.div
                          className="flex-1"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Slider
                            defaultValue={[0]}
                            min={0}
                            max={20000}
                            step={500}
                            value={[tradeInValue]}
                            onValueChange={(value) => setTradeInValue(value[0])}
                            className="py-4"
                          />
                          <div className="text-right">
                            <span className="text-base font-medium text-primary">${tradeInValue.toLocaleString()}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500 mb-1">Loan Term</p>
                      <p className="text-xl font-bold text-gray-900">60 months</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-500 mb-1">APR</p>
                      <p className="text-xl font-bold text-gray-900">7.99%</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className={`bg-primary/10 p-6 rounded-lg text-center ${animateTotalLoan ? "animate-pulse" : ""}`}
                  >
                    <p className="text-sm text-gray-500 mb-1">Total Loan Amount</p>
                    <motion.p
                      className="text-3xl font-bold text-primary"
                      key={totalLoan}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      ${totalLoan.toLocaleString()}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white py-6">
                      Find Cars In Your Budget <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits Section */}
          <div className="flex flex-col space-y-6 md:mt-0 mt-8">
            {/* <motion.h3
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Why Choose Zephyrium?
            </motion.h3>

            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="flex flex-col p-6 border rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + index * 0.1,
                }}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="p-2 bg-primary/10 rounded-full mr-4 mb-4 md:mb-0">{benefit.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2 text-center md:text-left">{benefit.title}</h4>
                    <p className="text-gray-700 mb-4 text-center md:text-left">{benefit.description}</p>

                    <div className="w-full h-40 relative mt-4">
                      <Image
                        src={benefit.illustration || "/placeholder.svg"}
                        alt={benefit.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="mt-6"
            >
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white py-6">
                Learn More About Zephyrium <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

