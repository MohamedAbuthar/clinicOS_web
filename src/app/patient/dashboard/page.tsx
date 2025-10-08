"use client"

import { useState } from "react"
import { DoctorCard } from "@/components/reusable/doctor-card"
import { BookingDialog } from "@/components/reusable/booking-dialog"

const sessions = [
  { id: "morning", label: "Morning Session", time: "09:00 AM - 12:00 PM", slots: 8 },
  { id: "evening", label: "Evening Session", time: "05:00 PM - 09:00 PM", slots: 12 },
]

const doctors = [
  { name: "Dr. Sarah Johnson", specialty: "General Physician" },
  { name: "Dr. Michael Chen", specialty: "Cardiologist" },
  { name: "Dr. Emily Rodriguez", specialty: "Pediatrician" },
]

export default function PatientDashboard() {
  const [open, setOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<{ name: string; specialty: string } | null>(null)

  const handleBooking = (doctor: { name: string; specialty: string }) => {
    setSelectedDoctor(doctor)
    setOpen(true)
  }

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric' 
  }).replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3')

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Patient Dashboard</h1>
          <p className="text-muted-foreground">Book appointments and track your tokens</p>
        </div>
        <a className="text-sm hover:underline flex items-center gap-2" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </a>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Available Doctors</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor.name}
              name={doctor.name} 
              specialty={doctor.specialty} 
              onBook={() => handleBooking(doctor)} 
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Available Sessions Today</h2>
        <p className="text-sm text-muted-foreground">Choose your preferred time slot</p>
        <div className="grid md:grid-cols-2 gap-4">
          {sessions.map((s) => (
            <div key={s.id} className="panel p-5 flex items-center justify-between border rounded-lg hover:border-primary/50 transition-colors">
              <div>
                <p className="font-medium text-lg">{s.label}</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{s.time}</span>
                </div>
              </div>
              <span className="text-lg font-semibold text-green-600">{s.slots} slots</span>
            </div>
          ))}
        </div>
      </section>

      {selectedDoctor && (
        <BookingDialog
          open={open}
          onOpenChange={setOpen}
          doctor={selectedDoctor.name}
          specialty={selectedDoctor.specialty}
          date={`Today, 08/10/2025`}
          sessions={sessions}
        />
      )}
    </main>
  )
}