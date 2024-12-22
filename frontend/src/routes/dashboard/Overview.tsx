import DashboardSidebar from '@/components/pageComponents/dashboard/DashboardSidebar'
import Overview from '@/components/pageComponents/dashboard/Overview'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/Overview')({
  component: () => (
    <div className='flex h-screen overflow-hidden'>
        <DashboardSidebar />
        <div className='flex-1 overflow-auto'>
            {/* <DashboardHeader /> */}
            <main className='flex-1 p-6'>
                <RouteComponent />
            </main>
        </div>
    </div>
  ),
})

function RouteComponent() {
  return (
    <div>
        <Overview />
    </div>
  )
}
