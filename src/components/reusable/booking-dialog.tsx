"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type BookingDialogProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
  doctor: string
  specialty: string
  date: string
  sessions: { id: string; label: string; time: string; slots: number }[]
  onConfirm?: (sessionId: string, patientDetails: PatientDetails) => void
}

type PatientDetails = {
  name: string
  age: string
  mobile: string
  address: string
}

export function BookingDialog({ 
  open, 
  onOpenChange, 
  doctor, 
  specialty, 
  date, 
  sessions,
  onConfirm 
}: BookingDialogProps) {
  const [step, setStep] = useState<"details" | "session">("details")
  const [selectedSession, setSelectedSession] = useState(sessions[0]?.id)
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    name: "",
    age: "",
    mobile: "",
    address: ""
  })

  const handleNext = () => {
    // Validate patient details
    if (patientDetails.name && patientDetails.age && patientDetails.mobile && patientDetails.address) {
      setStep("session")
    }
  }

  const handleBack = () => {
    setStep("details")
  }

  const handleConfirm = () => {
    if (onConfirm && selectedSession) {
      onConfirm(selectedSession, patientDetails)
      // Reset form
      setStep("details")
      setPatientDetails({ name: "", age: "", mobile: "", address: "" })
    }
  }

  const handleClose = () => {
    setStep("details")
    setPatientDetails({ name: "", age: "", mobile: "", address: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white z-[100] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 space-y-3 border-b">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Book Appointment
            </DialogTitle>
            <button 
              onClick={handleClose}
              className="rounded-sm opacity-70 hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-semibold text-gray-900">{doctor}</p>
            <p className="text-sm text-gray-600">{specialty}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 pt-2">
            <div className={`flex items-center gap-2 ${step === "details" ? "text-indigo-600" : "text-gray-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === "details" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Patient Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className={`flex items-center gap-2 ${step === "session" ? "text-indigo-600" : "text-gray-400"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === "session" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Select Session</span>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-4 py-4 sm:px-6 sm:py-6">
          {step === "details" ? (
            /* Patient Details Form */
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Enter Your Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={patientDetails.name}
                  onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={patientDetails.age}
                    onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium">
                    Mobile Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="10-digit mobile"
                    maxLength={10}
                    value={patientDetails.mobile}
                    onChange={(e) => setPatientDetails({ 
                      ...patientDetails, 
                      mobile: e.target.value.replace(/\D/g, "") 
                    })}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={patientDetails.address}
                  onChange={(e) => setPatientDetails({ ...patientDetails, address: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>
          ) : (
            /* Session Selection */
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Select Session</h3>
              <RadioGroup value={selectedSession} onValueChange={setSelectedSession} className="space-y-3">
                {sessions.map((s) => (
                  <Label
                    key={s.id}
                    htmlFor={s.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-gray-300 ${
                      selectedSession === s.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem 
                        value={s.id} 
                        id={s.id}
                        className="border-2"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{s.label}</p>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-0.5">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{s.time}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{s.slots} slots</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t bg-gray-50">
          {step === "details" ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="min-w-[120px] border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!patientDetails.name || !patientDetails.age || !patientDetails.mobile || !patientDetails.address}
                className="min-w-[120px] bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="min-w-[120px] border-gray-300 hover:bg-gray-100"
              >
                Back
              </Button>
              <Button 
                onClick={handleConfirm}
                className="min-w-[120px] bg-gray-900 hover:bg-gray-800 text-white"
              >
                Confirm Booking
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}