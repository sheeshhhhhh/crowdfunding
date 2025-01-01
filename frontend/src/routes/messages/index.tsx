import ProtectedRoute from '@/components/common/ProtectedRoute'
import MessageList from '@/components/pageComponents/messages/MessageList'
import MessageView from '@/components/pageComponents/messages/MessageView'
import { createFileRoute } from '@tanstack/react-router'

type searchParams = {
    userId?: string,
    conversationId?: string,
    search?: string
}

export const Route = createFileRoute('/messages/')({
  component: () => (
    <ProtectedRoute>
        <RouteComponent />
    </ProtectedRoute>
  ),
  validateSearch: (search: Record<string, string>): searchParams => {
    return {
        userId: search.userId ? search.userId : '',
        conversationId: search.conversationId ? search.conversationId : '',
        search: search.search ? search.search : ''
    }
  }
})

function RouteComponent() {
    

    return (
        <div className='container mx-auto px-4 py-4 max-w-7xl'>
            <h1 className='text-3xl font-bold mb-3'>Messages</h1>
            <div className='flex flex-col md:flex-row gap-6'>
                <div className='w-full md:w-1/3'>
                    <MessageList />
                </div>
                <div className='w-full md:w-2/3'>
                    <MessageView />
                </div>
            </div>
        </div>
    )
}
