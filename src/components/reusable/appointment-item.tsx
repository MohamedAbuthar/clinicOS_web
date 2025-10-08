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

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-white">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 space-y-3 border-b">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  Patient QR Code - Token #{index}
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Patient appointment details and QR code
                </p>
              </div>
              <button
                onClick={() => setQrOpen(false)}
                className="rounded-sm opacity-70 hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Patient Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Patient:</span>
                <span className="font-semibold text-gray-900">{name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Phone:</span>
                <span className="font-semibold text-gray-900">{phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Session:</span>
                <span className="font-semibold text-gray-900">{session}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Scheduled Time:</span>
                <span className="font-semibold text-gray-900">{time}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center py-4">
              <div className="w-64 h-64 bg-white border-4 border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
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
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={() => setQrOpen(false)}
              className="min-w-[120px] border-gray-300 hover:bg-gray-100"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}