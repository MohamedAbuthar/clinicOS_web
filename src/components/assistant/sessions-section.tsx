import { SessionCard } from "@/components/reusable/session-card"

interface Session {
  id: number
  name: string
  time: string
  doctor: string
}

interface SessionsSectionProps {
  sessions: Session[]
}

export function SessionsSection({ sessions }: SessionsSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Doctor Sessions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sessions.map((session) => (
          <SessionCard 
            key={session.id}
            title={session.name}
            doctor={session.doctor}
            time={session.time}
          />
        ))}
      </div>
    </section>
  )
}
