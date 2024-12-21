import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axiosFetch from '@/lib/axios'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import googleIcon from '../../../public/google.svg'
import facebookIcon from '../../../public/facebook.svg'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

type LoginStateType = {
  username: string, 
  password: string
}

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register, setError,  handleSubmit, formState: { errors } } = useForm<LoginStateType>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginStateType> = async (data) => {
    setIsLoading(true)
    try {
      const response = await axiosFetch.post('/auth/login', data);
      
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      
      navigate({ to: '/'})
    } catch (e: any) {
      if (e.response?.status === 400) {
        setError(e.response.data.name, {
          type: 'manual',
          message: e.response.data.message,
        });
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <Card className='min-w-[450px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <div>
                  <Input {...register('username', {
                    required: 'Username is required',
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
                    })} type={showPassword ? "text" : "password"} id="password" placeholder="Password" />
                    {showPassword ?
                    <Eye className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowPassword(false)} /> :
                    <EyeOff className='absolute right-2 top-2 cursor-pointer' onClick={() => setShowPassword(true)} />}
                  </div>
                  {errors.password && <span className='text-red-500 font-medium text-sm'>{errors.password.message}</span>}
                </div>
                <p className='text-sm font-medium '>Already have an Account?  {" "}
                  <Link className='text-blue-500 underline-offset-4  hover:text-blue-700 hover:underline' to='/signup'>Sign Up</Link>
                </p>
              </div>
          </CardContent>

          <CardFooter className='flex-col'>
            <Button type="submit" className='w-full' disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "Login"}
            </Button>
            <div className='w-full'>
              <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t-2 before:border-gray-200 before:me-6 after:flex-1 after:border-t-2 after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
                or
              </div>
            </div>
            <Button type='button' className='w-full justify-start pl-40' variant='secondary' onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google-login`}>
              <img src={googleIcon} className='w-5 h-5' /> Google
            </Button>
            <Button type='button' className='w-full justify-start pl-40 mt-3' variant='secondary' onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/facebook-login`}>
              <img src={facebookIcon} className='w-5 h-5' /> Facebook
            </Button>
          </CardFooter>

        </form>
      </Card>
    </div>
  )
}
