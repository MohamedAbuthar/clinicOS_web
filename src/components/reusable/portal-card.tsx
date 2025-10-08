import { Button } from "@/components/ui/button"
import Link from "next/link"

type PortalCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  buttonColor: "teal" | "indigo"
  features: string[]
  href: string
}

export function PortalCard({
  icon,
  title,
  description,
  buttonText,
  buttonColor,
  features,
  href
}: PortalCardProps) {
  const buttonStyles = {
    teal: "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/30",
    indigo: "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-center mb-6">
        {description}
      </p>

      {/* Button */}
      <Link href={href} className="block mb-6">
        <Button 
          className={`w-full py-6 text-base font-semibold rounded-xl ${buttonStyles[buttonColor]} transition-all duration-200`}
        >
          {buttonText}
        </Button>
      </Link>

      {/* Features List */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-600 text-sm">
            <span className="text-gray-400 mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}