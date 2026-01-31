import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8081'

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message ?? err.message ?? 'Request failed'
    return Promise.reject(new Error(message))
  }
)
