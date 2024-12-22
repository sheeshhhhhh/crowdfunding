import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Donations = () => {
  return (
    <Card>
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
                {[
                { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '$1,999.00' },
                { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '$39.00' },
                { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '$299.00' },
                { name: 'William Kim', email: 'will@email.com', amount: '$99.00' },
                { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '$499.00' },
                ].map((donation, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                    <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
                    <AvatarFallback>{donation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{donation.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {donation.email}
                    </p>
                    </div>
                    <div className="ml-auto font-medium">{donation.amount}</div>
                </div>
                ))}
            </div>
        </CardContent>
    </Card>
  )
}

export default Donations