import LoadingSpinner from "@/components/common/LoadingSpinner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import axiosFetch from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import toast from "react-hot-toast"


type CampaignsProps = {
    campaignData: any[]
}

const Campaigns = ({
    campaignData
}: CampaignsProps) => {
 
    
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaignData.map((campaign, index) => (
                <Card key={index}>
                    <CardHeader>
                    <CardTitle>{campaign.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                        <CardDescription>
                            Campaign Progress <Badge className="ml-5">{campaign.status}</Badge>
                        </CardDescription>
                            <Progress value={(campaign.raised / campaign.goal) * 100} />
                            <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{"$" + campaign.current + " raised"}</span>
                            <span>{"$" + campaign.goal + " goal"}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end space-x-3">
                        <Link to={'/campaigns/update/' + campaign.id}>
                            <Button>
                                Edit
                            </Button>
                        </Link>
                        <DeleteCampaign campaignId={campaign.id} campaignName={campaign.title} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}



type DeleteCampaignProps = {
    campaignId: string,
    campaignName: string
}

const DeleteCampaign = ({
    campaignId, campaignName
}: DeleteCampaignProps) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation({
        mutationKey: ['deleteCampaign', campaignId],
        mutationFn: async () => {
            const response = await axiosFetch.delete(`/campaign/${campaignId}`)

            if (response.status >= 400) {
                return toast.error(response.data.message)
            }

            toast.success('Campaign deleted successfully')
            setOpen(false)
            queryClient.invalidateQueries({ predicate: query => query.queryKey[0] === 'mycampaigns' })

            return response.data
        }
    })    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'destructive'}>
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete "{campaignName}" Campaign</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this campaign? <br/>
                        <span className="text-red-500">WARNING: all of the information will be lost</span> <br/>
                    </DialogDescription>
                    <p className="font-medium">Please Type "{campaignName}" to the input to confirm</p>
                </DialogHeader>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
                <DialogFooter>
                    <Button className="w-full" variant={'destructive'} disabled={isLoading || (inputValue !== campaignName)} onClick={() => mutate()}>
                        {isLoading ? <LoadingSpinner /> : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Campaigns