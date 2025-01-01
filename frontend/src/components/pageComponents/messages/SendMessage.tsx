import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axiosFetch from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Send } from 'lucide-react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { updateMessages } from './hooks/message.hook'

const SendMessage = () => {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate({ from: '/messages' })
    const queryClient = useQueryClient();

    const { userId, conversationId } = useSearch({ from: '/messages/'}) 

    const handleMessage = async (e: FormEvent) => {
        e.preventDefault()
        if(!message) return toast.error('Message is required')

        if(isLoading) {
            return
        }
        
        setIsLoading(true)
        try {
            if(!userId) {
                return toast.error('userId is missing')
            }

            const response = await axiosFetch.post(`/message/sendMessage/${userId}`, {
                message,
                conversationId
            })

            if(response.data) {
                // set conversation id when needed
                if(!conversationId) {
                    navigate({ search: prev => ({ ...prev, conversationId: response.data.conversationId })})
                }

                setMessage('')

                // update message
                updateMessages(userId, response.data, queryClient)

                queryClient.invalidateQueries(['pastConversations'])
                if(!conversationId) {
                    // request the message if it's a new conversation
                    queryClient.invalidateQueries(['getMessages', userId])
                }
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
            <Button disabled={isLoading || !message.trim()} type="submit" size="icon">
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