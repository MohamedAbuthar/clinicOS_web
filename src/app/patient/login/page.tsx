"use client"

import { useState } from "react"
import { FormShell } from "@/components/reusable/form-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PatientLogin() {
  const router = useRouter()
  const [step, setStep] = useState<"mobile" | "otp">("mobile")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [showToast, setShowToast] = useState(false)

  const handleSendOTP = () => {
    if (mobile.length === 10) {
      setStep("otp")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      router.push("/patient/dashboard")
    }
  }

  const handleChangeMobile = () => {
    setStep("mobile")
    setOtp("")
  }

  return (
    <>
      {step === "mobile" ? (
        <FormShell
          title="Patient Login"
          subtitle="Enter your mobile number to receive OTP"
          submitLabel="Send OTP"
          variant="purple"
          onSubmit={handleSendOTP}
          footer={<span className="text-sm">Demo: Use any 10-digit mobile number</span>}
          icon={
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        >
          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm font-medium">
              Mobile Number
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="pl-10 h-11"
              />
            </div>
          </div>
        </FormShell>
      ) : (
        <FormShell
          title="Patient Login"
          subtitle="Enter the OTP sent to your mobile"
          submitLabel="Verify OTP"
          variant="purple"
          onSubmit={handleVerifyOTP}
          footer={<span className="text-sm">Demo: Use any 6-digit code to verify</span>}
          icon={
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Enter OTP
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="text-center text-lg tracking-widest h-11"
              />
            </div>
            <Button
              variant="ghost"
              className="w-full text-sm hover:underline"
              onClick={handleChangeMobile}
              type="button"
            >
              Change Mobile Number
            </Button>
          </div>
        </FormShell>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-3 sm:p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 max-w-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm font-medium text-gray-900">OTP sent to your mobile number!</p>
        </div>
      )}
    </>
  )
}