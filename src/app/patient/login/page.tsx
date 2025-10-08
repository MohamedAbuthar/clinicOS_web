"use client"


import { FormShell } from "@/components/reusable/form-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function PatientLogin() {
  const router = useRouter()
  return (
    <FormShell
      title="Patient Login"
      subtitle="Enter your mobile number to receive OTP"
      submitLabel="Send OTP"
      variant="purple"
      onSubmit={() => router.push("/patient/dashboard")}
      footer={<span>Demo: Use any 10-digit mobile number</span>}
      icon={<span className="sr-only">Patient Icon</span>}
    >
      <div className="space-y-1">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input id="mobile" type="tel" placeholder="Enter your 10-digit mobile number" />
      </div>
    </FormShell>
  )
}
