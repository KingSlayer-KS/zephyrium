"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { FilterContent } from "./filter-content"

export function CarFilters() {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Get current filter values from URL
  const currentFilters = Object.fromEntries(searchParams.entries())
  const filterCount = Object.keys(currentFilters).length

  return (
    <>
      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full h-12 justify-start font-normal">
              <Filter className="mr-2 h-4 w-4" />
              Filters {filterCount > 0 && `(${filterCount})`}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <FilterContent />
              </div>
              <div className="p-4 border-t bg-white">
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Show {filterCount > 0 ? filterCount : "all"} results
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>
    </>
  )
}

