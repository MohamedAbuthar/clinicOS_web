"use client"

import { useState } from "react"
import { DoctorCard } from "@/components/reusable/doctor-card"
import { BookingDialog } from "@/components/reusable/booking-dialog"

const sessions = [
  { id: "morning", label: "Morning Session", time: "09:00 AM - 12:00 PM", slots: 8 },
  { id: "evening", label: "Evening Session", time: "05:00 PM - 09:00 PM", slots: 12 },
]

export default function PatientDashboard() {
  const [open, setOpen] = useState(false)

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Patient Dashboard</h1>
          <p className="text-muted-foreground">Book appointments and track your tokens</p>
        </div>
        <a className="text-sm hover:underline" href="/">
          Logout
        </a>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Available Doctors</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <DoctorCard name="Dr. Sarah Johnson" specialty="General Physician" onBook={() => setOpen(true)} />
          <DoctorCard name="Dr. Michael Chen" specialty="Cardiologist" onBook={() => setOpen(true)} />
          <DoctorCard name="Dr. Emily Rodriguez" specialty="Pediatrician" onBook={() => setOpen(true)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Available Sessions Today</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {sessions.map((s) => (
            <div key={s.id} className="panel p-5 flex items-center justify-between">
              <div>
                <p className="font-medium">{s.label}</p>
                <p className="text-muted-foreground">{s.time}</p>
              </div>
              <span className="text-green-600">{s.slots} slots</span>
            </div>
          ))}
        </div>
      </section>

      <BookingDialog
        open={open}
        onOpenChange={setOpen}
        doctor="Dr. Sarah Johnson • General Physician"
        date={`Today, ${new Date().toLocaleDateString()}`}
        sessions={sessions}
      />
    </main>
  )
}
