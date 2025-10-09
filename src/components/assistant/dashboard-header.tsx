export function DashboardHeader() {
    return (
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assistant Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage sessions and patient appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            className="text-sm font-medium hover:underline flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors" 
            href="/manage-patients"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Patients
          </a>
          <a 
            className="text-sm font-medium hover:underline flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors" 
            href="/"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </a>
        </div>
      </header>
    )
  }