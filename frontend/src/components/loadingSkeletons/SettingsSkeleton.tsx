import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export const SettingsSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className='text-3xl font-bold mb-6'>Account Settings</h1>
            <div className="space-y-6">
                <UserProfileSkeleton />
                <ChangePasswordSkeleton />
                <BillingInformationSkeleton />
            </div>
        </div>
    )
}

export const UserProfileSkeleton = () => (
    <Card>
        <CardHeader>
            <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="w-24 h-[17px]" />
                    <div className="flex gap-5 items-center space-x-4 ml-8">
                        <Skeleton className="w-24 h-24 rounded-full" />
                        <Skeleton className="w-full max-w-[400px] h-[157.25px]" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Skeleton className="h-[17px] w-[35.89px]" />
                            <Skeleton className="h-10 w-[399px]" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-[17px] w-[68.77px]" />
                            <Skeleton className="h-10 w-[399px]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-[17px] w-[57.72px]" />
                        <Skeleton className="h-10 w-full max-w-[814px]" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-[17px] w-[21.19px]" />
                        <Skeleton className="h-20 w-full max-w-[814px]" />
                    </div>
                    <Skeleton className="h-10 w-[127.42px]" />
                </div>
            </div>
        </CardContent>
    </Card>
)

export const ChangePasswordSkeleton = () => (
    <Card>
        <CardHeader>
            <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-[120.16px]" />
                    <Skeleton className="h-10 w-full max-w-[814px]" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-[99.52px]" />
                    <Skeleton className="h-10 w-full max-w-[814px]" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-[157.3px]" />
                    <Skeleton className="h-10 w-full max-w-[814px]" />
                </div>
                <Skeleton className="h-10 w-[153.28px]" />
            </div>
        </CardContent>
    </Card>
)

export const BillingInformationSkeleton = () => (
    <Card>
        <CardHeader>
            <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-[17px] w-[72.44px]" />
                        <Skeleton className="h-10 w-[399px]" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-[17px] w-[71.11px]" />
                        <Skeleton className="h-10 w-[399px]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-[35.89px]" />
                    <Skeleton className="h-10 w-full max-w-[814px]" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-[55.58px]" />
                    <Skeleton className="h-10 w-full max-w-[814px]" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-[17px] w-[26.91px]" />
                        <Skeleton className="h-10 w-[399px]" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-[17px] w-[80.55px]" />
                        <Skeleton className="h-10 w-[399px]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-[54.03px]" />
                    <Skeleton className="h-10 w-full max-w-[814px]" />
                </div>
                <Skeleton className="h-10 w-[200.13px]" />
            </div>
        </CardContent>
    </Card>
)