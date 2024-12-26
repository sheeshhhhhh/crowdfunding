import LoadingSpinner from "@/components/common/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import axiosFetch from "@/lib/axios"
import { Update } from "@/types/update"
import { useQuery } from "@tanstack/react-query"
import { userProfile } from "@/types/user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuthContext } from "@/context/AuthContext"
import UpdateOptions from "./UpdateOptions"

type ViewAllUpdatesProps = {
    campaignId: string,
    user: userProfile | undefined
}

const ViewAllUpdates = ({
    campaignId,
    user
}: ViewAllUpdatesProps) => {

    const { user: currentUser } = useAuthContext()
    const { data: Updates } = useQuery({
        queryKey: ['viewAllupdates'],
        queryFn: async () => {
            const response = await axiosFetch.get(`/update/getUpdates?campaignId=${campaignId}`)
   
            if(response.data.length === 0) {
                return undefined
            }
            
            return response.data as Update[]
        },
        refetchOnWindowFocus: false
    })

    const isOwner = user?.id === currentUser?.id

    return (
        <Dialog>
            <DialogTrigger>
                <button className='text-muted-foreground underline underline-offset-2 mt-3'>
                    see All Update
                </button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[570px]">
                <DialogHeader>
                    <DialogTitle>
                        Updates ({Updates?.length || 0})
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[800px] ">
                    <div>
                        {Updates ? Updates?.map((update) => (
                            <Card className="mb-4 max-w-[500px]">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex gap-4 items-center">
                                        <Avatar>
                                            <AvatarImage src={user?.profile} />
                                            <AvatarFallback>{user?.username[0] || 'A'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{user?.username || 'Anonymous'}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                on {format(new Date(update.createdAt), 'yyyy-MM-dd')}
                                            </p>
                                        </div>
                                    </div>
                                    {isOwner &&
                                        <UpdateOptions update={update} />
                                    }
                                </CardHeader>
                                <CardContent className="">
                                    <p className="text-base break-words">{update.message}</p>
                                </CardContent>
                        </Card>
                        )) : 
                        <div className="flex justify-center items-center pt-8">
                            <h1 className="text-lg font-semibold text-muted-foreground">
                                No updates yet
                            </h1>
                        </div>
                        }
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default ViewAllUpdates