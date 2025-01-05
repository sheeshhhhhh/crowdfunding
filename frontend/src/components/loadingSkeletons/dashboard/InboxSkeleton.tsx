import { Skeleton } from "@/components/ui/skeleton"
import { MoreHorizontal } from "lucide-react"

const InboxSkeleton = () => (
    <div className="h-[715px] pr-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-8">
            {Array.from({ length: 10 }).map(() => (
                <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                        <div className="bg-transparent" />
                    </div>
                    <div className="ml-4 space-y-1">
                        <Skeleton className="h-[16px] w-[80px]" />
                        <Skeleton className="h-[14px] w-[460px]" />
                    </div>
                    <div className="ml-auto ">
                        <Skeleton className="h-[20px] w-[80px]" />
                    </div>
                    <div className="py-2 px-4 ml-2">
                        <MoreHorizontal className="text-muted" />
                    </div>
                </div>
            ))}
        </div>
    </div>
)


export default InboxSkeleton