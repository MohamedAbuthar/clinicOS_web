import { MetricCard } from "./metric-card"

interface Metric {
  label: string
  value: number
  icon: React.ComponentType
}

interface MetricsSectionProps {
  metrics: Metric[]
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <MetricCard key={m.label} label={m.label} value={m.value} icon={m.icon} />
      ))}
    </section>
  )
}