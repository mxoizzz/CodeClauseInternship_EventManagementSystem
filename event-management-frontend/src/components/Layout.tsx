import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const nav = [
    { to: '/', label: 'All Events' },
    { to: '/my-events', label: 'My Events' },
    { to: '/my-tickets', label: 'My Tickets' },
    { to: '/create-event', label: 'Create Event' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary-600">
            EventHub
          </Link>
          <nav className="flex items-center gap-1 sm:gap-4">
            {nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-2 pl-2 border-l border-slate-200">
              <span className="text-sm text-slate-500 hidden sm:inline">{user?.name}</span>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
