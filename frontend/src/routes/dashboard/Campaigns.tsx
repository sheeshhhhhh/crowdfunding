import LoadingSpinner from '@/components/common/LoadingSpinner'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import Campaigns from '@/components/pageComponents/dashboard/Campaigns'
import DashboardSidebar from '@/components/pageComponents/dashboard/DashboardSidebar'
import { Button } from '@/components/ui/button'
import axiosFetch from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/Campaigns')({
  component: () => (
    <ProtectedRoute>
      <div className="flex overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-2 px-5">
            <RouteComponent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  ),
})

function RouteComponent() {

  const { data: mycampaigns, isLoading } = useQuery({
    queryKey: ['mycampaigns'],
    queryFn: async () => {
      const response = await axiosFetch.get('/campaign/my-campaigns')
      return response.data
    },
  })

  return (
    <div className='space-y-4'>
      <header className='flex items-center justify-end'>
        <Link to='/campaigns/create' >
          <Button>Create Campaign</Button>
        </Link>
      </header>
      {isLoading ? 
        <div className='h-[464px] flex items-center justify-center'>
          <LoadingSpinner className='w-8 h-8' />
        </div>
        : <Campaigns campaignData={mycampaigns} />
      }
    </div>
  )
}