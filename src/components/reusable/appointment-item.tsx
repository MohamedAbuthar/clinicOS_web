"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, QrCode, X } from "@/components/ui/icons"

type AppointmentItemProps = {
  index: number
  name: string
  phone: string
  session: string
  time: string
  status?: "Waiting" | "Checked-in" | "Cancelled"
}

export function AppointmentItem({ index, name, phone, session, time, status = "Waiting" }: AppointmentItemProps) {
  return (
    <Card className="panel">
      <CardContent className="py-5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-[color:var(--brand)]/10 flex items-center justify-center text-[color:var(--brand)] font-semibold">
              #{index}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <p className="font-medium">{name}</p>
                <Badge variant="secondary">{status}</Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                {phone} • {session}
              </p>
              <p className="text-[color:var(--brand)] font-medium text-sm">Scheduled Time: {time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="secondary" aria-label="Show QR">
              <QrCode className="size-4" />
            </Button>
            <Button size="icon" className="bg-green-600 text-white hover:brightness-95" aria-label="Mark Checked In">
              <Check className="size-4" />
            </Button>
            <Button size="icon" className="bg-red-600 text-white hover:brightness-95" aria-label="Cancel">
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
