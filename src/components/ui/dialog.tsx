"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ className, open = true, onOpenChange, ...props }: DialogProps) {
  if (!open) return null
  return (
    <div 
      className={cn("fixed inset-0 z-50 flex items-center justify-center", className)} 
      onClick={() => onOpenChange?.(false)}
      {...props} 
    />
  )
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-popover text-popover-foreground shadow-lg p-4 w-full max-w-lg",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-2", className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 flex justify-end gap-2", className)} {...props} />
}


