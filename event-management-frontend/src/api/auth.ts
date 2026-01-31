import { api } from './axios'
import type { User } from '../types'

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export const authApi = {
  register: (data: RegisterInput) =>
    api.post<User>('/api/auth/register', data).then((res) => res.data),

  login: (data: LoginInput) =>
    api.post<User>('/api/auth/login', data).then((res) => res.data),
}
