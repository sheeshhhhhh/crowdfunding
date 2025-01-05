import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const MessageListSkeleton = () => {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="relative mb-4">
                    <Skeleton className="h-10 w-[374px]" />
                </div>
                <div className="space-y-5 h-[calc(100vh-16rem)] overflow-y-scroll custom-scrollbar">
                    {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                        <div key={index} className="p-3 mb-3 rounded-lg cursor-pointer flex items-center">
                            <Skeleton className="h-10 w-10 mr-3 rounded-full" />
                            <div className="flex-grow">
                                <Skeleton className="h-6 w-32 mb-1" />
                                <Skeleton className="h-3 w-60" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default MessageListSkeleton