import { PortalCard } from "@/components/reusable/portal-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <svg 
                className="w-12 h-12 sm:w-16 sm:h-16 text-teal-500" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-400 mb-3 sm:mb-4">
            Clinic Flow
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Modern clinic management system for seamless patient care and appointment scheduling
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Assistant Portal Card */}
          <PortalCard
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            }
            title="Assistant Portal"
            description="Manage appointments, sessions, and patient flow"
            buttonText="Login as Assistant"
            buttonColor="teal"
            features={[
              "Manage doctor sessions",
              "Allocate tokens automatically",
              "Track appointments in real-time",
              "Generate QR codes for patients"
            ]}
            href="/assistant/login"
          />

          {/* Patient Portal Card */}
          <PortalCard
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            }
            title="Patient Portal"
            description="Book appointments and track your tokens"
            buttonText="Login as Patient"
            buttonColor="indigo"
            features={[
              "Browse available doctors",
              "Book appointments easily",
              "Receive instant token confirmation",
              "Track your appointment status"
            ]}
            href="/patient/login"
          />
        </div>
      </div>
    </div>
  )
}