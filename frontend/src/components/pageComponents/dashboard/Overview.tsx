import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DonationOverview } from "@/types/donations"
import { CreditCard, Layers, User } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import LoadingSpinner from "@/components/common/LoadingSpinner"

const donationData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
]

const chartConfig = {
    month: {
        label: 'Month'
    },
    amount: {
        label: 'Amount',
    }
} satisfies ChartConfig

type OverviewProps = {
    data: DonationOverview | undefined,
    isLoading: boolean
} 

const Overview = ({
    data,
    isLoading
}: OverviewProps) => {

    if (isLoading) {
        return <LoadingSpinner />
    }

    if(!data) {
        return <div>Failed to fetch data</div>
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Raised
                    </CardTitle>
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
                    <div className="text-2xl font-bold">${data?.totalDonations}</div>
                    <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Active Campaigns
                    </CardTitle>
                    <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data?.activeCampaignscount}</div>
                    <p className="text-xs text-muted-foreground">
                    +2 new this month
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data?.totalDonors}</div>
                    <p className="text-xs text-muted-foreground">
                    +19% from last month
                    </p>
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
                    <div className="text-2xl font-bold">${data.averageDonation}</div>
                    <p className="text-xs text-muted-foreground">
                    +5.2% from last month
                    </p>
                </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Donation Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart accessibilityLayer data={data?.monthlyDonationsStats}>
                                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                                <Bar dataKey="amount" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
                </Card>
                <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>
                        Recent Donations
                    </CardTitle>
                    <CardDescription>
                        You have received 12 donations this month.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {data.recentDonations.map((donation, index) => (
                            <div key={index} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={donation.user?.profile} alt="Avatar" />
                                <AvatarFallback>{donation.user?.username[0] || 'A'}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{donation.user?.username || 'Anonymous'}</p>
                                <p className="text-sm text-muted-foreground">
                                {donation.user?.email || 'No Email'}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">${donation.amount}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Overview