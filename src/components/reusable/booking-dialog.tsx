"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type BookingDialogProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
  doctor: string
  specialty: string
  date: string
  sessions: { id: string; label: string; time: string; slots: number }[]
}

export function BookingDialog({ open, onOpenChange, doctor, specialty, date, sessions }: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 space-y-3">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-semibold">Book Appointment</DialogTitle>
            <button 
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-medium text-foreground">{doctor}</p>
            <p className="text-sm text-muted-foreground">{specialty}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-4">
          <h3 className="text-sm font-medium mb-4">Select Session</h3>
          <RadioGroup defaultValue={sessions[0]?.id} className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="relative">
                <RadioGroupItem 
                  value={s.id} 
                  id={s.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={s.id}
                  className="flex items-center justify-between p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-border peer-data-[state=checked]:border-primary peer-data-[state=checked]:border-[6px] transition-all" />
                    <div>
                      <p className="font-medium text-foreground">{s.label}</p>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{s.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{s.slots} slots</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="min-w-[120px]"
          >
            Cancel
          </Button>
          <Button 
            className="min-w-[120px] bg-primary hover:bg-primary/90"
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}