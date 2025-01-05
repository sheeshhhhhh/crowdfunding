import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export const DonationStastisticsSkeleton = () => (
    <Card className="mb-8">
        <CardHeader>
            <CardTitle className="text-2xl">Donation Statistics</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Total Donations</h3>
                    <Skeleton className="mt-1 h-9 w-[50px]" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Average Donation</h3>
                    <Skeleton className="mt-1 h-9 w-[190px]" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Total Donors</h3>
                    <Skeleton className="mt-1 h-9 w-[190px]" />
                </div>
            </div>
        </CardContent>
    </Card>
)

export const DonationsSkeleton = () => (
    <div className="w-full">
        <div className="flex justify-between items-center mb-6">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                <Skeleton className="pl-10 py-6 h-[50px] w-[384px]" />
            </div> 
        </div>

        <div className="rounded-lg border shadow-sm min-h-[700px]">
            <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-lg">Donor</TableHead>
                            <TableHead className="text-lg cursor-pointer">Amount</TableHead>
                            <TableHead className="text-lg">Campaign</TableHead>
                            <TableHead className="text-lg cursor-pointer">Date</TableHead>
                            <TableHead className="text-lg">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 10 }).map(() => (
                            <TableRow>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Skeleton className="h-10 w-10 mr-3 rounded-full" />
                                        <Skeleton className="h-[20px] w-[114.22px]" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[50px] h-5" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[200px] h-5" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[80px] h-5" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
        </div>

        <div className="flex items-center justify-between mt-6">
            <Skeleton className="h-6 w-[50px]" />
            <div className="flex items-center space-x-4">
                <Skeleton className="h-11 w-[156.44px]" />
                <Skeleton className="h-11 w-[129.33px]" />
            </div>
        </div>
    </div>
)