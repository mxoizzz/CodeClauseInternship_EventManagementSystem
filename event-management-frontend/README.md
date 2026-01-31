# Event Management System – Frontend

React + TypeScript + Tailwind CSS frontend for the Event Management System backend.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment (optional)**

   The app talks to `http://localhost:8081` by default. To use another backend URL:

   ```bash
   # .env or .env.local
   VITE_API_URL=http://localhost:8081
   ```

3. **Run backend**

   Start the Spring Boot backend on port **8081** (see `Event-Management-System-Backend`).

4. **Run frontend**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173). Sign up or log in, then use All Events, My Events, My Tickets, and Create Event.

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Features

- **Auth**: Register, Login, Logout (user stored in `localStorage`)
- **Events**: List all events, create event (when logged in)
- **Tickets**: Book tickets with quantity, view my tickets
- **My Events**: List events created by the current user

All API calls use **axios** with base URL from `VITE_API_URL` or `http://localhost:8081`.
