import CheckMark from '@/components/common/CheckMark'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import axiosFetch from '@/lib/axios'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type searchParams = {
    client_key?: string,
    payment_intent_id?: string,
    sessionId?: string,
    type: "paymongo" | "stripe" | ""
}

export const Route = createFileRoute('/donation/check')({
  component: RouteComponent,
  validateSearch: (search: Record<string, any>): searchParams => {
    return {
        client_key: search?.client_key ?? '',
        payment_intent_id: search?.payment_intent_id ?? '',
        sessionId: search?.sessionId ? search?.sessionId : '',
        type: search?.type ? search.type : ''
    }
  }
})

function RouteComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState<boolean | undefined>(undefined)

    const [donationId, setDonationId] = useState<string>('')
    const [campaignId, setCampaignId] = useState<string>('')

    const { payment_intent_id, sessionId, type } = Route.useSearch()

    const checkPaymentIntentStatus = async () => {
        if(isLoading) return // to prevent duplicates
        setIsLoading(true)

        try {
            const paymentId = type === 'stripe' ? sessionId : payment_intent_id
            const saveDonation = await axiosFetch.post('/donation/check', {
                paymentId: paymentId,
                type: type
            })    

            if(saveDonation.data.success === true) {
                setSuccess(true)
                setDonationId(saveDonation.data.donation.id)
                setCampaignId(saveDonation.data.donation.postId)
            } else {            
                setSuccess(false)
            }
        } catch (error) {
            toast.error('Error checking payment intent')
            setSuccess(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {        
        checkPaymentIntentStatus()
    }, [])

    return (
        <div className='height-withNav flex flex-col gap-4 justify-center items-center'>
            <div>
                {
                    isLoading
                    ? <LoadingSpinner className='text-[#07b481]' /> : 
                    <div className=''>
                        {success === true && success !== undefined &&
                            <>
                                <div className='flex items-center gap-2'>
                                    <h1 className='text-[#07b481] font-bold text-3xl'>Success</h1>
                                    <CheckMark className='ml-1 h-[40px] w-[40px]' />
                                </div>
                                <div className='mt-3'>
                                    <p className='font-bold text-2xl text-[#07b481]'>
                                        Thank you for Donating!
                                    </p>
                                </div>
                            </>
                        }
                        {success === false && success !== undefined &&
                            <>
                                <div className='flex items-center gap-2'>
                                    <h1 className='text-red-500 font-bold text-3xl'>Failed</h1>

                                </div>
                                <div className='mt-3'>
                                    <p className='font-bold text-2xl text-red-500'>
                                        Payment is not yet received!
                                    </p>
                                </div>
                                <Button onClick={checkPaymentIntentStatus} className='mt-4'>
                                    Try Again
                                </Button>
                            </>
                        }
                    </div>
                }
            </div>
            <div>
                {
                    success &&
                    <div className='flex gap-4'>
                        <Link to='/campaigns/$campaignId' params={{ campaignId: campaignId }}>
                            <Button>
                                Go back
                            </Button>
                        </Link>
                        <Link to='/donation/sendMessage' search={{ donationId: donationId }}>
                            <Button>
                                Send A Message
                            </Button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
