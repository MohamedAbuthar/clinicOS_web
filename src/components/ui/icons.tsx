"use client"

import * as React from "react"

// Simple icon components to replace lucide-react temporarily
export const Clock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { className?: string }>(
  function Clock({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    )
  }
)

export const Check = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { className?: string }>(
  function Check({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polyline points="20,6 9,17 4,12" />
      </svg>
    )
  }
)

export const QrCode = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { className?: string }>(
  function QrCode({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="m21 16-3 3-3-3" />
        <path d="m21 21v.01" />
        <path d="m12 7v3" />
        <path d="m12 15h.01" />
        <path d="m16 15h.01" />
        <path d="m21 12v.01" />
      </svg>
    )
  }
)

export const X = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { className?: string }>(
  function X({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }
)

export const Calendar = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { className?: string }>(
  function Calendar({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    )
  }
)

export const Users = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { className?: string }>(
  function Users({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
)

export const BarChart3 = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { className?: string }>(
  function BarChart3({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    )
  }
)
