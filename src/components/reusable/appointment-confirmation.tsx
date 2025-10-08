import { Card } from "@/components/ui/card"

type AppointmentConfirmationProps = {
  doctor: string
  date: string
  session: string
  tokenNumber: string
}

export function AppointmentConfirmation({ 
  doctor, 
  date, 
  session, 
  tokenNumber 
}: AppointmentConfirmationProps) {
  return (
    <Card className="border-2 border-green-200 bg-green-50 p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Appointment Confirmed</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Doctor */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Doctor</p>
                <p className="font-semibold text-gray-900">{doctor}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <p className="font-semibold text-gray-900">{date}</p>
              </div>
            </div>

            {/* Session */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Session</p>
                <p className="font-semibold text-gray-900">{session}</p>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code and Token */}
        <div className="flex flex-col items-center gap-3 ml-6">
          <div className="bg-white p-3 rounded-lg border-2 border-gray-200 shadow-sm">
            {/* QR Code Placeholder */}
            <div className="w-32 h-32 bg-white flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <rect x="0" y="0" width="10" height="10" fill="black"/>
                <rect x="20" y="0" width="10" height="10" fill="black"/>
                <rect x="30" y="0" width="10" height="10" fill="black"/>
                <rect x="50" y="0" width="10" height="10" fill="black"/>
                <rect x="70" y="0" width="10" height="10" fill="black"/>
                <rect x="90" y="0" width="10" height="10" fill="black"/>
                <rect x="0" y="10" width="10" height="10" fill="black"/>
                <rect x="60" y="10" width="10" height="10" fill="black"/>
                <rect x="90" y="10" width="10" height="10" fill="black"/>
                <rect x="0" y="20" width="10" height="10" fill="black"/>
                <rect x="20" y="20" width="10" height="10" fill="black"/>
                <rect x="30" y="20" width="10" height="10" fill="black"/>
                <rect x="60" y="20" width="10" height="10" fill="black"/>
                <rect x="90" y="20" width="10" height="10" fill="black"/>
                <rect x="0" y="30" width="10" height="10" fill="black"/>
                <rect x="20" y="30" width="10" height="10" fill="black"/>
                <rect x="30" y="30" width="10" height="10" fill="black"/>
                <rect x="50" y="30" width="10" height="10" fill="black"/>
                <rect x="70" y="30" width="10" height="10" fill="black"/>
                <rect x="90" y="30" width="10" height="10" fill="black"/>
                <rect x="10" y="40" width="10" height="10" fill="black"/>
                <rect x="30" y="40" width="10" height="10" fill="black"/>
                <rect x="50" y="40" width="10" height="10" fill="black"/>
                <rect x="80" y="40" width="10" height="10" fill="black"/>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Token {tokenNumber}
            </span>
            <p className="text-xs text-gray-600 mt-2">Show this QR code at the clinic</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-green-200">
        <p className="text-sm text-gray-700 text-center">
          Please arrive 10 minutes before your scheduled time. You will receive an SMS/email notification when your turn is approaching.
        </p>
      </div>
    </Card>
  )
}