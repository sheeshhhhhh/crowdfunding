import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuthContext } from "@/context/AuthContext"
import { campaignProfile } from "@/types/campaign"
import { Link } from "@tanstack/react-router"
import { differenceInCalendarDays } from "date-fns"

type CampaignListProps = {
    id: string,
    campaigns: campaignProfile[]
}

const CampaignList = ({
    id,
    campaigns
}: CampaignListProps) => {
    const { user } = useAuthContext()

    const isOwner = user?.id === id
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Campaigns</h2>
            {campaigns.length !== 0 ? 
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {campaigns.map((campaign) => {
                        const progressPercentage = (campaign.current / campaign.goal) * 100
                        const daysLeft = campaign.endDate && differenceInCalendarDays(new Date(campaign?.endDate), new Date())

                        return (
                            <Link reloadDocument to='/campaigns/$campaignId' params={{ campaignId: campaign.id }}>
                                <Card key={campaign.id} className="relative w-full shadow-lg">
                                <img
                                src={campaign.headerImage}
                                alt={campaign.title}
                                className="rounded-t-lg"
                                />
                                <CardHeader>

                                    <CardTitle className="text-xl">{campaign.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                {/* <p className="text-sm text-gray-600 mb-4">{campaign.description}</p> */}
                                <div className="space-y-4">
                                    <Progress value={progressPercentage} className="h-2" />
                                    <div className="flex justify-between text-sm font-medium">
                                    <span>${campaign.current.toLocaleString()} raised</span>
                                    <span>${campaign.goal.toLocaleString()} goal</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">{daysLeft} days left</span>
                                    <Button size="sm">Donate Now</Button>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                            </Link>
                        )
                    })}
                </div>

            :
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-xl font-semibold text-gray-600 mb-4">No Campaigns Found</p>
                        
                        {isOwner && 
                        <>
                            <p className="text-gray-500 text-center mb-6">
                            You haven't created any campaigns yet. Start your first campaign to make a difference!
                            </p>
                            <Link to="/campaigns/create">
                                <Button>
                                    Create Campaign
                                </Button>
                            </Link>
                        </>
                        }
                        {!isOwner && 
                        <p className="text-gray-500 text-center mb-6">
                            This user does not have any campaigns yet.
                        </p>
                        }
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default CampaignList