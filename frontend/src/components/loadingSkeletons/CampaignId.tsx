import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import { Skeleton } from "../ui/skeleton"

const CampaignIdSkeleton = () => {

    return (
        <div className="container mx-auto py-10">
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="h-10 w-full max-w-[1016px]" />
                    <Skeleton className="h-10 w-full max-w-[250px] mb-7 mt-[2px]" />

                    <Skeleton className="h-[400px] w-full max-w-[1016px] rounded-lg mb-6" />

                    <Skeleton className="h-[168px] w-full max-w-[1016px]" />
                    <button className="text-primary-600 mt-4 underline-offset-4 underline">
                        Read More
                    </button>

                    <div aria-label="recent-update" className="mt-7">
                        <Separator className="h-[2px]" />
                        <div className='mb-[48px]'></div>
                        <div className='flex justify-between'>
                            <h2 className='text-2xl font-bold mb-8'>
                                Recent Update
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <header className="flex gap-2">
                                <h1 className="font-bold text-lg">
                                    <Skeleton className="h-7 w-[106px]" />
                                </h1>
                                <p className="text-muted-foreground">
                                    <Skeleton className="h-7 w-[137px]" />
                                </p>
                            </header>
                            <div>
                                <span>
                                    <Skeleton className="h-[68px] w-full max-w-[1016px]" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 max-w-[200px]" />
                            <Skeleton className="h-5 max-w-[170px] mt-[6px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="mb-2 h-4 w-full max-w-[446px] rounded-full" />
                            <div className="flex justify-between text-sm font-medium mb-4">
                                <Skeleton className="h-5 w-[100px]" />
                                <Skeleton className="h-5 w-[32px]" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-[50px]" />
                                    <Skeleton className="h-5 w-[90px]" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-[70px]" />
                                    <Skeleton className="h-5 w-[30px]" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-[82px]" />
                                    <Skeleton className="h-5 w-[100px]" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Skeleton className="h-10 w-[446px]" />
                            <Skeleton className="h-10 w-[446px]" />
                        </CardFooter>
                    </Card>
                    <Card className="mt-6">
                        <CardHeader>
                            <Skeleton className="h-7 max-w-[200px]" />
                        </CardHeader>
                        <CardContent>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-[150px]" />
                                <Skeleton className="h-5 w-[200px]" />
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    <div className="mt-6 flex justify-between">
                        <Skeleton className="h-[22px] w-[103px] rounded-full" />
                        <Skeleton className="h-[22px] w-[85px] rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaignIdSkeleton