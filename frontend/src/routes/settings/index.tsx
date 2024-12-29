import LoadingSpinner from '@/components/common/LoadingSpinner'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import BillingInformation from '@/components/pageComponents/settings/BillingInformation'
import ChangePassword from '@/components/pageComponents/settings/ChangePassword'
import UserProfile from '@/components/pageComponents/settings/UserProfile'
import axiosFetch from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/settings/')({
  component: () => (
    <ProtectedRoute>
      <RouteComponent />
    </ProtectedRoute>
  ),
})

function RouteComponent() {
  // request all the initial data for the settings page here
  const { data: initialData, isLoading, isError } = useQuery({
    queryKey: ['getInitialData'],
    queryFn: async () => {
      const response = await axiosFetch.get('/user/getInitialData')

      if (response.status >= 400) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }

      return response.data
    },
  })

  if(isLoading) {
    return <LoadingSpinner />
  }

  if(isError || !initialData) {
    return <div>Error Loading the page</div>
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>Account Settings</h1>
      <div className='space-y-6'>
        <UserProfile initialEmail={initialData.email} initialImage={initialData.profile} initialUsername={initialData.username} />
        <ChangePassword />
        <BillingInformation initialData={initialData.billingInfo} />
      </div>
    </div>
  )
}
