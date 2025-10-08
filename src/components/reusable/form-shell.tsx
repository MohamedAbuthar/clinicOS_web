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
  const btnClass = variant === "teal" ? "brand-btn" : "accent-btn"

  return (
    <div className="min-h-[calc(100dvh-0px)] flex items-start md:items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-xl">
        <div className="mb-4">
          <Link href={backHref} className="text-sm hover:underline">
            &larr; Back to Home
          </Link>
        </div>
        <Card className="panel">
          <CardHeader className="text-center space-y-2">
            <div className={cn("mx-auto w-14 h-14 icon-tile", variant === "purple" && "icon-tile--purple")} aria-hidden>
              {icon}
            </div>
            <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
            {subtitle ? <p className="text-muted-foreground">{subtitle}</p> : null}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">{children}</div>
            <Button className={cn("w-full", btnClass)} onClick={onSubmit} type="button">
              {submitLabel}
            </Button>
            {footer ? (
              <div className="mt-2 rounded-xl bg-secondary text-muted-foreground px-4 py-3 text-center">{footer}</div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
