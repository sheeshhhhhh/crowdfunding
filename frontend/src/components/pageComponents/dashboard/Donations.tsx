import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useDebounce from "@/hooks/useDebounce"
import axiosFetch from "@/lib/axios"
import { DonationInDashboard, DonationStatistics } from "@/types/donations"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { memo, useEffect, useState } from "react"

export const DonationStastistics = memo(() => {
    
    const { data } = useQuery({
        queryKey: ['donationStatistics'],
        queryFn: async () => {
            const response = await axiosFetch.get('/donation/Statistics')
            return response.data as DonationStatistics
        },
        refetchOnWindowFocus: false
    })


    return (
        <Card className="mb-8">
            <CardHeader>
            <CardTitle className="text-2xl">Donation Statistics</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Total Donations</h3>
                <p className="text-4xl font-bold">${data?.totalDonations}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Average Donation</h3>
                <p className="text-4xl font-bold">${data?.averageDonation}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Total Donors</h3>
                <p className="text-4xl font-bold">{data?.totalDonors}</p>
                </div>
            </div>
            </CardContent>
        </Card>
    )
})


type DonationsProps = {
    donations: DonationInDashboard[] | undefined,
    hasNext: boolean | undefined,
    page: number,
    search: string
}

const Donations = ({
    donations,
    page,
    search,
    hasNext
}: DonationsProps) => {
    const [searchTerm, setSearchTerm] = useState(search || '')
    const navigate = useNavigate({ from: '/dashboard/Donations' })
    const searchDebounce = useDebounce(searchTerm, 350)

    useEffect(() => {
        navigate({
            search: (prev) => {
                return {
                    ...prev,
                    search: searchDebounce,
                }
            },
            reloadDocument: false
        })
    }, [searchDebounce])
    
    return (
        <div className="w-full">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search Donors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-6 text-lg"
                />
                </div>
                {/* maybe add select on specific campaign? */}
            </div>

            <div className="rounded-lg border shadow-sm min-h-[700px]">
                <Table>

                    <TableHeader>
                        <TableRow>
                        <TableHead className="text-lg">Donor</TableHead>
                        <TableHead className="text-lg cursor-pointer">
                            Amount 
                        </TableHead>
                        <TableHead className="text-lg">Campaign</TableHead>
                        <TableHead className="text-lg cursor-pointer">
                            Date 
                        </TableHead>
                        <TableHead className="text-lg">Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {donations?.map((donation) => (
                        <TableRow key={donation.id}>
                            <TableCell className="text-base">
                            <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={donation.user?.profile || ''} />
                                <AvatarFallback>{donation.user?.username[0] || 'A'}</AvatarFallback>
                                </Avatar>
                                {donation.user?.username || 'Anonymous'}
                            </div>
                            </TableCell>
                            <TableCell className="text-base">${donation.amount}</TableCell>
                            <TableCell className="text-base">{donation.post?.title}</TableCell>
                            <TableCell className="text-base">{format(new Date(donation.createdAt), 'yyyy-MM-dd')}</TableCell>
                            <TableCell className="text-base">
                            {/* <span className={`px-3 py-1 rounded-full text-sm ${
                                donation.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {donation.status}
                            </span> */}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-base text-muted-foreground">
                    Page {page}
                </p>
                <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate({ search: (prev) => ({...prev, page: page - 1 }) })}
                    disabled={page === 1}
                >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate({ search: (prev) => ({...prev, page: page + 1 }) })}
                    disabled={!hasNext}
                >
                    Next
                    <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
                </div>
            </div>
        </div>
    )
}

export default Donations