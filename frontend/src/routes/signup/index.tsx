import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createFileRoute } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export const Route = createFileRoute('/signup/')({
  component: RouteComponent,
})

type SignUpStateType = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignUpStateType>();

  const onSubmit: SubmitHandler<SignUpStateType> = (data) => {
    if(data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      })
      return
    }

    // handle username and email unique errrs after fetching
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <Card className='min-w-[450px]'>
        <form onSubmit={handleSubmit(onSubmit)}>

          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>

          <CardContent className='space-y-4'>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <div>
                <Input {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Entered value does not match email format'
                  }
                })} id="email" placeholder="Email" />
                {errors.email && <span className='text-red-500 font-medium text-sm'>{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="username">Username</Label>
              <div>
                <Input {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 6,
                    message: 'Username must be at least 6 characters'
                  }
                })} type="text" id="username" placeholder="Username" />
                {errors.username && <span className='text-red-500 font-medium text-sm'>{errors.username.message}</span>}
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div>
                <div className='relative'>
                  <Input className="pr-9" {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })} type={showPassword ? "text" : "password"} id="password" placeholder="Password" />
                  {showPassword ?
                  <Eye className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowPassword(false)} /> :
                  <EyeOff className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowPassword(true)} />}
                </div>
                {errors.password && <span className='text-red-500 font-medium text-sm'>{errors.password.message}</span>}
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="confirmPassword">confirmPassword</Label>
              <div>
                <div className='relative'>
                  <Input className="pr-9" {...register('confirmPassword', {
                    required: 'confirmPassword is required',
                    minLength: {
                      value: 6,
                      message: 'confirmPassword must be at least 6 characters'
                  }})} type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" placeholder="confirmPassword" />
                  {showConfirmPassword ? 
                  <Eye className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowConfirmPassword(false)} /> :
                  <EyeOff className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowConfirmPassword(true)} />}
                </div>
                {errors.confirmPassword && <span className='text-red-500 font-medium text-sm'>{errors.confirmPassword.message}</span>}
              </div>
            </div>

          </CardContent>

          <CardFooter>
            <Button>
              Sign Up
            </Button>
          </CardFooter>

        </form>
      </Card>
    </div>
  )
}
