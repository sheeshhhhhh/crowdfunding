import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuthContext } from "@/context/AuthContext"
import useDebounce from "@/hooks/useDebounce"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { fetchPastConversations } from "./hooks/message.hook"

const MessageList = () => {
    const { conversationId, search } = useSearch({ from: '/messages/'})
    const { user } = useAuthContext()

    const scrollRef = useRef<HTMLDivElement>(null)
    
    const { 
        data: pastConversations,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['pastConversations', search],
        queryFn: async ({ pageParam = 1}) => fetchPastConversations(search, pageParam),
        onError: () => toast.error("Failed to fetch data"),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        refetchOnWindowFocus: false
    })
    
    const handleScroll = () => {
        if(!scrollRef.current || !hasNextPage || isFetchingNextPage) return

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current

        if(scrollTop + clientHeight >= scrollHeight) {
            fetchNextPage()
        }
    }

    return (
        <Card>
            <CardContent className="p-4">
                <MessageSearch initialSearch={search} />
                    <div onScroll={handleScroll} ref={scrollRef} className="space-y-5 h-[calc(100vh-16rem)] overflow-y-scroll custom-scrollbar">
                        {pastConversations?.pages.map((page, index) => (
                            page.data.map((conversation) => {
                                const person = conversation.participants[0]
                                const isMessageYours = conversation?.messages[0]?.senderId === user.id
                                const isMessageRead = conversation?.messages[0]?.status === 'READ' || !isMessageYours

                                return (
                                    <Link to="/messages" search={{ userId: person.id, conversationId: conversation.id, search: search }}>
                                        <div
                                        key={conversation.id}
                                        className={`p-3 mb-3 rounded-lg cursor-pointer hover:bg-gray-100 flex items-center ${
                                        conversation.id === conversationId ? "bg-blue-50" : ""
                                        }`}
                                        >
                                            <Avatar className="h-10 w-10 mr-3">
                                                <AvatarImage src={person.profile || ''} alt={person.username} />
                                                <AvatarFallback>{person.username[0] || 'A'}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-semibold">{person.username}</h3>
                                                    {isMessageRead && (
                                                        <span className="bg-blue-500 rounded-full w-2 h-2"></span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {isMessageYours && 'You: '}
                                                    {conversation.messages[0]?.message}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        ))}
                    </div>
            </CardContent>
        </Card>
    )
}

type MessageSearchProps = {
    initialSearch: string | undefined
}

const MessageSearch = ({
    initialSearch=""
}: MessageSearchProps) => {
    const [search, setSearch] = useState(initialSearch)
    const navigate = useNavigate({ from: '/messages' })
    const debounceSearch = useDebounce(search, 500)

    useEffect(() => {
        navigate({search: (prev) => ({...prev, search: debounceSearch})})
    }, [debounceSearch])

    return (
        <div className="relative mb-4">
            <Search className="absolute left-3 top-[8px] transform -trasnlate-y-1/2 text-gray-400" />
            <Input onChange={(e) => setSearch(e.target.value)} value={search} className="pl-10" placeholder="Search Messages" />
        </div>
    )
}

export default MessageList