"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface MovingBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function MovingBorder({ children, className = "", containerClassName = "", ...props }: MovingBorderProps) {
  return (
    <div className={cn("relative", containerClassName)} {...props}>
      <div className={cn("moving-border", className)}>{children}</div>
    </div>
  )
}

