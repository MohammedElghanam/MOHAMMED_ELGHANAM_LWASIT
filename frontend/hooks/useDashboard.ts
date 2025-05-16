import { useAuthContext } from "@/app/providers/auth-provider"

const useDashboard = () => {
    const { isAuthenticated, user, logout } = useAuthContext()

  return {
    user,
    logout
  }
}

export default useDashboard