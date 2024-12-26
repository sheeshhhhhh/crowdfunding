import LoadingSpinner from '@/components/common/LoadingSpinner'
import CreateUpdate from '@/components/pageComponents/updates/CreateUpdate'
import UpdateCard from '@/components/pageComponents/updates/UpdateCard'
import ViewAllUpdates from '@/components/pageComponents/updates/ViewAllUpdates'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useAuthContext } from '@/context/AuthContext'
import axiosFetch from '@/lib/axios'
import { CampaignPostWithUpdates } from '@/types/campaign'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { differenceInCalendarDays, format } from 'date-fns'
import { CalendarDays, Users } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/campaigns/$campaignId')({
  component: RouteComponent,
})

function RouteComponent() {
  const [readMore, setReadMore] = useState(false)
  const { user } = useAuthContext()
  const { campaignId } = Route.useParams()
  
  const { data: campaign, isLoading } = useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: async () => {
      const response = await axiosFetch.get('/campaign/' + campaignId)
      return response.data as CampaignPostWithUpdates
    },
    refetchOnWindowFocus: false
  })

  // maybe create a s skeleton loader for the campaign details
  if(isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  // redirect to 404 page if campaign is not found
  if (!campaign) {
    return (
      <LoadingSpinner />
    )
  }

  const content = readMore ? campaign.body : campaign.body.substring(0, 700) + '...'
  const daysLeft = campaign.endDate && differenceInCalendarDays(new Date(campaign?.endDate), new Date())
  const progress = (campaign.current / campaign.goal) * 100

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-7">{campaign.title}</h1>
          <img src={campaign.headerImage} alt={campaign.title} className="w-full h-[400px] object-cover rounded-lg mb-6" />
          <div className={`tiptap ProseMirror relative ${!readMore ? 'after:absolute after:bottom-0  after:block after:w-full after:h-5 after:bg-gradient-to-b after:from-transparent after:to-white' : ''}`} 
          dangerouslySetInnerHTML={{ __html: content }} />
          <button onClick={() => setReadMore(!readMore)} className="text-primary-600 mt-4 underline-offset-4 underline">
            {readMore ? 'Read Less' : 'Read More'}
          </button>

          <div aria-label='recent-update' className='mt-7'>
            <Separator className="h-[2px]" />
            <div className='mb-[48px]'></div>
            <div className='flex justify-between'>
              <h2 className='text-2xl font-bold mb-8'>
                Recent Update
              </h2>
              {
                user?.id === campaign.userId &&
                <CreateUpdate campaignId={campaignId} />
              }
            </div>
            <div>
              <UpdateCard user={campaign.user} update={campaign.updates[0] || undefined} />
              {/* <button className='text-muted-foreground underline underline-offset-2 mt-3'>
                see All Update
              </button> */}
              <ViewAllUpdates user={campaign.user} campaignId={campaignId} />
            </div>
          </div>

          {/* <div className="prose max-w-none">
             <ReactMarkdown>{campaign.content}</ReactMarkdown>
          </div> */}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
              <CardDescription>Help us reach our goal!</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-2" />
              <div className="flex justify-between text-sm font-medium mb-4">
                <span>${campaign.current.toLocaleString()} raised</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Goal:</span>
                  <span className="font-medium">${campaign.goal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Backers:</span>
                  <span className="font-medium">{campaign.totalDonors}</span>
                </div>
                {
                  campaign.endDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span className="font-medium">{format(new Date(campaign.endDate), 'yyyy-MM-dd')}</span>
                    </div>
                  )
                }
              </div>
            </CardContent>
            <CardFooter>
              <Link className='w-full' to='/donation/donate/$donationId' params={{ donationId: campaignId}}>
                <Button className="w-full">Donate Now</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Campaign Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={campaign.user.profile} />
                  <AvatarFallback>{campaign.user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{campaign.user.username}</p>
                  <p className="text-sm text-muted-foreground">Campaign Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 flex justify-between">
            <Badge variant="secondary" className="flex items-center">
              <Users className="mr-1 h-3 w-3" />
              {campaign.totalDonors} backers
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <CalendarDays className="mr-1 h-3 w-3" />
              {
                daysLeft ? 
                daysLeft + "days left"
                : "No EndDate"
              }
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
