'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '../app/providers/auth-provider'
import LoadingSpinner from './ui/loadingSpinner'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}