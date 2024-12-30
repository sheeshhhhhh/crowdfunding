import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axiosFetch from '@/lib/axios'
import { conversation, pastConversations } from '@/types/message'
import { useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { Send } from 'lucide-react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'



const SendMessage = () => {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const queryClient = useQueryClient();

    const { userId, conversationId } = useSearch({ from: '/messages/'}) 

    const handleMessage = async (e: FormEvent) => {
        if(isLoading) {
            return
        }
        
        e.preventDefault()
        setIsLoading(true)
        try {
            if(!userId || !conversationId) {
                return toast.error('userId or conversationId is missing')
            }

            const response = await axiosFetch.post(`/message/sendMessage/${userId}`, {
                message,
                conversationId
            })

            if(response.data) {
                // updating the cache
                queryClient.setQueryData(['getMessages', userId], (old: any) => {
                    return {
                        ...old,
                        messages: old.messages ? [...old.messages, response.data] : [response.data]
                    }
                })

                queryClient.invalidateQueries(['pastConversations'])

                setMessage('')
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
        
    return (
        <form onSubmit={handleMessage} className="flex w-full items-center space-x-2">
            <Input value={message} onChange={(e) => setMessage(e.target.value)} className="flex grow" placeholder="Type your message..." />
            <Button disabled={isLoading} type="submit" size="icon">
            {
                isLoading ? 
                <LoadingSpinner /> : 
                <div className='flex items-center gap-3'>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send Message</span>
                </div>
            }
            </Button>
        </form>
    )
}

export default SendMessage