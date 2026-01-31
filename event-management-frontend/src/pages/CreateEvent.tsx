import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eventsApi } from '../api/events'
import { useAuth } from '../context/AuthContext'

export default function CreateEvent() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [description, setDescription] = useState('')
  const [ticketPrice, setTicketPrice] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setError('')
    setLoading(true)
    try {
      await eventsApi.create({
        title,
        location,
        eventDate: new Date(eventDate).toISOString(),
        description,
        ticketPrice: parseFloat(ticketPrice) || 0,
        createdBy: user.id,
      })
      navigate('/my-events', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const minDateTime = new Date().toISOString().slice(0, 16)

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            placeholder="Event title"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            placeholder="Venue or address"
          />
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-slate-700 mb-1">
            Date & time
          </label>
          <input
            id="eventDate"
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            min={minDateTime}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition resize-none"
            placeholder="Describe your event"
          />
        </div>
        <div>
          <label htmlFor="ticketPrice" className="block text-sm font-medium text-slate-700 mb-1">
            Ticket price (₹)
          </label>
          <input
            id="ticketPrice"
            type="number"
            min="0"
            step="0.01"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            placeholder="0.00"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Creating...' : 'Create event'}
        </button>
      </form>
    </div>
  )
}
