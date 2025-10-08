"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type FormShellProps = {
  title: string
  subtitle?: string
  onSubmit?: () => void
  children: ReactNode
  submitLabel: string
  backHref?: string
  variant?: "teal" | "purple"
  footer?: ReactNode
  icon?: ReactNode
}

export function FormShell({
  title,
  subtitle,
  onSubmit,
  children,
  submitLabel,
  backHref = "/",
  variant = "teal",
  footer,
  icon,
}: FormShellProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <Link 
          href={backHref} 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Card */}
        <Card className="border-gray-200 shadow-xl">
          <CardHeader className="text-center space-y-4 pt-6 pb-2 sm:pt-8">
            {/* Icon */}
            <div className="mx-auto">
              <div
                className={cn(
                  "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg",
                  variant === "purple" 
                    ? "bg-gradient-to-br from-indigo-500 to-purple-500" 
                    : "bg-gradient-to-br from-teal-400 to-teal-500"
                )}
              >
                {icon}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                {title}
              </CardTitle>
              {subtitle && (
                <p className="text-sm text-gray-600 px-2">
                  {subtitle}
                </p>
              )}
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Form Fields */}
              <div className="space-y-4">
                {children}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={cn(
                  "w-full h-11 text-base font-semibold shadow-lg transition-all duration-200",
                  variant === "purple"
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/30"
                    : "bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/30"
                )}
              >
                {submitLabel}
              </Button>

              {/* Footer */}
              {footer && (
                <div className="mt-4 rounded-lg bg-gray-100 text-gray-600 px-4 py-3 text-center">
                  {footer}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}