"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car, MessageSquare, Bell, Menu, Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileHeader() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      {/* Main Header */}
      <div className="px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Zephyrium</span>
        </Link>

        <div className="flex items-center space-x-4">
          <MessageSquare className="h-6 w-6 text-gray-600" />
          <Bell className="h-6 w-6 text-gray-600" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">{/* Menu content */}</SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-gray-50 flex items-center space-x-4">
        <Button
          variant="outline"
          className="w-full h-12 justify-start text-gray-600 bg-white"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5 mr-2" />
          New search
        </Button>
        <Button variant="outline" className="h-12 w-12 flex-shrink-0 bg-white">
          <Heart className="h-5 w-5 text-gray-600" />
        </Button>
      </div>

      {/* Filter Pills */}
      <div className="px-4 py-2 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
        <Button variant="outline" className="flex-shrink-0 h-10">
          Filters
        </Button>
        <Button variant="outline" className="flex-shrink-0 h-10">
          Year
        </Button>
        <Button variant="outline" className="flex-shrink-0 h-10">
          Distance from me
        </Button>
      </div>
    </div>
  )
}

