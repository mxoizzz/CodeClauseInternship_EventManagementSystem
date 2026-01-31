import { useEffect, useState } from 'react'
import { eventsApi } from '../api/events'
import { useAuth } from '../context/AuthContext'
import type { Event } from '../types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function MyEvents() {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    let cancelled = false
    eventsApi
      .getMyEvents(user.id)
      .then((data) => {
        if (!cancelled) setEvents(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load events')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-10 w-10 border-2 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-700">
        {error}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Events</h1>
      {events.length === 0 ? (
        <p className="text-slate-500">You haven&apos;t created any events yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-slate-800">{event.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{event.location}</p>
              <p className="text-slate-600 text-sm mt-2 line-clamp-2">{event.description}</p>
              <p className="text-slate-500 text-sm mt-4">{formatDate(event.eventDate)}</p>
              <p className="text-primary-600 font-semibold mt-1">
                ₹{Number(event.ticketPrice).toFixed(2)} / ticket
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
