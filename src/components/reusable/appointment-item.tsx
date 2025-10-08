"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, QrCode, X } from "@/components/ui/icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type AppointmentItemProps = {
  index: number
  name: string
  phone: string
  session: string
  time: string
}

export function AppointmentItem({ index, name, phone, session, time }: AppointmentItemProps) {
  const [status, setStatus] = useState<"Waiting" | "Completed" | "Missed">("Waiting")
  const [qrOpen, setQrOpen] = useState(false)

  const handleCheckIn = () => {
    setStatus("Completed")
  }

  const handleCancel = () => {
    setStatus("Missed")
  }

  const handleReschedule = () => {
    setStatus("Waiting")
  }

  const getStatusBadge = () => {
    if (status === "Completed") return { variant: "default" as const, className: "bg-green-500 hover:bg-green-600 text-white border-0" }
    if (status === "Missed") return { variant: "destructive" as const, className: "bg-red-500 hover:bg-red-600" }
    return { variant: "secondary" as const, className: "bg-yellow-500 hover:bg-yellow-600 text-white border-0" }
  }

  const badgeProps = getStatusBadge()

  return (
    <>
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
                  <Badge variant={badgeProps.variant} className={badgeProps.className}>
                    {status}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {phone} • {session}
                </p>
                <p className="text-[color:var(--brand)] font-medium text-sm">Scheduled Time: {time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {status === "Missed" ? (
                <Button variant="secondary" onClick={handleReschedule}>
                  Reschedule
                </Button>
              ) : status === "Completed" ? (
                <Button 
                  size="icon" 
                  variant="secondary" 
                  aria-label="Show QR"
                  onClick={() => setQrOpen(true)}
                >
                  <QrCode className="size-4" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    aria-label="Show QR"
                    onClick={() => setQrOpen(true)}
                  >
                    <QrCode className="size-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="bg-green-600 text-white hover:bg-green-700" 
                    aria-label="Mark Checked In"
                    onClick={handleCheckIn}
                  >
                    <Check className="size-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="bg-red-600 text-white hover:bg-red-700" 
                    aria-label="Cancel"
                    onClick={handleCancel}
                  >
                    <X className="size-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {qrOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setQrOpen(false)} />
      )}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-[500px] relative z-[70]">
          <button
            onClick={() => setQrOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <DialogHeader>
            <DialogTitle className="text-2xl">Patient QR Code - Token #{index}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <p><span className="font-semibold">Patient:</span> {name}</p>
            <p><span className="font-semibold">Phone:</span> {phone}</p>
            <p><span className="font-semibold">Session:</span> {session}</p>
            <p><span className="font-semibold">Scheduled Time:</span> {time}</p>
          </div>

          <div className="flex justify-center py-4">
            <div className="w-64 h-64 bg-white border-4 border-gray-200 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white"/>
                {[...Array(10)].map((_, i) => 
                  [...Array(10)].map((_, j) => (
                    (i + j) % 2 === 0 && Math.random() > 0.3 && (
                      <rect 
                        key={`${i}-${j}`}
                        x={i * 10} 
                        y={j * 10} 
                        width="10" 
                        height="10" 
                        fill="black"
                      />
                    )
                  ))
                )}
                <rect x="0" y="0" width="20" height="20" fill="black"/>
                <rect x="10" y="10" width="5" height="5" fill="white"/>
                <rect x="80" y="0" width="20" height="20" fill="black"/>
                <rect x="85" y="5" width="5" height="5" fill="white"/>
                <rect x="0" y="80" width="20" height="20" fill="black"/>
                <rect x="5" y="85" width="5" height="5" fill="white"/>
              </svg>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}