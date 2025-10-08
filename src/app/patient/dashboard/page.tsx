"use client"

import { useState } from "react"
import { DoctorCard } from "@/components/reusable/doctor-card"
import { BookingDialog } from "@/components/reusable/booking-dialog"
import { AppointmentConfirmation } from "@/components/reusable/appointment-confirmation"

const sessions = [
  { id: "morning", label: "Morning Session", time: "09:00 AM - 12:00 PM", slots: 8 },
  { id: "evening", label: "Evening Session", time: "05:00 PM - 09:00 PM", slots: 12 },
]

const doctors = [
  { name: "Dr. Sarah Johnson", specialty: "General Physician" },
  { name: "Dr. Michael Chen", specialty: "Cardiologist" },
  { name: "Dr. Emily Rodriguez", specialty: "Pediatrician" },
]

type PatientDetails = {
  name: string
  age: string
  mobile: string
  address: string
}

type Booking = {
  doctor: string
  date: string
  session: string
  tokenNumber: string
  patientDetails: PatientDetails
}

export default function PatientDashboard() {
  const [open, setOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<{ name: string; specialty: string } | null>(null)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleBooking = (doctor: { name: string; specialty: string }) => {
    setSelectedDoctor(doctor)
    setOpen(true)
  }

  const handleConfirmBooking = (sessionId: string, patientDetails: PatientDetails) => {
    if (!selectedDoctor) return

    const selectedSession = sessions.find(s => s.id === sessionId)
    if (!selectedSession) return

    // Generate random token number
    const tokenNumber = Math.floor(Math.random() * 900) + 100

    // Create booking
    const newBooking: Booking = {
      doctor: selectedDoctor.name,
      date: "08/10/2025",
      session: selectedSession.label,
      tokenNumber: `#${tokenNumber}`,
      patientDetails
    }

    setBooking(newBooking)
    setOpen(false)
    setShowToast(true)

    // Hide toast after 4 seconds
    setTimeout(() => setShowToast(false), 4000)

    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-gray-600 mt-1">Book appointments and track your tokens</p>
            </div>
            <a 
              className="text-sm font-medium hover:underline flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors" 
              href="/"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </a>
          </header>

          {/* Appointment Confirmation */}
          {booking && (
            <AppointmentConfirmation
              doctor={booking.doctor}
              date={booking.date}
              session={booking.session}
              tokenNumber={booking.tokenNumber}
            />
          )}

          {/* Available Doctors Section */}
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Available Doctors</h2>
              <p className="text-sm text-gray-600 mt-1">Select a doctor to book an appointment</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
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

          {/* Available Sessions Section */}
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Available Sessions Today</h2>
              <p className="text-sm text-gray-600 mt-1">Choose your preferred time slot</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {sessions.map((s) => (
                <div 
                  key={s.id} 
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg text-gray-900">{s.label}</p>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{s.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-bold text-green-600">{s.slots}</span>
                      <span className="text-xs text-gray-600">slots</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Booking Dialog */}
      {selectedDoctor && (
        <BookingDialog
          open={open}
          onOpenChange={setOpen}
          doctor={selectedDoctor.name}
          specialty={selectedDoctor.specialty}
          date="Today, 08/10/2025"
          sessions={sessions}
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white border-2 border-green-500 rounded-xl shadow-2xl p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 z-[200]">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Appointment booked successfully!</p>
            <p className="text-sm text-gray-600">Check your appointment details above</p>
          </div>
        </div>
      )}
    </>
  )
}