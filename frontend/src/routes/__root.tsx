import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useAuthContext } from '@/context/AuthContext'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    const { user, loading } = useAuthContext()
    
    if(loading) {
      return <div className='min-h-screen w-full justify-center items-center flex'>
        <LoadingSpinner className='w-10 h-10' />
      </div>
    }

    return (
      <>
        <Outlet />
      </>
    )
  },
})