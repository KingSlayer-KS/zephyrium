"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

export function BudgetCalculator() {
  const router = useRouter()
  const [downPayment, setDownPayment] = useState(2350)
  const [monthlyPayment, setMonthlyPayment] = useState(418)
  const [loanTerm, setLoanTerm] = useState(60)
  const [includeTradeIn, setIncludeTradeIn] = useState(false)
  const [tradeInValue, setTradeInValue] = useState(0)
  const [totalLoan, setTotalLoan] = useState(22970)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Calculate total loan amount when parameters change
  useEffect(() => {
    // Interest rate is fixed at 7.99%
    const interestRate = 7.99 / 100 / 12

    // Formula: Monthly Payment = P * (r(1+r)^n) / ((1+r)^n - 1)
    // Solving for P (principal/loan amount)
    const numerator = monthlyPayment
    const denominator =
      (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1)
    const calculatedLoan = Math.round(numerator / denominator)

    // Adjust for down payment and trade-in
    const adjustedLoan = calculatedLoan - downPayment - (includeTradeIn ? tradeInValue : 0)
    setTotalLoan(adjustedLoan > 0 ? adjustedLoan : 0)
  }, [downPayment, monthlyPayment, loanTerm, includeTradeIn, tradeInValue])

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value.replace(/[^0-9]/g, "") || "0")
    setDownPayment(value)
  }

  const handleMonthlyPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value.replace(/[^0-9]/g, "") || "0")
    setMonthlyPayment(value)
  }

  const handleTradeInValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value.replace(/[^0-9]/g, "") || "0")
    setTradeInValue(value)
  }

  const handleShopByBudget = () => {
    // Navigate to cars page with price filter and scroll to top
    router.push(`/cars?maxPrice=${totalLoan}`, { scroll: true })
  }

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Estimate your <span className="text-gradient">budget</span>
            </h2>
            <p className="text-gray-600">Input your monthly budget and loan terms to estimate your buying power.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div>
              <Label htmlFor="down-payment" className="text-sm text-gray-500 mb-2 block">
                Est. down payment
              </Label>
              <Input
                id="down-payment"
                type="text"
                value={`$${downPayment.toLocaleString()}`}
                onChange={handleDownPaymentChange}
                className="h-14 text-lg font-medium"
              />
            </div>

            <div>
              <Label htmlFor="loan-term" className="text-sm text-gray-500 mb-2 block">
                Loan term
              </Label>
              <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number.parseInt(value))}>
                <SelectTrigger id="loan-term" className="h-14 text-lg font-medium">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="48">48 months</SelectItem>
                  <SelectItem value="60">60 months</SelectItem>
                  <SelectItem value="72">72 months</SelectItem>
                  <SelectItem value="84">84 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="monthly-payment" className="text-sm text-gray-500 mb-2 block">
                Est. monthly payment
              </Label>
              <Input
                id="monthly-payment"
                type="text"
                value={`$${monthlyPayment.toLocaleString()}`}
                onChange={handleMonthlyPaymentChange}
                className="h-14 text-lg font-medium"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center mb-12"
          >
            <Switch id="trade-in" checked={includeTradeIn} onCheckedChange={setIncludeTradeIn} className="mr-2" />
            <Label htmlFor="trade-in" className="text-sm font-medium mr-6">
              Include trade-in
            </Label>

            {includeTradeIn && (
              <div className="flex-1 max-w-xs">
                <Input
                  type="text"
                  value={`$${tradeInValue.toLocaleString()}`}
                  onChange={handleTradeInValueChange}
                  className="h-10"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-between mb-12"
          >
            <div className="mb-6 md:mb-0">
              <div className="text-6xl font-bold">${totalLoan.toLocaleString()}</div>
              <div className="text-gray-500 mt-2">with 7.99% APR</div>
            </div>

            <Button className="h-14 px-8 text-base font-medium" size="lg" onClick={handleShopByBudget}>
              Shop by budget <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

