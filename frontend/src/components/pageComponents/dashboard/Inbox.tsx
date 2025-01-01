import LoadingSpinner from "@/components/common/LoadingSpinner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axiosFetch from "@/lib/axios"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { MoreHorizontal, MailOpen, Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

const fetchNotifications = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const response = await axiosFetch.get(`/inbox/notifications?page=${pageParam}&filter=unread`);
    return { data: response.data, nextPage: response.data.length > 0 ? pageParam + 1 : null };
};

const Inbox = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery(
        ["notifications"],
        fetchNotifications,
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
            onError: () => toast.error("Failed to fetch data"),
        }
    );

    const handleScroll = () => {
        if (!scrollRef.current || !hasNextPage || isFetchingNextPage) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

        if (scrollTop + clientHeight >= scrollHeight) {
            fetchNextPage();
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inbox</CardTitle>
                <CardDescription>Manage your messages and notifications</CardDescription>
            </CardHeader>
            <CardContent>
                <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="h-[715px] pr-4 overflow-y-auto custom-scrollbar"
                >
                    {isLoading ? (
                        <LoadingSpinner className="mt-4" />
                    ) : isError ? (
                        <p className="text-center text-muted-foreground mt-4">Failed to load notifications</p>
                    ) : (
                        <div className="space-y-8">
                            {data?.pages.map((page) =>
                                page.data.map((message: any) => (
                                    <div key={message.id} className="flex items-center">
                                        <div className="flex-shrink-0 mr-3">
                                            {!message.isRead && (
                                                <div className="w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true" />
                                            )}
                                        </div>
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback>A</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium">{message.title}</p>
                                            <p className="text-sm text-muted-foreground">{message.message}</p>
                                        </div>
                                        <div className="ml-auto text-sm text-muted-foreground">
                                            {format(new Date(message.createdAt), "yyyy-MM-dd")}
                                        </div>
                                        <NotificationOptions id={message.id} />
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    {!hasNextPage && !isLoading && (
                        <p className="text-center text-muted-foreground mt-4">No more notifications</p>
                    )}
                    {isFetchingNextPage && <LoadingSpinner className="mt-4" />}
                </div>
            </CardContent>
        </Card>
    );
};
// mark as read
// delete notification
type NotificationOptionsProps = {
    id: string
}

const NotificationOptions = ({
    id
}: NotificationOptionsProps) => {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: DeleteNotification, isLoading: isLoadingDelete } = useMutation({
        mutationKey: ['deleteNotification'],
        mutationFn: async () => {
            const response = await axiosFetch.delete(`/inbox/${id}`)

            if(response.status >= 400) {
                throw new Error(response.data.message)
            }

            setIsOpen(false)
            return response.data
        },
        onError: (error: any) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications']})
        }
    })

    const { mutate: MarkAsRead, isLoading: isLoadingMarkAsRead } = useMutation({
        mutationKey: ['markAsRead'],
        mutationFn: async () => {
            const response = await axiosFetch.patch(`/inbox/mark-as-read/${id}`)

            if(response.status >= 400) {
                throw new Error(response.data.message)
            }

            setIsOpen(false)
            return response.data
        },
        onError: (error: any) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications']})
        }
    })

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <Button className="ml-2" variant={'ghost'}>
                    <MoreHorizontal />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col space-y-2">
                <Button disabled={isLoadingMarkAsRead} onClick={() => MarkAsRead()}>
                    {isLoadingMarkAsRead ? <LoadingSpinner /> : <div className="flex items-center gap-2"><MailOpen /> Mark as read</div>}
                </Button>
                <Button disabled={isLoadingDelete} variant="destructive" onClick={() => DeleteNotification()}>
                    {isLoadingDelete ? <LoadingSpinner /> : <div className="flex items-center gap-2"><Trash2 /> Delete</div>}
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default Inbox