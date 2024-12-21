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

          <CardFooter>
            <Button type="submit" className='w-full' disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "Login"}
            </Button>
          </CardFooter>

        </form>
      </Card>
    </div>
  )
}
