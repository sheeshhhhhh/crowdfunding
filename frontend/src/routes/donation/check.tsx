import CheckMark from '@/components/common/CheckMark'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import axiosFetch from '@/lib/axios'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type searchParams = {
    client_key: string,
    payment_intent_id: string
}

export const Route = createFileRoute('/donation/check')({
  component: RouteComponent,
  validateSearch: (search: Record<string, any>): searchParams => {
    return {
        client_key: search?.client_key ?? '',
        payment_intent_id: search?.payment_intent_id ?? ''
    }
  }
})

function RouteComponent() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { payment_intent_id } = Route.useSearch()

    // have limit of 5 tries,
    // if payment intent is not succeeded, redirect to error page

    useEffect(() => {
        const checkPaymentIntentStatus = async () => {
            setIsLoading(true)
            try {
                const saveDonation = await axiosFetch.post('/donation/check', {
                    paymentId: payment_intent_id,
                })    
                setIsLoading(false)
                
                if(saveDonation.data.success === true) {
                    await new Promise((resolve) => setTimeout(resolve, 2000))

                    navigate({ to: '/campaigns/$campaignId', params: { campaignId: saveDonation.data.donation.postId } })
                }
            } catch (error) {
                setIsLoading(false)
                toast.error('Error checking payment intent')
            }
        }
        
        checkPaymentIntentStatus()
    }, [])

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div>
                {
                    isLoading 
                    ? <LoadingSpinner className='text-[#07b481]' /> : 
                    <div className='flex items-center'>
                        <h1 className='text-[#07b481] font-bold text-3xl'>Success</h1>
                        <CheckMark className='ml-1 h-[40px] w-[40px]' />
                    </div>
                }
            </div>
        </div>
    )
}
