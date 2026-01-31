export interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export interface Event {
  id: number
  title: string
  location: string
  eventDate: string
  description: string
  ticketPrice: number
  createdBy: number
}

export interface Ticket {
  id: number
  userId: number
  eventId: number
  quantity: number
  totalPrice: number
  bookedAt: string
}

export interface CreateEventInput {
  title: string
  location: string
  eventDate: string
  description: string
  ticketPrice: number
  createdBy: number
}

export interface BookTicketInput {
  userId: number
  eventId: number
  quantity: number
}
