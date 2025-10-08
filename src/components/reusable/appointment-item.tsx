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
import { Label } from "@/components/ui/label"

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
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [newTime, setNewTime] = useState(time)

  const handleCheckIn = () => {
    setStatus("Completed")
  }

  const handleCancel = () => {
    setStatus("Missed")
  }

  const handleRescheduleClick = () => {
    setRescheduleOpen(true)
  }

  const handleReschedule = () => {
    setStatus("Waiting")
  }

  const handleConfirmReschedule = () => {
    // Handle reschedule logic
    console.log("Rescheduled to:", newTime)
    setStatus("Waiting")
    setRescheduleOpen(false)
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
                <Button variant="secondary" onClick={handleRescheduleClick}>
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

      {/* QR Code Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-white max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 space-y-3 border-b">
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
          <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-6 sm:space-y-6">
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
            <div className="flex justify-center py-2 sm:py-4">
              <div className="w-[70vw] max-w-[280px] sm:max-w-[320px] md:max-w-[360px] aspect-square bg-white border-4 border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
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
          <div className="flex items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t bg-gray-50">
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

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="sm:max-w-[550px] p-6 gap-0 bg-white">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Reschedule Patient Appointment
            </DialogTitle>
            <button
              onClick={() => setRescheduleOpen(false)}
              className="rounded-sm opacity-70 hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6 flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-700">
              Patient will be rescheduled within the same session with a new token at the end of the queue.
            </p>
          </div>

          {/* Patient Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Patient:</span>
              <span className="font-semibold text-gray-900">{name}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Phone:</span>
              <span className="font-semibold text-gray-900">{phone}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Current Token:</span>
              <span className="font-semibold text-gray-900">#{index}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Session:</span>
              <span className="font-semibold text-gray-900">{session}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Session Time:</span>
              <span className="font-semibold text-gray-900">09:00 - 12:00</span>
            </div>
          </div>

          {/* New Token and Time Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-teal-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">New Token:</span>
              <span className="font-bold text-lg">#3</span>
            </div>
            <div className="flex items-center gap-2 text-teal-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">New Scheduled Time:</span>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="font-bold text-lg text-teal-600 bg-transparent border-b-2 border-teal-600 outline-none focus:border-teal-700 px-1"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setRescheduleOpen(false)}
              className="min-w-[100px] border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmReschedule}
              disabled={!newTime}
              className="min-w-[160px] bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Reschedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}