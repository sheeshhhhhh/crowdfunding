import NavBar from '@/components/common/NavBar'
import { useAuthContext } from '@/context/AuthContext'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    const { loading } = useAuthContext()
    
    if(loading) return null

    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
  },
})