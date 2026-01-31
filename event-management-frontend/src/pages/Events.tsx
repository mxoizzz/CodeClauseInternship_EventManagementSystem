import { useEffect, useState } from 'react'
import { eventsApi } from '../api/events'
import { ticketsApi } from '../api/tickets'
import { useAuth } from '../context/AuthContext'
import type { Event } from '../types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function EventCard({
  event,
  quantity,
  onQuantityChange,
  onBook,
}: {
  event: Event
  quantity: number
  onQuantityChange: (qty: number) => void
  onBook: () => void
}) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800">{event.title}</h3>
        <p className="text-slate-500 text-sm mt-1">{event.location}</p>
        <p className="text-slate-600 text-sm mt-2 line-clamp-2">{event.description}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-slate-500 text-sm">
              {formatDate(event.eventDate)}
            </span>
            <p className="text-primary-600 font-semibold mt-0.5">
              ₹{Number(event.ticketPrice).toFixed(2)} / ticket
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Qty</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                onQuantityChange(
                  Math.max(1, parseInt(e.target.value, 10) || 1)
                )
              }
              className="w-14 px-2 py-1.5 rounded border border-slate-300 text-sm"
            />

            <button
              type="button"
              onClick={onBook}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [bookingId, setBookingId] = useState<number | null>(null)
  const [quantity, setQuantity] = useState<Record<number, number>>({})
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    let cancelled = false

    eventsApi
      .getAll()
      .then((data) => {
        if (!cancelled) setEvents(data)
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Failed to load events')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  function handleBookClick(event: Event) {
    if (!user) return
    setSelectedEvent(event)
    setShowModal(true)
  }

  async function confirmBooking() {
    if (!user || !selectedEvent) return

    const qty = quantity[selectedEvent.id] ?? 1
    setBookingId(selectedEvent.id)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await ticketsApi.book({
        userId: user.id,
        eventId: selectedEvent.id,
        quantity: qty,
      })

      setQuantity((prev) => ({
        ...prev,
        [selectedEvent.id]: 1,
      }))

      setShowModal(false)
      setSelectedEvent(null)
    } finally {
      setBookingId(null)
    }
  }

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
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        All Events
      </h1>

      {events.length === 0 ? (
        <p className="text-slate-500">No events yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              quantity={quantity[event.id] ?? 1}
              onQuantityChange={(qty) =>
                setQuantity((prev) => ({
                  ...prev,
                  [event.id]: qty,
                }))
              }
              onBook={() => handleBookClick(event)}
            />
          ))}
        </div>
      )}

      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Booking
            </h2>

            <p className="text-slate-600 mb-2">
              Event:{" "}
              <span className="font-medium">
                {selectedEvent.title}
              </span>
            </p>

            <p className="text-slate-600 mb-2">
              Quantity: {quantity[selectedEvent.id] ?? 1}
            </p>

            <p className="text-primary-600 font-semibold mb-4">
              Total: ₹
              {(
                (quantity[selectedEvent.id] ?? 1) *
                Number(selectedEvent.ticketPrice)
              ).toFixed(2)}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={confirmBooking}
                disabled={bookingId === selectedEvent.id}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-700 disabled:opacity-50"
              >
                {bookingId === selectedEvent.id
                  ? 'Processing Payment...'
                  : 'Proceed to Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
