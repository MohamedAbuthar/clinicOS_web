"use client"


import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

type DoctorCardProps = {
  name: string
  specialty: string
  imgSrc?: string
  onBook?: () => void
}

export function DoctorCard({ name, specialty, imgSrc = "/placeholder.jpg", onBook }: DoctorCardProps) {
  return (
    <Card className="panel h-full">
      <CardHeader className="items-center text-center">
        <div className="relative size-20 rounded-full ring-4 ring-[color:var(--brand)]/20 overflow-hidden">
          <Image
            src={imgSrc || "/placeholder.svg"}
            alt={`${name} portrait`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <CardTitle className="mt-2">{name}</CardTitle>
        <p className="text-muted-foreground">{specialty}</p>
        <Badge className="bg-[color:var(--accent-brand)]/15 text-[color:var(--accent-brand)]">Available Today</Badge>
      </CardHeader>
      <CardContent>
        <Button className="w-full accent-btn" onClick={onBook}>
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  )
}
