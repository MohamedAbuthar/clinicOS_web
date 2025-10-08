"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormShell } from "@/components/reusable/form-shell"
import { useRouter } from "next/navigation"

export default function AssistantLogin() {
  const router = useRouter()
  return (
    <FormShell
      title="Assistant Login"
      subtitle="Enter your credentials to access the assistant portal"
      submitLabel="Sign In"
      variant="teal"
      onSubmit={() => router.push("/assistant/dashboard")}
      footer={<span>Demo: Use any username and password to login</span>}
      icon={<span className="sr-only">Assistant Icon</span>}
    >
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Enter your username" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter your password" />
      </div>
    </FormShell>
  )
}
