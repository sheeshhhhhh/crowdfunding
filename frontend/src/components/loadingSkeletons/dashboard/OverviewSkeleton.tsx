import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard, Layers, User } from "lucide-react"

const OverviewSkeleton = () => {

    return (
        <div className="w-full">
            <h1 className="text-4xl font-bold mb-8">Overview</h1>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-7 w-[100px] mb-1" />
                            <Skeleton className="h-4 w-[150px]" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                            <Layers className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-7 w-8 mb-1" />
                            <Skeleton className="h-4 w-[180px]" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Donation</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-7 w-[100px] mb-1" />
                            <Skeleton className="h-4 w-[180px]" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Avg. Donation
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-7 w-[100px] mb-1" />
                            <Skeleton className="h-4 w-[180px]" />
                        </CardContent>
                    </Card>

                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>
                                Donation Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2 px-4 flex flex-row">
                            <div className="w-full max-w-[45px] flex flex-col justify-between">
                                <Skeleton className="h-[15px] w-11" />
                                <Skeleton className="h-[15px] w-10" />
                                <Skeleton className="h-[15px] w-8" />
                                <Skeleton className="h-[15px] w-5" />
                                <Skeleton className="h-[15px] w-2" />
                            </div>
                            <div className="flex gap-5 flex-1 justify-around items-end">
                                <Skeleton className="h-[410px] w-full max-w-[90.80px]" />
                                <Skeleton className="h-[40px] max-w-[90.80px] w-full" />
                                <Skeleton className="h-[80px] max-w-[90.80px] w-full" />
                                <Skeleton className="h-[140px] max-w-[90.80px] w-full" />
                                <Skeleton className="h-[280px] max-w-[90.80px] w-full" />
                                <Skeleton className="h-[450px] max-w-[90.80px] w-full" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 h-[626px]">
                        <CardHeader>
                            <CardTitle>
                                Recent Donations
                            </CardTitle>
                            <CardDescription>
                                This is your recent donations that you have not seen yet.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 pb-3">
                            <div className="space-y-8">
                                {Array(7).fill(null).map(() => (
                                    <div className="flex items-center">
                                        <div>
                                            <Skeleton className="h-9 w-9 rounded-full" />
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <Skeleton className="h-[14px] w-[100px]" />
                                            <Skeleton  className="h-5 w-[195px]"/>
                                        </div>
                                        <div className="w-full">
                                            <Skeleton className="ml-auto w-[62px] h-6" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default OverviewSkeleton