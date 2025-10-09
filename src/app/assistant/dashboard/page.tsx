"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/assistant/dashboard-header"
import { MetricsSection } from "@/components/assistant/metrics-section"
import { SessionsSection } from "@/components/assistant/sessions-section"
import { AppointmentsSection } from "@/components/assistant/appointments-section"
import { SearchPatientDialog } from "@/components/assistant/search-patient-dialog"
import { BookAppointmentDialog } from "@/components/assistant/book-appointment-dialog"
import { ToastNotification } from "@/components/assistant/toast-notification"
import { CalendarIcon, UsersIcon, ClockIcon } from "@/components/assistant/dashboard-icons"

const metrics = [
  { label: "Total Sessions", value: 2, icon: CalendarIcon },
  { label: "Total Patients", value: 3, icon: UsersIcon },
  { label: "Waiting", value: 1, icon: ClockIcon },
]

const sessions = [
  { id: 1, name: "Morning Session", time: "09:00 - 12:00", doctor: "Dr. Sarah Johnson" },
  { id: 2, name: "Evening Session", time: "17:00 - 21:00", doctor: "Dr. Sarah Johnson" },
]

const appointments = [
  {
    index: 1,
    name: "John Doe",
    phone: "9876543210",
    session: "Morning Session - Dr. Sarah Johnson",
    time: "09:00",
  },
  {
    index: 2,
    name: "Jane Smith",
    phone: "9876543211",
    session: "Morning Session - Dr. Sarah Johnson",
    time: "09:15",
  },
]

export default function AssistantDashboard() {
  const [bookOpen, setBookOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showSessions, setShowSessions] = useState(false)
  const [selectedSession, setSelectedSession] = useState<string>("")
  const [patientName, setPatientName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchPhone, setSearchPhone] = useState("")
  const [showToast, setShowToast] = useState(false)

  const existingPatients: Record<string, string> = {
    "9876543210": "John Doe",
    "9876543211": "Jane Smith",
  }

  const handleSearchPatient = () => {
    if (searchPhone.length === 10) {
      const patientName = existingPatients[searchPhone]
      
      if (patientName) {
        setPatientName(patientName)
        setPhoneNumber(searchPhone)
        setSearchOpen(false)
        setBookOpen(true)
      } else {
        setPatientName("")
        setPhoneNumber(searchPhone)
        setShowToast(true)
        setSearchOpen(false)
        setBookOpen(true)
        setTimeout(() => setShowToast(false), 3000)
      }
      setSearchPhone("")
    }
  }

  const handleSelectSession = (sessionName: string) => {
    setSelectedSession(sessionName)
    setShowSessions(false)
  }

  const handleBookAppointment = () => {
    console.log("Booking:", { patientName, phoneNumber, selectedSession })
    setBookOpen(false)
    setPatientName("")
    setPhoneNumber("")
    setSelectedSession("")
  }

  const handleCloseBooking = () => {
    setBookOpen(false)
    setPatientName("")
    setPhoneNumber("")
    setSelectedSession("")
  }

  const handleBackToSearch = () => {
    setBookOpen(false)
    setSearchOpen(true)
  }

  return (
    <>
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <DashboardHeader />
        <MetricsSection metrics={metrics} />
        <SessionsSection sessions={sessions} />
        <AppointmentsSection 
          appointments={appointments}
          onBookClick={() => setSearchOpen(true)}
        />
      </main>

      <ToastNotification 
        show={showToast}
        message="New patient - please fill in details"
      />

      <SearchPatientDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        searchPhone={searchPhone}
        onSearchPhoneChange={setSearchPhone}
        onSearch={handleSearchPatient}
      />

      <BookAppointmentDialog
        open={bookOpen}
        onOpenChange={handleCloseBooking}
        patientName={patientName}
        onPatientNameChange={setPatientName}
        phoneNumber={phoneNumber}
        onPhoneNumberChange={setPhoneNumber}
        selectedSession={selectedSession}
        showSessions={showSessions}
        onShowSessionsChange={setShowSessions}
        sessions={sessions}
        onSelectSession={handleSelectSession}
        onBook={handleBookAppointment}
        onBack={handleBackToSearch}
        isExistingPatient={!!patientName && !!existingPatients[phoneNumber]}
      />
    </>
  )
}