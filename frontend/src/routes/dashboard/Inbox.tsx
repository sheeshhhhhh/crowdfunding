import ProtectedRoute from '@/components/common/ProtectedRoute'
import DashboardSidebar from '@/components/pageComponents/dashboard/DashboardSidebar'
import Inbox from '@/components/pageComponents/dashboard/Inbox'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/Inbox')({
    component: () => (
      <ProtectedRoute>
        <div className='flex h-screen overflow-hidden'>
            <DashboardSidebar />
            <div className='flex-1 overflow-auto'>
                {/* <DashboardHeader /> */}
                <main className='flex-1 p-6'>
                    <RouteComponent />
                </main>
            </div>
        </div>
      </ProtectedRoute>
      ),
})

function RouteComponent() {
  return (
    <div>
        <Inbox />
    </div>
  )
}
