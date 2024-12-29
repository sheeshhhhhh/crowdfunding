import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { Calendar, CreditCard, Home, Inbox, Layers, Settings } from "lucide-react"

const DashboardSidebar = () => {

    return (
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
                    <Layers className="h-6 w-6" />
                    <span className="">CrowdFund</span>
                </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                    activeProps={{ className: 'text-gray-900 dark:text-gray-50' }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/dashboard/overview"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                    <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/dashboard/campaigns"
                    >
                        <Layers className="h-4 w-4" />
                        Campaigns
                    </Link>
                    <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/dashboard/donations"
                    >
                        <CreditCard className="h-4 w-4" />
                        Donations
                    </Link>
                    <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/dashboard/inbox"
                    >
                        <Inbox className="h-4 w-4" />
                        Inbox
                    </Link>
                    <Link
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="/calendar"
                    >
                        <Calendar className="h-4 w-4" />
                        Calendar
                    </Link>
                </nav>
                </div>
                <div className="max-w-[163.3px] mt-auto p-4 space-y-4">
                    <Link to='/campaigns/browse' search={{ page: 1, search: '', filter: '' }}>
                        <Button className="w-full justify-center gap-2">
                            view Campaigns
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebar