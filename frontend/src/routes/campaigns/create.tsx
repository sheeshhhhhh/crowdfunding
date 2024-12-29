import ProtectedRoute from '@/components/common/ProtectedRoute'
import CampaignForm, { dataStateType } from '@/components/pageComponents/dashboard/campaign/CampaignForm'
import { CardDescription, CardTitle } from '@/components/ui/card'
import axiosFetch from '@/lib/axios'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toFormData } from 'axios'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/campaigns/create')({
  component: () => (
    <ProtectedRoute>
        <RouteComponent />
    </ProtectedRoute>
  ),
})


function RouteComponent() {
    const navigate = useNavigate()

    const onSubmit = async (data: dataStateType) => {
        const formData = toFormData(data)

        try {
            const response = await axiosFetch.post('/campaign', formData)
            if(response.status === 201) {
                toast.success('Campaign created successfully.')
                            
                navigate({ to: '/dashboard/Campaigns' }) 
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        }
    }

    return (
        <div className='height-withNav pt-10'>
            <header className='flex items-center'>
            </header>
            <div className='max-w-[800px] mx-auto'>
                <CardTitle className=''>
                    Create New Campaign
                </CardTitle>
                <CardDescription>
                    Fill in the details to start your new fundraising campaign.
                </CardDescription>
                <CampaignForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}
