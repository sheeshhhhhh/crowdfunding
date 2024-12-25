import LoadingSpinner from '@/components/common/LoadingSpinner'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

type RedirectTokenSearchParams = {
    access_token: string,
    refresh_token: string
}

export const Route = createFileRoute('/redirecttoken/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, string>): RedirectTokenSearchParams => {
    return {
        access_token: search.access_token || '' ,
        refresh_token: search.refresh_token || ''
    }
  }
})

function RouteComponent() {
    const search = useSearch({ from: '/redirecttoken/' })
    const navigate = useNavigate({ from: '/redirecttoken' })

    useEffect(() => {

        if (!search.access_token || !search.refresh_token) {
            navigate({ to: '/login' })
            return
        }
        localStorage.setItem('access_token', search.access_token)
        localStorage.setItem('refresh_token', search.refresh_token)
    
        navigate({ to: '/', reloadDocument: true })
    }, [])

    return (    
        <div className='min-h-screen flex items-center justify-center'>
            <LoadingSpinner className='h-12 w-12' />
        </div>
    )
}
