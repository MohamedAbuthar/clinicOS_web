import { AppointmentItem } from "@/components/reusable/appointment-item"
import { Button } from "@/components/ui/button"

interface Appointment {
  index: number
  name: string
  phone: string
  session: string
  time: string
}

interface AppointmentsSectionProps {
  appointments: Appointment[]
  onBookClick: () => void
}

export function AppointmentsSection({ appointments, onBookClick }: AppointmentsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Patient Appointments</h2>
        <Button 
          className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto"
          onClick={onBookClick}
        >
          Book for Patient
        </Button>
      </div>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.index}
            index={appointment.index}
            name={appointment.name}
            phone={appointment.phone}
            session={appointment.session}
            time={appointment.time}
          />
        ))}
      </div>
    </section>
  )
}