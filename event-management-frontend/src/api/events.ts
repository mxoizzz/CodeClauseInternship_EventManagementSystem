import { api } from './axios'
import type { Event, CreateEventInput } from '../types'

export const eventsApi = {
  getAll: () => api.get<Event[]>('/api/events').then((res) => res.data),

  getMyEvents: (userId: number) =>
    api.get<Event[]>(`/api/events/my/${userId}`).then((res) => res.data),

  create: (data: CreateEventInput) =>
    api.post<Event>('/api/events', data).then((res) => res.data),
}
