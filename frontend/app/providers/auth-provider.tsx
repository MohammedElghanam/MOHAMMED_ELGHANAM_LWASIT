'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

type AuthContextType = {
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  login: (token: string, userData?: { name: string; email: string }) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setIsAuthenticated(true)
      // const userData = localStorage.getItem('user')
      // if (userData) {
      //   setUser(JSON.parse(userData))
      // }
    }
    setLoading(false)
  }, [])

  const login = (token: string, userData?: { name: string; email: string }) => {
    Cookies.set('token', token, {
      expires: 1,
      secure: true,
      sameSite: 'strict'
    })
    setIsAuthenticated(true)
    if (userData) {
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    }
    router.push('/dashboard')
  }

  const logout = () => {
    Cookies.remove('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}