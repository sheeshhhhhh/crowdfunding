import { Button } from '@/components/ui/button'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import DashboardSidebar from '@/components/pageComponents/dashboard/DashboardSidebar'

export const Route = createFileRoute('/dashboard/')({
  component: ({children}) =>  (
    <div className='flex h-screen overflow-hidden'>
        <DashboardSidebar />
        <div className='flex-1 overflow-auto'>
            {/* <DashboardHeader /> */}
            <main className='flex-1 p-6'>
                {children}
            </main>
        </div>
    </div>
  ),
})

function RouteComponent() {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                <Link href="/dashboard/create-campaign">
                    <Button>Create Campaign</Button>
                </Link>
                </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="inbox">Inbox</TabsTrigger>
            </TabsList>
            
        </Tabs>
        </div>
  )
}
