"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DialogFooter } from "@/components/ui/dialog"


type BookingDialogProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
  doctor: string
  date: string
  sessions: { id: string; label: string; time: string; slots: number }[]
}

export function BookingDialog({ open, onOpenChange, doctor, date, sessions }: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <p className="text-muted-foreground">{doctor}</p>
          <p className="text-muted-foreground">{date}</p>
        </DialogHeader>
        <RadioGroup defaultValue={sessions[0]?.id} className="space-y-3">
          {sessions.map((s) => (
            <label key={s.id} className="panel flex items-center justify-between px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <RadioGroupItem id={s.id} value={s.id} />
                <div>
                  <p className="font-medium">{s.label}</p>
                  <p className="text-muted-foreground">{s.time}</p>
                </div>
              </div>
              <span className="text-green-600">{s.slots} slots</span>
            </label>
          ))}
        </RadioGroup>
        <DialogFooter className="gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button className="accent-btn">Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
