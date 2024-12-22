import Campaigns from '@/components/pageComponents/dashboard/Campaigns'
import DashboardSidebar from '@/components/pageComponents/dashboard/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/Campaigns')({
  component: () => (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        {/* <DashboardHeader /> */}
        <main className="flex-1 p-6">
          <RouteComponent />
        </main>
      </div>
    </div>
  ),
})

function RouteComponent() {
  return (
    <div className='space-y-4'>
      <header className='flex items-center justify-end'>
        <Link to='/campaigns/create' >
          <Button>Create Campaign</Button>
        </Link>
      </header>
      <Campaigns />
    </div>
  )
}