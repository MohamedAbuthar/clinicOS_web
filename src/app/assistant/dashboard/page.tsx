"use client"

import { useState } from "react"
import { SessionCard } from "@/components/reusable/session-card"
import { AppointmentItem } from "@/components/reusable/appointment-item"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const metrics = [
  { 
    label: "Total Sessions", 
    value: 2, 
    icon: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    label: "Total Patients", 
    value: 3, 
    icon: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  { 
    label: "Waiting", 
    value: 1, 
    icon: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
]

const sessions = [
  { id: 1, name: "Morning Session", time: "09:00 - 12:00", doctor: "Dr. Sarah Johnson" },
  { id: 2, name: "Evening Session", time: "17:00 - 21:00", doctor: "Dr. Sarah Johnson" },
]

export default function AssistantDashboard() {
  const [bookOpen, setBookOpen] = useState(false)
  const [showSessions, setShowSessions] = useState(false)
  const [selectedSession, setSelectedSession] = useState<string>("")
  const [patientName, setPatientName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSelectSession = (sessionName: string) => {
    setSelectedSession(sessionName)
    setShowSessions(false)
  }

  const handleBookAppointment = () => {
    // Handle booking logic here
    console.log("Booking:", { patientName, phoneNumber, selectedSession })
    setBookOpen(false)
    // Reset form
    setPatientName("")
    setPhoneNumber("")
    setSelectedSession("")
  }

  return (
    <>
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assistant Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage sessions and patient appointments</p>
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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <Card key={m.label} className="panel">
              <CardContent className="p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-semibold text-gray-900">{m.value}</div>
                  <div className="text-gray-600 text-xs sm:text-sm mt-1">{m.label}</div>
                </div>
                <div className="text-gray-400">
                  <m.icon />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Doctor Sessions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SessionCard 
              title="Morning Session" 
              doctor="Dr. Sarah Johnson" 
              time="09:00 - 12:00"
            />
            <SessionCard 
              title="Evening Session" 
              doctor="Dr. Sarah Johnson" 
              time="17:00 - 21:00"
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Patient Appointments</h2>
            <Button 
              className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto"
              onClick={() => setBookOpen(true)}
            >
              Book for Patient
            </Button>
          </div>
          <div className="space-y-4">
            <AppointmentItem
              index={1}
              name="John Doe"
              phone="9876543210"
              session="Morning Session - Dr. Sarah Johnson"
              time="14:50"
            />
            <AppointmentItem
              index={2}
              name="Jane Smith"
              phone="9876543211"
              session="Morning Session - Dr. Sarah Johnson"
              time="19:06"
            />
          </div>
        </section>
      </main>

      <Dialog open={bookOpen} onOpenChange={setBookOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 space-y-3 border-b">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  Book Appointment for Patient
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Enter patient details to book an appointment
                </p>
              </div>
              <button
                onClick={() => setBookOpen(false)}
                className="rounded-sm opacity-70 hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-6">
            <div className="space-y-2">
              <Label htmlFor="patient-name" className="text-sm font-medium">
                Patient Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="patient-name"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Select Session <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSessions(!showSessions)}
                  className="w-full flex items-center justify-between px-3 py-2.5 border-2 border-teal-500 rounded-lg text-left hover:bg-gray-50 transition-colors"
                >
                  <span className={selectedSession ? "text-gray-900" : "text-gray-500"}>
                    {selectedSession || "Choose a session"}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showSessions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    {sessions.map((session) => (
                      <button
                        key={session.id}
                        type="button"
                        onClick={() => handleSelectSession(`${session.name} (${session.time}) - ${session.doctor}`)}
                        className="w-full p-3 text-left hover:bg-gray-50 transition-colors border-b last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{session.name}</div>
                        <div className="text-sm text-gray-600">{session.time} - {session.doctor}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={() => setBookOpen(false)}
              className="min-w-[120px] border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookAppointment}
              disabled={!patientName || !phoneNumber || !selectedSession}
              className="min-w-[120px] bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}