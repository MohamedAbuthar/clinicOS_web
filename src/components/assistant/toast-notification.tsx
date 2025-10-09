interface ToastNotificationProps {
    show: boolean
    message: string
  }
  
  export function ToastNotification({ show, message }: ToastNotificationProps) {
    if (!show) return null
  
    return (
      <div className="fixed bottom-4 right-4 bg-white border-l-4 border-teal-500 rounded-lg shadow-lg p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50">
        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
    )
  }