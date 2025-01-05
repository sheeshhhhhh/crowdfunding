import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const ProfileSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <Card className="mb-8">
                <CardContent className="px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <Skeleton className="w-32 h-32 rounded-full" />
                        <div className="flex-grow text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <Skeleton className="h-9 w-[240px]" />
                                <Skeleton className="h-10 w-[106.34px]" />
                            </div>
                            <div className="mb-2 flex items-center justify-center sm:justify-start">
                                <MapPin className="h-4 w-4 mr-1" />
                                <Skeleton className="h-5 w-[180px]" />
                            </div>
                            <Skeleton className="mb-4 h-6 w-[350px]" />
                            <Skeleton className="mb-4 h-5 w-full max-w-[650px]" />
                            <div className="flex flex-wrap justify-center sm:justify-start gap-6">
                                <div>
                                    <Skeleton className="h-7 w-[100px]" />
                                </div>
                                <div>
                                    <Skeleton className="h-7 w-[100px]" />
                                </div>
                                <div>
                                    <Skeleton className="h-7 w-[100px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div>
                <Skeleton className="h-8 w-[180px] mb-6" />
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, index) => (
                        <Card key={index} className="relative w-full shadow-lg">
                            <Skeleton className="h-[226.86px] w-[403.33px] rounded-t-lg" />
                            <CardHeader>
                                <Skeleton className="h-7 w-full max-w-[355.33px]" />
                                <Skeleton className="h-7 w-full max-w-[250px]" />
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="space-y-4">
                                    <Skeleton className="h-2 w-full max-w-[355.33px] rounded-full" />
                                    <div className="flex justify-between text-sm font-medium">
                                        <Skeleton className="h-5 w-[100px]" />
                                        <Skeleton className="h-5 w-[100px]" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-5 w-[100px]" />
                                        <Skeleton className="h-7 w-[100px]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileSkeleton