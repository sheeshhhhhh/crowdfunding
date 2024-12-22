import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const campaignData = [
    { name: 'Save the Forests', raised: 15000, goal: 20000 },
    { name: 'Clean Water Initiative', raised: 8000, goal: 10000 },
    { name: 'Education for All', raised: 5000, goal: 50000 },
]

const Campaigns = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaignData.map((campaign, index) => (
        <Card key={index}>
            <CardHeader>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription>
                Campaign Progress
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-2">
                <Progress value={(campaign.raised / campaign.goal) * 100} />
                <div className="flex justify-between text-sm text-muted-foreground">
                <span>{"$" + campaign.raised.toLocaleString() + " raised"}</span>
                <span>{"$" + campaign.goal.toLocaleString() + " goal"}</span>
                </div>
            </div>
            </CardContent>
        </Card>
        ))}
    </div>
  )
}

export default Campaigns