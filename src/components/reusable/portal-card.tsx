"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type PortalCardProps = {
  title: string
  description: string
  href: string
  variant?: "teal" | "purple"
  icon?: ReactNode
  bullets?: string[]
  cta?: string
}

export function PortalCard({
  title,
  description,
  href,
  variant = "teal",
  icon,
  bullets = [],
  cta = "Open",
}: PortalCardProps) {
  const btnClass = variant === "teal" ? "brand-btn" : "accent-btn"
  return (
    <Card className="panel h-full">
      <CardHeader className="space-y-2">
        <div className={cn("w-14 h-14 icon-tile", variant === "purple" && "icon-tile--purple")} aria-hidden>
          {icon}
        </div>
        <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href={href}>
          <Button className={cn("w-full", btnClass)}>{cta}</Button>
        </Link>
        {bullets.length ? (
          <ul className="text-muted-foreground text-sm space-y-1 list-disc ml-4">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  )
}
