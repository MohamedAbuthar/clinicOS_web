"use client"


import { Button } from "@/components/ui/button"
import { Clock } from "@/components/ui/icons"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type SessionCardProps = {
  title: string
  doctor: string
  time: string
  status?: "Not Started" | "Running" | "Completed"
  onCheckIn?: () => void
  onReschedule?: () => void
}

export function SessionCard({
  title,
  doctor,
  time,
  status = "Not Started",
  onCheckIn,
  onReschedule,
}: SessionCardProps) {
  return (
    <Card className="panel">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-muted-foreground">{doctor}</p>
        </div>
        <Badge variant="secondary">{status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="size-4" aria-hidden />
          <span>Scheduled: {time}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button className="brand-btn">Check In</Button>
          <Button variant="secondary" className="w-[140px]">
            Reschedule
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
