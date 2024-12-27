import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axiosFetch from "@/lib/axios"

type BillingInformationStateType = {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
}

type BillingInformationProps = {
    initialData: BillingInformationStateType
}

const BillingInformation = ({
    initialData
}: BillingInformationProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<BillingInformationStateType>({
        defaultValues: initialData
    })
    
    const onSubmit: SubmitHandler<BillingInformationStateType> = async (data) => {
        try {
            const response = await axiosFetch.patch('/user/updateBillingInformation', data)

            if (response.status >= 400) {
                throw new Error(response.data.message)
            }

            toast.success('Billing Information Updated')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <div>
                                <Input {...register('firstName', {
                                    required: "First Name is required"
                                })} id="firstName" placeholder="John" />
                                {errors.firstName && <p className="text-red-500 text-sm ml-3">{errors.firstName.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <div>
                                <Input {...register('lastName', {
                                        required: "Last Name is required"
                                })} id="lastName" placeholder="Doe" />
                                {errors.lastName && <p className="text-red-500 text-sm ml-3">{errors.lastName.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div>
                            <Input {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                }
                            })} id="email" type="email" placeholder="your@email.com" />
                            {errors.email && <p className="text-red-500 text-sm ml-3">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div>
                            <Input {...register('address', {
                                required: "Address is required"
                            })} id="address" placeholder="123 Main St" />
                            {errors.address && <p className="text-red-500 text-sm ml-3">{errors.address.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <div>
                                    <Input {...register('city', {
                                        required: "City is required"
                                    })} id="city" placeholder="New York" />
                                    {errors.city && <p className="text-red-500 text-sm ml-3">{errors.city.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <div>
                                <Input {...register('postalCode', {
                                    required: "Postal Code is required"
                                })} id="postalCode" placeholder="1335" />
                                {errors.postalCode && <p className="text-red-500 text-sm ml-3">{errors.postalCode.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <div>
                            <Input {...register('country', {
                                required: "Country is required"
                            })} id="country" placeholder="United States" />
                            {errors.country && <p className="text-red-500 text-sm ml-3">{errors.country.message}</p>}
                        </div>
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">Update Billing Information</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default BillingInformation