"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <Car className={`h-8 w-8 ${scrolled ? "text-primary" : "text-white"}`} />
          </motion.div>
          <motion.span
            className={`text-xl font-bold ${scrolled ? "text-gray-900" : "text-white"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Zephyrium
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {["Buy", "Sell", "Finance", "Reviews", "Dealers"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1), duration: 0.5 }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-white/80"
                }`}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={scrolled ? "outline" : "secondary"}
              size="sm"
              className={`h-10 px-5 ${!scrolled && "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/20"}`}
            >
              Sign In
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="sm" className={`h-10 px-5 ${!scrolled && "bg-white text-primary hover:bg-white/90"}`}>
              Register
            </Button>
          </motion.div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={`md:hidden ${scrolled ? "text-gray-900" : "text-white"}`}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-8">
              <Link href="/buy" className="text-lg font-medium hover:text-primary">
                Buy
              </Link>
              <Link href="/sell" className="text-lg font-medium hover:text-primary">
                Sell
              </Link>
              <Link href="/finance" className="text-lg font-medium hover:text-primary">
                Finance
              </Link>
              <Link href="/reviews" className="text-lg font-medium hover:text-primary">
                Reviews
              </Link>
              <Link href="/dealers" className="text-lg font-medium hover:text-primary">
                Dealers
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline">Sign In</Button>
                <Button>Register</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

