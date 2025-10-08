"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type SessionCardProps = {
  title: string
  doctor: string
  time: string
}

export function SessionCard({ title, doctor, time }: SessionCardProps) {
  const [status, setStatus] = useState<"Not Started" | "Active" | "Completed">("Not Started")
  const [actualStart, setActualStart] = useState<string | null>(null)
  const [actualEnd, setActualEnd] = useState<string | null>(null)
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [startTime, setStartTime] = useState(time.split(" - ")[0])
  const [endTime, setEndTime] = useState(time.split(" - ")[1])

  const handleCheckIn = () => {
    setStatus("Active")
    setActualStart("15:01")
  }

  const handleCheckOut = () => {
    setStatus("Completed")
    setActualEnd("15:02")
  }

  const handleReschedule = () => {
    // Handle reschedule logic here
    console.log("Rescheduled:", { startTime, endTime })
    setRescheduleOpen(false)
  }

  const getStatusVariant = () => {
    if (status === "Active") return "default"
    if (status === "Completed") return "secondary"
    return "outline"
  }

  const getStatusColor = () => {
    if (status === "Active") return "bg-green-500 hover:bg-green-600"
    if (status === "Completed") return "bg-purple-500 hover:bg-purple-600"
    return ""
  }

  return (
    <>
      <Card className="panel">
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1">
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="text-muted-foreground">{doctor}</p>
            </div>
            <Badge 
              variant={getStatusVariant()} 
              className={status !== "Not Started" ? `${getStatusColor()} text-white border-0` : ""}
            >
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Scheduled: {startTime} - {endTime}</span>
            </div>
            
            {actualStart && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Actual Start: {actualStart}</span>
                <span className="text-green-600">(-119 min)</span>
              </div>
            )}
            
            {actualEnd && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ended: {actualEnd}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {status === "Not Started" && (
              <>
                <Button className="brand-btn flex-1" onClick={handleCheckIn}>
                  Check In
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-[140px]"
                  onClick={() => setRescheduleOpen(true)}
                >
                  Reschedule
                </Button>
              </>
            )}
            
            {status === "Active" && (
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={handleCheckOut}
              >
                Check Out
              </Button>
            )}
            
            {status === "Completed" && (
              <div className="w-full" />
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 space-y-3 border-b">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  Reschedule Session
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Update the session timing for {title}
                </p>
              </div>
              <button
                onClick={() => setRescheduleOpen(false)}
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
            {/* Session Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Session:</span>
                <span className="font-semibold text-gray-900">{title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Doctor:</span>
                <span className="font-semibold text-gray-900">{doctor}</span>
              </div>
            </div>

            {/* Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 block">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-teal-500 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 block">
                  End Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={() => setRescheduleOpen(false)}
              className="min-w-[120px] border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReschedule}
              className="min-w-[120px] bg-teal-500 hover:bg-teal-600 text-white"
            >
              Reschedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}