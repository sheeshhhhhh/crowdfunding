import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import axiosFetch from '@/lib/axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/donation/sendMessage')({
  component: RouteComponent,
  validateSearch: (search: Record<string, any>) => {
    return {
        donationId: search?.donationId ? search.donationId : '',
    }
  }
})

function RouteComponent() {
    const [message, setMessage] = useState<string>('')
    const navigate = Route.useNavigate()
    const { donationId } = Route.useSearch()

    const { data: CampaignInfo, isLoading: CampaignInfoLoading } = useQuery({
        queryKey: ['donation', donationId],
        queryFn: async () => {
            if(!donationId) return
            const response = await axiosFetch.get(`/donation/${donationId}`)
            
            if(response.status !== 200) {
                return window.location.assign('/error')
            }

            return response.data
        },
        refetchOnWindowFocus: false
    })

    const { mutate: sendMessage, isLoading: sendMessageLoading } = useMutation({
        mutationFn: async () => {
            const response = await axiosFetch.patch(`/donation/${donationId}`, {
                message: message
            })

            if(response.status >= 400) {
                throw new Error('Failed to send message')
            }

            return response.data
        },
        onSuccess: () => {
            toast.success('Message sent successfully')
            navigate({ to: '/campaigns/$campaignId', params: { campaignId: CampaignInfo?.post.id } })
        },
        onError: () => {
            toast.error('Failed to send message Try again!')
        }
    })

    return (
        <div className='max-w-[900px] w-full mx-auto py-4'>
            <div>
                <h1 className="text-4xl font-bold mb-2">{CampaignInfo?.post.title}</h1>
                <img src={CampaignInfo?.post.headerImage} alt={CampaignInfo?.post.title} className="w-full h-[400px] object-cover rounded-lg mb-6" />
            </div>
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold mb-2">Send a message to the donor</h2>
                    <p className='text-lg font-medium'>Donated: ${CampaignInfo.amount}</p>
                </div>
                <div>
                    <Label htmlFor='messageInput'>Message</Label>
                    <Textarea id='messageInput' value={message} onChange={(e) => setMessage(e.target.value)} 
                    placeholder='your words meant a lot specially for people in needs!'/>
                </div>
                <Button disabled={sendMessageLoading || CampaignInfoLoading} onClick={() => sendMessage()} className='mt-4 w-full'>
                    {sendMessageLoading ?  <LoadingSpinner /> : "Send Message"}
                </Button>
            </div>
        </div>
    )
}
