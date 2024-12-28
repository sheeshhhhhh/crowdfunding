import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axiosFetch from '@/lib/axios'
import { CampaignPost } from '@/types/campaign'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/donation/donate/$donationId')({
  component: RouteComponent,
})

function RouteComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const [paymentMethod , setPaymentMethod] = useState<string>();
    const [amount, setAmount] = useState<number>();
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    })

    const { donationId } = Route.useParams()
    
    useEffect(() => {
        const getBillingInformation = async () => {
            const response = await axiosFetch.get('user/getBillingInfo')
            setBillingInfo(response.data)
        }

        getBillingInformation()
    }, [donationId])

    const { data: campaignData, isLoading: isLoadingCampaign } = useQuery({
        queryKey: ['campaign', 'donation', donationId],
        queryFn: async () => {
            const response = await axiosFetch.get(`/campaign/${donationId}`)

            if(response.status === 404) { // means the campaign does not exist
                return undefined
            }
            
            return response.data as CampaignPost
        }, 
        refetchOnWindowFocus: false
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBillingInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDonation = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        try {
            e.preventDefault()

            const response = await axiosFetch.post('donation', {
                amount,
                paymentMethod,
                campaignId: donationId,
                ...billingInfo
            })

            if(response.status === 201) {
                console.log(response.data.redirectUrl)
                window.location.assign(response.data.redirectUrl)
            }
        } catch (error) {
            toast.error('An error occurred while processing your donation')
        } finally {
            setIsLoading(false)
        }
    }

    if(campaignData === undefined) {
        return null
    }

    return (
        <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Donate to {campaignData.title}</h1>
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
            <form onSubmit={handleDonation}>
                <Card>
                    <CardHeader>
                        <CardTitle>Donation Amount</CardTitle>
                        <CardDescription>How much would you like to donate?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.valueAsNumber)}
                            className="pl-8"
                            placeholder="Enter amount"
                            required
                        />
                        </div>
                    </CardContent>
                    </Card>

                    <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Select your preferred payment method</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paymaya" id="paymaya" />
                            <Label htmlFor="paymaya">PayMaya</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gcash" id="gcash" />
                            <Label htmlFor="gcash">GCash</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="credit-card" />
                            <Label htmlFor="card">Card</Label>
                        </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Billing Information</CardTitle>
                        <CardDescription>Please enter your billing details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" value={billingInfo.firstName} onChange={handleInputChange} required />
                            </div>
                            <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" value={billingInfo.lastName} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={billingInfo.email} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" value={billingInfo.address} onChange={handleInputChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={billingInfo.city} onChange={handleInputChange} required />
                            </div>
                            <div>
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input id="postalCode" name="postalCode" value={billingInfo.postalCode} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="country">Country</Label>
                            <Select name="country" onValueChange={(value) => setBillingInfo(prev => ({ ...prev, country: value }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="mx">Mexico</SelectItem>
                                <SelectItem value="ph">Philippines</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        </div>
                    </CardContent>
                </Card>
                <Button disabled={isLoading} type="submit" className="w-full mt-3">
                    {isLoading ? <LoadingSpinner /> : "Donate"}
                </Button>
            </form>
            </div>
            <div>
            {    isLoadingCampaign ? <LoadingSpinner /> :
                <Card>
                    <CardHeader>
                    <CardTitle>Campaign Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <img src={campaignData.headerImage} alt={campaignData.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{campaignData.title}</h2>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Raised:</span>
                        <span>${campaignData.current}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Goal:</span>
                        <span>${campaignData.goal}</span>
                    </div>
                    </CardContent>
                </Card>
            }
            </div>
        </div>
        </div>
    )
}
