import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '../types'
import { authApi } from '../api/auth'
import type { LoginInput, RegisterInput } from '../api/auth'

const STORAGE_KEY = 'event_user'

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

interface AuthContextValue {
  user: User | null
  login: (data: LoginInput) => Promise<void>
  register: (data: RegisterInput) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser)

  const login = useCallback(async (data: LoginInput) => {
    const u = await authApi.login(data)
    setUser(u)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  }, [])

  const register = useCallback(async (data: RegisterInput) => {
    const u = await authApi.register(data)
    setUser(u)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value: AuthContextValue = {
    user,
    login,
    register,
    logout,
    isAuthenticated: user != null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
