import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

type LoginStateType = {
  username: string, 
  password: string
}

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginStateType>()
  
  const onSubmit: SubmitHandler<LoginStateType> = (data) => {
    console.log(data)
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <Card className='min-w-[450px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
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
              </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>

        </form>
      </Card>
    </div>
  )
}
