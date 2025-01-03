import ProtectedRoute from '@/components/common/ProtectedRoute'
import DashboardSidebar from '@/components/pageComponents/dashboard/DashboardSidebar'
import Donations, { DonationStastistics } from '@/components/pageComponents/dashboard/Donations'
import axiosFetch from '@/lib/axios'
import { DonationInDashboard } from '@/types/donations'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useSearch } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/Donations')({
    component: () => (
        <ProtectedRoute>
            <div className='flex overflow-hidden'>
                <DashboardSidebar />
                <div className='flex-1 overflow-auto'>
                    {/* <DashboardHeader /> */}
                    <main className='p-2 px-5'>
                        <RouteComponent />
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    ),
    validateSearch: (search: Record<string, string>) => {
        return {
            page: search.page ? parseInt(search.page) : 1,
            search: search.search ? search.search : '',
            campaign: search.campaign ? search.campaign : ''
        }
    }
})

function RouteComponent() {
    const { search, page } = useSearch({ from: '/dashboard/Donations' })

    const { data } = useQuery({
        queryKey: ['donations', search, page],
        queryFn: async () => {
            const response = await axiosFetch.get(`/donation/mydonations?search=${search}&page=${page}`)

            return response.data as { donations: DonationInDashboard[], hasNext: boolean }
        },
        refetchOnWindowFocus: false
    })

    return (
        <div className="w-full">
            <h1 className="text-4xl font-bold mb-8">Donations</h1>
            <DonationStastistics />
            <Donations donations={data?.donations} hasNext={data?.hasNext} 
            page={page} search={search} />
        </div>
    )
}
