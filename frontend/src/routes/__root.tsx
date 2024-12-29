import LoadingSpinner from '@/components/common/LoadingSpinner'
import NavBar from '@/components/common/NavBar'
import { useAuthContext } from '@/context/AuthContext'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    const { loading } = useAuthContext()
    
    if(loading) {
      return <div className='height-withNav w-full justify-center items-center flex'>
        <LoadingSpinner className='w-10 h-10' />
      </div>
    }

    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
  },
})