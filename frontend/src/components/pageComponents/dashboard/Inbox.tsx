import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const inboxData = [
  { id: 1, sender: 'John Doe', subject: 'Thank you for your donation!', preview: 'I wanted to personally thank you for...', date: '2023-06-15' },
  { id: 2, sender: 'Jane Smith', subject: 'Campaign update: Clean Water Initiative', preview: 'We\'ve reached 80% of our goal...', date: '2023-06-14' },
  { id: 3, sender: 'Support Team', subject: 'Your campaign has been approved', preview: 'Congratulations! Your campaign...', date: '2023-06-13' },
]  

const Inbox = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>
                Manage your messages and notifications
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-8">
                {inboxData.map((message) => (
                <div key={message.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{message.sender}</p>
                    <p className="text-sm font-medium">{message.subject}</p>
                    <p className="text-sm text-muted-foreground">
                        {message.preview}
                    </p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">{message.date}</div>
                </div>
                ))}
            </div>
        </CardContent>
    </Card>
  )
}   

export default Inbox