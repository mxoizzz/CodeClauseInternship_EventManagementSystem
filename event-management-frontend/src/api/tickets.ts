import { api } from './axios'
import type { Ticket, BookTicketInput } from '../types'

export const ticketsApi = {
  book: (data: BookTicketInput) =>
    api.post<Ticket>('/api/tickets', data).then((res) => res.data),

  getByUser: (userId: number) =>
    api.get<Ticket[]>(`/api/tickets/user/${userId}`).then((res) => res.data),

  getByEvent: (eventId: number, userId: number) =>
    api
      .get<Ticket[]>(`/api/tickets/event/${eventId}`, { params: { userId } })
      .then((res) => res.data),
}
