"use client"

import { useState } from "react"
import { SessionCard } from "@/components/reusable/session-card"
import { AppointmentItem } from "@/components/reusable/appointment-item"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, X } from "@/components/ui/icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const metrics = [
  { label: "Total Sessions", value: 2, icon: Calendar },
  { label: "Total Patients", value: 3, icon: Users },
  { label: "Waiting", value: 1, icon: Clock },
]

const sessions = [
  { id: 1, name: "Morning Session", time: "09:00 - 12:00", doctor: "Dr. Sarah Johnson" },
  { id: 2, name: "Evening Session", time: "17:00 - 21:00", doctor: "Dr. Sarah Johnson" },
]

export default function AssistantDashboard() {
  const [bookOpen, setBookOpen] = useState(false)
  const [showSessions, setShowSessions] = useState(false)
  const [selectedSession, setSelectedSession] = useState<string>("")

  const handleSelectSession = (sessionName: string) => {
    setSelectedSession(sessionName)
    setShowSessions(false)
  }

  return (
    <>
      <main className="max-w-[1600px] mx-auto px-8 py-8 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Assistant Dashboard</h1>
            <p className="text-muted-foreground">Manage sessions and patient appointments</p>
          </div>
          <a className="text-sm hover:underline" href="/">
            Logout
          </a>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <Card key={m.label} className="panel">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-semibold">{m.value}</div>
                  <div className="text-muted-foreground">{m.label}</div>
                </div>
                <m.icon className="size-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Doctor Sessions</h2>
          <div className="grid md:grid-cols-2 gap-4">
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Patient Appointments</h2>
            <Button 
              className="brand-btn"
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

      {bookOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setBookOpen(false)} />
      )}
      <Dialog open={bookOpen} onOpenChange={setBookOpen} className="bg-transparent">
        <DialogContent className="sm:max-w-[600px]">
          <button
            onClick={() => setBookOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <DialogHeader>
            <DialogTitle className="text-2xl">Book Appointment for Patient</DialogTitle>
            <p className="text-muted-foreground">
              Enter patient details to book an appointment
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient Name</Label>
              <Input
                id="patient-name"
                placeholder="Enter patient name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit phone number"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Session</Label>
              <div className="relative">
                <button
                  onClick={() => setShowSessions(!showSessions)}
                  className="w-full flex items-center justify-between px-3 py-2 border-2 border-[color:var(--brand)] rounded-lg text-left"
                >
                  <span className={selectedSession ? "" : "text-muted-foreground"}>
                    {selectedSession || "Choose a session"}
                  </span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showSessions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10 overflow-hidden">
                    {sessions.map((session, idx) => (
                      <button
                        key={session.id}
                        onClick={() => handleSelectSession(`${session.name} (${session.time}) - ${session.doctor}`)}
                        className={`w-full p-3 text-left hover:bg-accent ${
                          idx === 0 ? "bg-purple-50" : ""
                        }`}
                      >
                        {session.name} ({session.time}) - {session.doctor}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setBookOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="brand-btn flex-1"
              onClick={() => setBookOpen(false)}
            >
              Book Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}