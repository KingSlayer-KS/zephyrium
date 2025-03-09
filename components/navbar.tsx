"use client"

import { useState } from "react"
import Link from "next/link"
import { Car, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Remove scroll effect since we want consistent styling
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gray-900">Zephyrium</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {["Buy", "Sell", "Finance", "Research"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => (window.location.href = "/sign-in")}
              >
                Sign In
              </Button>
              <Button size="sm" onClick={() => (window.location.href = "/sign-up")}>
                Register
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/buy" className="text-lg font-medium hover:text-primary">
                    Buy
                  </Link>
                  <Link href="/sell" className="text-lg font-medium hover:text-primary">
                    Sell
                  </Link>
                  <Link href="/finance" className="text-lg font-medium hover:text-primary">
                    Finance
                  </Link>
                  <Link href="/research" className="text-lg font-medium hover:text-primary">
                    Research
                  </Link>
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="outline">Sign In</Button>
                    <Button>Register</Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

