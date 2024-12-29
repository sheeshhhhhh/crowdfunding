import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthContext } from "@/context/AuthContext"
import { File } from "lucide-react"
import toast from "react-hot-toast"
import axiosFetch from "@/lib/axios"
import { Textarea } from "@/components/ui/textarea"

type UserProfileStateType = {
  profile: File[],
  email: string,
  username: string,
  bio: string,
  location: string
}

type UserProfileProps = {
  initialImage: string,
  initialEmail: string,
  initialUsername: string,
  initialBio: string,
  initialLocation: string,
}

const UserProfile = ({
  initialImage,
  initialEmail,
  initialUsername,
  initialBio,
  initialLocation
}: UserProfileProps) => {
  const { user } = useAuthContext()
  const [preview, setPreview] = useState<string | null>(initialImage || null)
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileStateType>({
    defaultValues: {
      email: initialEmail,
      username: initialUsername,
      bio: initialBio,
      location: initialLocation
    }
  })

  const handlePreviewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit: SubmitHandler<UserProfileStateType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("profile", data.profile?.[0]);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("bio", data.bio);
      formData.append("location", data.location);

      const response = await axiosFetch.patch('/user/updateUserProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.status >= 400) {
        throw new Error(response.data.message)
      }

      toast.success('User Profile Updated')
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile">Profile</Label>
            <div className="flex gap-5 items-center space-x-4 ml-8">
              <Avatar className="w-24 h-24">
                <AvatarImage src={preview || ''} alt="" />
                <AvatarFallback>{user.username[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div className="w-full max-w-[400px] py-4 bg-gray-50 rounded-2xl border border-gray-300 border-dashed">
                <div className="grid gap-3">
                  <File className="mx-auto w-8 h-8" />
                  <div className="grid gap-1">
                      <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag an image here</h4>
                      <span className="text-center  text-gray-400 text-xs font-light leading-4">OR</span>
                      <div className="flex items-center justify-center">
                        <label>
                          <input {...register('profile', {
                            onChange: (e) => handlePreviewFile(e),
                            
                          })} type="file" hidden />
                          <div className="flex w-28 h-9 px-2 flex-col bg-primary rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                            Choose File
                          </div>
                        </label>
                      </div>
                  </div>
                </div>
              </div>
              {/* <Input {...register('profile', {
                required: 'Profile is required',
                onChange: (e) => handlePreviewFile(e)
              })} */}
              {/* accept="image/*" type="file" id="profile" placeholder="Tell us about yourself" /> */}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div>
                <Input {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address'
                  }
                })} id="email" type="email" placeholder="your@email.com" />
                {errors.email && <p className="text-red-500 text-sm ml-3">{errors.email.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div>
                <Input {...register('username', {
                  required: 'Username is required'
                })} id="username" type="text" placeholder="username" />
                {errors.username && <p className="text-red-500 text-sm ml-3">{errors.username.message}</p>}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div>
              <Input {...register('location')} id="location" type="text" placeholder="Location" />
              {errors.location && <p className="text-red-500 text-sm ml-3">{errors.location.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <div>
              <Textarea {...register('bio')} id="bio" placeholder="Tell us about yourself" />
              {errors.bio && <p className="text-red-500 text-sm ml-3">{errors.bio.message}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full sm:w-auto">Update Profile</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserProfile  