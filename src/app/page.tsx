import { PortalCard } from "@/components/reusable/portal-card"

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold text-balance" style={{ color: "var(--brand)" }}>
          Clinic Flow
        </h1>
        <p className="text-muted-foreground mt-2">Modern clinic management for assistants and patients</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <PortalCard
          title="Assistant Portal"
          description="Manage appointments, sessions, and patient flow"
          href="/assistant/login"
          variant="teal"
          bullets={[
            "Manage doctor sessions",
            "Allocate tokens automatically",
            "Track appointments in real-time",
            "Generate QR codes for patients",
          ]}
        />
        <PortalCard
          title="Patient Portal"
          description="Book appointments and track your tokens"
          href="/patient/login"
          variant="purple"
          bullets={[
            "Browse available doctors",
            "Book appointments easily",
            "Receive instant token confirmation",
            "Track your appointment status",
          ]}
          cta="Login as Patient"
        />
      </section>
    </main>
  )
}
