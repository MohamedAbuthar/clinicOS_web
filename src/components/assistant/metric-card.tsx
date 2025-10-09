import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  label: string
  value: number
  icon: React.ComponentType
}

export function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <Card className="panel">
      <CardContent className="p-4 sm:p-5 flex items-center justify-between">
        <div>
          <div className="text-2xl sm:text-3xl font-semibold text-gray-900">{value}</div>
          <div className="text-gray-600 text-xs sm:text-sm mt-1">{label}</div>
        </div>
        <div className="text-gray-400">
          <Icon />
        </div>
      </CardContent>
    </Card>
  )
}