import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Session {
  id: number
  name: string
  time: string
  doctor: string
}

interface BookAppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientName: string
  onPatientNameChange: (value: string) => void
  phoneNumber: string
  onPhoneNumberChange: (value: string) => void
  selectedSession: string
  showSessions: boolean
  onShowSessionsChange: (show: boolean) => void
  sessions: Session[]
  onSelectSession: (session: string) => void
  onBook: () => void
  onBack: () => void
  isExistingPatient: boolean
}

export function BookAppointmentDialog({
  open,
  onOpenChange,
  patientName,
  onPatientNameChange,
  phoneNumber,
  onPhoneNumberChange,
  selectedSession,
  showSessions,
  onShowSessionsChange,
  sessions,
  onSelectSession,
  onBook,
  onBack,
  isExistingPatient
}: BookAppointmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white max-h-[85vh] overflow-y-auto">
        <DialogHeader className="px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 space-y-3 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Book Appointment for Patient
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-2">
                {patientName ? `Existing patient - ${patientName}` : "New patient - Enter details to book"}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </DialogHeader>

        <div className="px-4 py-4 space-y-4 sm:px-6 sm:py-6">
          <div className="space-y-2">
            <Label htmlFor="patient-name" className="text-sm font-medium">
              Patient Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="patient-name"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => onPatientNameChange(e.target.value)}
              className="h-11"
              disabled={isExistingPatient}
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
              onChange={(e) => onPhoneNumberChange(e.target.value.replace(/\D/g, ""))}
              className="h-11"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Select Session <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => onShowSessionsChange(!showSessions)}
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
                      onClick={() => onSelectSession(`${session.name} (${session.time}) - ${session.doctor}`)}
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={onBack}
            className="min-w-[120px] border-gray-300 hover:bg-gray-100"
          >
            Back
          </Button>
          <Button
            onClick={onBook}
            disabled={!patientName || !phoneNumber || !selectedSession}
            className="min-w-[140px] bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add & Book
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  