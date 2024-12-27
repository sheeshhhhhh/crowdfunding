import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import axiosFetch from "@/lib/axios"
import toast from "react-hot-toast"

type ChangePasswordStateType = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

const ChangePassword = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ChangePasswordStateType>()

    const onSubmit: SubmitHandler<ChangePasswordStateType> = async (data) => {
        try {
            if(data.newPassword !== data.confirmPassword) {
                setError('confirmPassword', {
                    type: 'manual',
                    message: 'Passwords do not match'
                })
                return
            }
    
            // fetch request to change password
            const response = await axiosFetch.patch('/user/updatePassword', data, {
                validateStatus: (status) => { 
                    if(status <= 400) {
                        return true
                    }
                    return false
                }
            })
    
            if(response.status === 400) {
                setError(response.data.name, {
                    type: 'manual',
                    message: response.data.message
                })
                return toast.error('wrong password')
            }

            toast.success('Password Updated')
        } catch (error) {
            return toast.error('Something went wrong')
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div>
                            <Input {...register('currentPassword', { required: "currentPassword is required", minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            }})}
                            id="currentPassword" type="password" placeholder="Enter current password" />
                            {errors.currentPassword && <p className="text-red-500 text-sm ml-3">{errors.currentPassword.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div>
                            <Input {...register('newPassword', { required: "newPassword is required", minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            }})}
                            id="newPassword" type="password" placeholder="Enter new password" />
                            {errors.newPassword && <p className="text-red-500 text-sm ml-3">{errors.newPassword.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div>
                            <Input {...register('confirmPassword', { required: "confirmPassword is required", minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long'
                            }})} id="confirmPassword" type="password" placeholder="Enter new password" />
                            {errors.confirmPassword && <p className="text-red-500 text-sm ml-3">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">Change Password</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ChangePassword