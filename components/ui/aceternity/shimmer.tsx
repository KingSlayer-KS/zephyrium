"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function Shimmer({ children, className = "", ...props }: ShimmerProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 shimmer pointer-events-none" />
      {children}
    </div>
  )
}

