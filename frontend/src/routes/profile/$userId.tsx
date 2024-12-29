import LoadingSpinner from '@/components/common/LoadingSpinner'
import CampaignList from '@/components/pageComponents/profile/CampaignList'
import ProfileHeader from '@/components/pageComponents/profile/ProfileHeader'
import axiosFetch from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
    const { userId } = Route.useParams()

    const { data: user, isLoading } = useQuery({
        queryKey: ['profile', userId],
        queryFn: async () => {
            const response = await axiosFetch.get(`/user/getProfile/${userId}`)

            if(response.status === 404) {
                // redirect to 404 page
                return
            }

            return response.data
        },
        refetchOnWindowFocus: false
    })

    if(isLoading) {
        return <div>
            <LoadingSpinner />
        </div>
    }

    return (
        <div className='container mx-auto px-4 py-8 max-w-7xl'>
            <ProfileHeader id={user.id} name={user.username} profile={user.profile} stats={user.stats}
            location={user.location} bio={user.bio} />
            <CampaignList id={user.id} campaigns={user.crodfundPosts} />
        </div>
    )
}
