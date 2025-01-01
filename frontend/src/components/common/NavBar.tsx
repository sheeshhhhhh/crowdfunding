import { Bell, Layers, LogOut, Settings2, UserRound } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useAuthContext } from "@/context/AuthContext"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Link } from "@tanstack/react-router"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

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
                <Popover>
                    <PopoverTrigger>
                        <Button className="rounded-full" size="icon" variant="ghost">
                            <Bell className="h-8 w-8" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[400px]">
                        <header className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">
                                Notifications
                            </h2>
                            <Link className="text-sm underline underline-offset-2 text-blue-500">
                                View all
                            </Link>
                        </header>
                        <div>
                            {/* <NotificationList /> */}
                        </div>
                    </PopoverContent>
                </Popover>
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


export default NavBar