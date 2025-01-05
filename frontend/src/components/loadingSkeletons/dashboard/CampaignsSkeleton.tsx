import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "@tanstack/react-router"

const CampaignsSkeleton = () => {
    return (
        <div className="space-y-4">
            <header className='flex items-center justify-end'>
                <Link to='/campaigns/create' >
                    <Button>Create Campaign</Button>
                </Link>
            </header>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map(() => (
                    <Card>
                        <CardHeader className="h-[95.97px]">
                            <Skeleton />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <CardDescription>
                                    Campaign Progress <Badge className="ml-5 h-[22px] w-[66.34px]"></Badge>
                                </CardDescription>  
                                <Skeleton className="h-4 rounded-full max-w-[511.23px] w-full" />
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <Skeleton className="h-5 w-[100px]" />
                                    <Skeleton className="h-5 w-[100px]" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end space-x-3">
                            <Skeleton className="h-10 w-[58px]" />
                            <Skeleton className="h-10 w-[75px]" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CampaignsSkeleton