import NavBar from '@/components/common/NavBar'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import DashboardSidebar from '@/components/pageComponents/dashboard/DashboardSidebar'
import Overview from '@/components/pageComponents/dashboard/Overview'
import axiosFetch from '@/lib/axios'
import { DonationOverview } from '@/types/donations'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/dashboard/Overview')({
  component: () => (
    <ProtectedRoute>
      <div className='flex overflow-hidden'>  
        <DashboardSidebar />
        <div className='flex-1 overflow-auto'>
            <main className='p-2 px-5'>
              <RouteComponent />
            </main>
        </div>
      </div>
    </ProtectedRoute>
  ),
})

function RouteComponent() {

  const { data, isLoading } = useQuery({
    queryKey: ['preview'],
    queryFn: async () => {
        const response = await axiosFetch.get('/donation/overview')

        // incase of error
        if(response.status !== 200) {
          toast.error('Failed to fetch data')
          window.location.assign('error')
          return undefined
        }

        return response.data as DonationOverview
    },
    refetchOnWindowFocus: false
  })


  return (
    <div className='w-full'>
        <h1 className='text-4xl font-bold mb-8'>Overview</h1>
        <Overview data={data} isLoading={isLoading} />
    </div>
  )
}
