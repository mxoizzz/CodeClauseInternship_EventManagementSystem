import { useEffect, useState } from 'react'
import { ticketsApi } from '../api/tickets'
import { eventsApi } from '../api/events'
import { useAuth } from '../context/AuthContext'
import type { Ticket } from '../types'
import type { Event } from '../types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function MyTickets() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [eventsMap, setEventsMap] = useState<Record<number, Event>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    let cancelled = false
    Promise.all([ticketsApi.getByUser(user.id), eventsApi.getAll()])
      .then(([ticketList, eventList]) => {
        if (cancelled) return
        setTickets(ticketList)
        const map: Record<number, Event> = {}
        eventList.forEach((e) => {
          map[e.id] = e
        })
        setEventsMap(map)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load tickets')
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
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Tickets</h1>
      {tickets.length === 0 ? (
        <p className="text-slate-500">You don&apos;t have any tickets yet.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const event = eventsMap[ticket.eventId]
            return (
              <article
                key={ticket.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {event?.title ?? `Event #${ticket.eventId}`}
                  </h3>
                  {event && (
                    <p className="text-slate-500 text-sm mt-1">
                      {event.location} · {formatDate(event.eventDate)}
                    </p>
                  )}
                  <p className="text-slate-600 text-sm mt-2">
                    Quantity: {ticket.quantity} · Total: ₹{Number(ticket.totalPrice).toFixed(2)}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Booked at {formatDate(ticket.bookedAt)}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
