import { useAuthContext } from "@/context/AuthContext"
import { useSocket } from "@/context/SocketContext"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { fetchMessages, updateMessages } from "./hooks/message.hook"
import toast from "react-hot-toast"
import { message, pastConversations } from "@/types/message"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LoadingSpinner from "@/components/common/LoadingSpinner"


const MessagesDisplay = () => {
    const { user } = useAuthContext()
    const { socket } = useSocket()
    const { userId, conversationId, search } = useSearch({ from: '/messages/'})

    const scrollRef = useRef<HTMLDivElement>(null)
    const isFetchingOlder = useRef(false); // to track if we're fetching older messages
    
    const queryClient = useQueryClient()

    // infinite scrolling
    const { 
        data: getMessages,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['getMessages', userId],
        queryFn: async ({ pageParam = 1}) => fetchMessages(userId, pageParam),
        getNextPageParam: (lastPage) => lastPage?.nextPage || null,
        onError: () => toast.error("Failed to fetch data"),
        refetchOnWindowFocus: false,
        retry: 0,
    })

    // used for listening in messages using socket
    useEffect(() => {
        if(!userId) {
            return
        }
        
        socket?.on('message',  (data: message) => {
            updateMessages(userId, data, queryClient)

            queryClient.setQueryData(['pastConversations', search], (old: pastConversations | undefined) => old ?
                old.map((conversations) => {
                    if(conversations.id === conversationId) {
                        return {
                            ...conversations,
                            messages: [data]
                        }
                    }
                    return conversations
                })
            : undefined)
        })

        return () => {
            socket?.off('message')
        }
    }, [userId, socket])

    const handleScroll = async () => {
        if (!scrollRef.current || !hasNextPage || isFetchingNextPage) return
        const { scrollTop } = scrollRef.current
        if (scrollTop === 0) {
            isFetchingOlder.current = true;
            const { hasNextPage, } = await fetchNextPage()
            
            if(!hasNextPage) return // to prevent scrolling to the botttom

            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    // if there is new message sent to you or sent by you, scroll to the bottom
    useEffect(() => {
        if(!getMessages || !scrollRef.current) return

        if (isFetchingOlder.current) {
            isFetchingOlder.current = false;
            return;
        }

        if (getMessages && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [getMessages]); 

    if(!userId) {
        return
    }

    return (
        <div onScroll={handleScroll} ref={scrollRef} className="h-[580px] overflow-y-scroll space-y-4 custom-scrollbar py-3"> 
            {
                isLoading ? <LoadingSpinner className="mt-4" /> : 
                isError ? <p className="text-center text-muted-foreground mt-4">Failed to load  </p> :
                getMessages?.pages?.slice().reverse()?.map((page) => 
                    page?.data.messages?.map((message: any) => {
                        const isSender = message.senderId === user.id
                        const senderInfo = message.sender
                        const time = new Date(message.createAt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute:'2-digit' })
                        
                        return (
                            <div
                            key={message.id}
                            className={`flex ${isSender? "justify-end" : "justify-start"}`}
                            >
                                <div className={`flex ${isSender ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                                    <Avatar className="h-8 w-8 mx-2">
                                        <AvatarImage src={senderInfo.profile} alt={senderInfo.username} />
                                        <AvatarFallback>{senderInfo.username[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={`min-w-[40%] max-w-[70%] p-3 rounded-lg ${
                                        isSender 
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-800"
                                    }`}>
                                        <p className="text-sm">{message.message}</p>
                                        <p className="text-xs mt-1 opacity-70">{time}</p>
                                    </div>
                                </div>
                            </div>   
                        )
                    }
                ))
            }
        </div>
    )
}

export default MessagesDisplay