"use client";

import ProtectedRoute from '../../components/protected-route'
import useDashboard from '@/hooks/useDashboard'

export default function DashboardPage() {
  const { user, logout } = useDashboard()

  return (
    <ProtectedRoute>
      <div className=' flex justify-center items-center'> welcom to dashboard </div>
      <button
        onClick={logout}
      >logout</button>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </ProtectedRoute>
  )
}