import { Send } from "lucide-react"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

export const MessageViewSkeleton = () => {
    return (
        <>
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-56 ml-4 mt-[6px]" />
        </>
    )
}


export const SendMessageSkeleton = () => {
    return (
        <div className="flex w-full items-center space-x-2">
            <Skeleton className="flex-grow h-10 rounded-lg" />
            <Button disabled={true} size="icon">
                <Send className="h-4 w-4" />
            </Button>
        </div>
    )
}

export const MessageDisplaySkeleton = () => {
    return (
        <div className="h-[580px] overflow-y-scroll space-y-4 custom-scrollbar py-3">
            {
                [true, false, true, false, true, true, false].reverse().map((isSender) => (
                    <div className={`flex ${isSender? "justify-end" : "justify-start"}`}>
                        <div className={`flex ${isSender ? "flex-row-reverse" : "flex-row"} items-end`} >
                            <Skeleton className="h-8 w-8 mx-2 rounded-full" />
                            <Skeleton className="w-[300px] h-16 p-3 rounded-lg" />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

