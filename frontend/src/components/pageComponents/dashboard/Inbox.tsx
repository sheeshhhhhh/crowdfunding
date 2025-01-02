import LoadingSpinner from "@/components/common/LoadingSpinner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axiosFetch from "@/lib/axios"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useRef } from "react"
import toast from "react-hot-toast"
import NotificationCard from "./notification/NotificationCard"

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
            refetchOnWindowFocus: false
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
                                page.data?.map((notification: any) => (
                                    <NotificationCard key={notification.id} notification={notification} />
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

export default Inbox