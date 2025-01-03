import { useAuthContext } from "@/context/AuthContext"
import { useSocket } from "@/context/SocketContext"
import axiosFetch from "@/lib/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { Bell, Layers, LogOut, Settings2, UserRound } from "lucide-react"
import { useEffect, useState } from "react"
import NotificationCard from "../pageComponents/dashboard/notification/NotificationCard"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import LoadingSpinner from "./LoadingSpinner"

const NavBar = () => {
    const [isOpenSheet, setIsOpenSheet] = useState(false)
    const { user, isLoggedIn } = useAuthContext()

    const Logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.reload() // just reaload the page
    }

    return (
        <header className="flex justify-between px-4 sm:px-8 md:px-14 h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 dark:bg-gray-800/40">
            <div className="flex h-[60px] items-center border-b px-6 gap-4">
                <Link className="flex items-center gap-2 font-semibold" href="/">
                    <Layers className="h-6 w-6" />
                    <span className="">CrowdFund</span>
                </Link>
                <Link to="/campaigns/browse">
                    <Button variant="outline">
                        Browse
                    </Button>
                </Link>
                <Link to="/messages">
                    <Button variant="outline">
                        Messages
                    </Button>
                </Link>
            </div>

            {!isLoggedIn() && (
                <div className="space-x-4">
                  <Link href="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </div>
            )}
            {isLoggedIn() && <div className="flex items-center gap-4">
                <Notifications />
                <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                    <SheetTrigger>
                        <Avatar>
                            <AvatarImage src={user.profile} alt="@username" />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                    </SheetTrigger>
                    <SheetContent className="w-[300px]">
                        <SheetHeader className="flex-row items-center gap-4 space-y-0">
                            <Avatar>
                                <AvatarImage src={user.profile} alt="@username" />
                                <AvatarFallback>{user.username[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center">
                                <SheetTitle>
                                    {user.username}
                                </SheetTitle>
                                <SheetDescription>
                                    {user.email}
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        <nav className="flex flex-col gap-3 px-4 mt-9 font-semibold text-lg">
                            <div className="flex justify-start gap-3">
                                <UserRound />
                                <Link to='/profile/$userId' params={{ userId: user.id }}>
                                    Profile
                                </Link>
                            </div>
                            <div className="flex justify-start gap-3">
                                <Layers />
                                <Link to="/dashboard/Overview">
                                    Dashboard
                                </Link>
                            </div>
                            <div className="flex justify-start gap-3">
                                <Settings2 />
                                <Link to={'/settings'}>
                                    Settings
                                </Link>
                            </div>
                            <div className="flex justify-start gap-3">
                                <LogOut />
                                <button onClick={() => Logout()}>
                                    Logout
                                </button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>}
        </header>
    )
}

const Notifications = () => {
    const queryClient = useQueryClient()
    const { socket } = useSocket()
    const { data: notifications, isLoading } = useQuery({
        queryKey: ['unreadNotifs'],
        queryFn: async () => {
            const response = await axiosFetch.get('/inbox/unread')
            return response.data
        },
        refetchOnWindowFocus: false
    })

    // listening to notification using sockets
    useEffect(() => {
        if(!socket) return

        socket.on('notification', (data) => {
            // update the unreadNotifs
            queryClient.setQueryData(['unreadNotifs'], (oldData: any) => {
                return {
                    ...oldData,
                    notifications: [data, ...oldData.notifications],
                    unreadNotificationCount: oldData.unreadNotificationCount + 1
                }
            })

            // update the notification in inbox dashboard
            queryClient.invalidateQueries(['notifications'])
        })

        return () => {
            socket.off('notification')
        }
    }, [socket])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="rounded-full relative" size="icon" variant="ghost">
                    {
                        notifications?.unreadNotificationCount ? 
                        <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white">{notifications?.unreadNotificationCount}</span>
                        : null
                    }
                    <Bell className="h-8 w-8" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[600px]">
                <header className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">
                        Notifications
                    </h2>
                    <Link reloadDocument to={'/dashboard/Inbox'} className="text-sm underline underline-offset-2 text-blue-500">
                        View all
                    </Link>
                </header>
                <div className="space-y-2 py-2">
                    {
                        isLoading ? 
                        <LoadingSpinner /> :
                        notifications?.length !== 0 ?
                            notifications?.notifications?.map((notification: any) => (
                                <NotificationCard key={notification.id} size="sm" notification={notification} />
                            ))
                        :
                        <div className="text-center text-muted-foreground">
                            No Unread notifications
                        </div>
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}


export default NavBar