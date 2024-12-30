import LoadingSpinner from "@/components/common/LoadingSpinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axiosFetch from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import SendMessage from "./SendMessage"
import { useAuthContext } from "@/context/AuthContext"
import { conversation, message, pastConversations } from "@/types/message"
import { useEffect, useRef, useState } from "react"
import { useSocket } from "@/context/SocketContext"

const fetchMessages = async (userId: string) => {
    
}

const MessageView = () => {
    const [page, setPage] = useState(1)

    const { user } = useAuthContext()
    const { socket } = useSocket()
    const { userId, conversationId, search } = useSearch({ from: '/messages/'})
    const scrollRef = useRef<HTMLDivElement>(null)
    
    const queryClient = useQueryClient()
    
    const { data: getMessages, isLoading } = useQuery({
        queryKey: ['getMessages', userId],
        queryFn: async () => {
            const response = await axiosFetch.get('/message/getMessages/' + userId)

            return response.data as conversation  
        },
        refetchOnWindowFocus: false
    })

    // used for listening in messages using socket
    useEffect(() => {
        if(!userId) {
            return
        }
        
        socket?.on('message',  (data: message) => {
            queryClient.setQueryData(['getMessages', userId], (oldData: conversation | undefined) => {
                if(!oldData) {
                    return
                }

                return {
                    ...oldData,
                    messages: oldData.messages ? [...oldData.messages, data] : [data]
                }
            })
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
    }, [userId])

    useEffect(() => {
        if (getMessages && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [getMessages]); 

    if(!userId) {
        return
    }

    if(isLoading) {
        return <div>
            <LoadingSpinner />
        </div>
    }

    const profile = getMessages?.participants[0]

    return (
        <Card className="max-h-[751px] flex flex-col">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4 border-b">
                <Avatar>
                    <AvatarImage src={profile?.profile || ''} alt="JohnDoe" />
                    <AvatarFallback>{profile?.username[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{profile?.username}</CardTitle>
            </CardHeader>
            <CardContent>     
                    <div ref={scrollRef} className="h-[580px] overflow-y-scroll space-y-4  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pt-3"> 
                        {getMessages?.messages?.map((message: any) => {
                            const isSender = message.senderId === user.id
                            const senderInfo = message.sender
                            const time = new Date(message.createAt).toLocaleTimeString(navigator.language, {
                                hour: '2-digit',
                                minute:'2-digit'
                            })
                            
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
                                        <div className={`min-w-[40%] max-w-[90%] p-3 rounded-lg ${
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
                        })}
                    </div>
            </CardContent>
            <CardFooter>
                <SendMessage />
            </CardFooter>
        </Card>
    )
}

export default MessageView