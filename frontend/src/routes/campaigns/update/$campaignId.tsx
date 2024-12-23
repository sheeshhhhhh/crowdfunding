import LoadingSpinner from '@/components/common/LoadingSpinner'
import CampaignForm, { dataStateType, initialDataType } from '@/components/pageComponents/dashboard/campaign/CampaignForm'
import { CardDescription, CardTitle } from '@/components/ui/card'
import axiosFetch from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toFormData } from 'axios'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/campaigns/update/$campaignId')({
    component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { campaignId } = Route.useParams()

  const { data: initialData, isLoading } = useQuery({
    queryKey: ['campaigns', 'initialData'],
    queryFn: async () => {
      const response = await axiosFetch.get(`/campaign/${campaignId}`)
      return response.data as initialDataType
    },
    refetchOnWindowFocus: false
  })

  const onSubmit = async (data: dataStateType) => {
    const formData = toFormData(data)

    try {
      const response = await axiosFetch.patch(`/campaign/${campaignId}`, formData)
      if (response.status === 200) {
        toast.success('Campaign successfully updated.')

        navigate({ to: '/dashboard/Campaigns', reloadDocument: true })
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen pt-10">
      <header className="flex items-center"></header>
      <div className="max-w-[800px] mx-auto">
        <CardTitle className="">Update Campaign</CardTitle>
        <CardDescription>
          Change what you want to change in the campaign information.
        </CardDescription>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <CampaignForm isUpdate={true} onSubmit={onSubmit} initialData={initialData} />
        )}
      </div>
    </div>
  )
}
