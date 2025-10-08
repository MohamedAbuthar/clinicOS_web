import { SessionCard } from "@/components/reusable/session-card"
import { AppointmentItem } from "@/components/reusable/appointment-item"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Users } from "@/components/ui/icons"

const metrics = [
  { label: "Total Sessions", value: 2, icon: Calendar },
  { label: "Total Patients", value: 2, icon: Users },
  { label: "Waiting", value: 2, icon: Clock },
]

export default function AssistantDashboard() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
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
          <SessionCard title="Morning Session" doctor="Dr. Sarah Johnson" time="09:00 - 12:00" status="Not Started" />
          <SessionCard title="Evening Session" doctor="Dr. Sarah Johnson" time="17:00 - 21:00" status="Not Started" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Patient Appointments</h2>
          <a className="brand-btn px-4 py-2 rounded-md text-sm" href="#">
            Book for Patient
          </a>
        </div>
        <div className="space-y-4">
          <AppointmentItem
            index={1}
            name="John Doe"
            phone="9876543210"
            session="Morning Session - Dr. Sarah Johnson"
            time="09:00"
          />
          <AppointmentItem
            index={2}
            name="Jane Smith"
            phone="9876543211"
            session="Morning Session - Dr. Sarah Johnson"
            time="09:15"
          />
        </div>
      </section>
    </main>
  )
}
