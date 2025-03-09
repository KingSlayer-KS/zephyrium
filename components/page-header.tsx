"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function PageHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/cars?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Car</h1>
          <p className="text-lg text-white/90 mb-8">
            Search through thousands of cars to find the one that's right for you
          </p>

          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              type="search"
              placeholder="Search by make, model, or keyword..."
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="lg" className="h-12 px-8 bg-white text-primary hover:bg-white/90">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

