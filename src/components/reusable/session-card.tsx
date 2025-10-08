"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, X } from "@/components/ui/icons"
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
              <Clock className="size-4" aria-hidden />
              <span>Scheduled: {startTime} - {endTime}</span>
            </div>
            
            {actualStart && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" aria-hidden />
                <span>Actual Start: {actualStart}</span>
                <span className="text-green-600">(-119 min)</span>
              </div>
            )}
            
            {actualEnd && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" aria-hidden />
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

      {rescheduleOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setRescheduleOpen(false)} />
      )}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen} className="bg-transparent z-[70]">
        <DialogContent className="sm:max-w-[600px] relative z-[70]">
          <button
            onClick={() => setRescheduleOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <DialogHeader>
            <DialogTitle className="text-2xl">Reschedule Session</DialogTitle>
            <p className="text-muted-foreground">
              Update the session timing for {title}
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="text-sm">
              <span className="font-semibold">Session:</span> {title}
              <span className="font-semibold ml-4">Doctor:</span> {doctor}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Time</label>
                <div className="flex items-center border-2 border-[color:var(--brand)] rounded-lg px-3 py-2">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">End Time</label>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setRescheduleOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="brand-btn flex-1"
              onClick={() => setRescheduleOpen(false)}
            >
              Reschedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}