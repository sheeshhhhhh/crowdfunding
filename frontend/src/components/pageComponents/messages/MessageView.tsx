import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axiosFetch from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import SendMessage from "./SendMessage"
import { useSearch } from "@tanstack/react-router"
import MessagesDisplay from "./MessagesDisplay"

const MessageView = () => {
    const { userId } = useSearch({ from: '/messages/'})

    // getting user profile so that even if there is no conversation you can still see the profile
    const { data: profile } = useQuery({
        queryKey: ['profile', userId],
        queryFn: async () => {
            if(!userId) return

            const response = await axiosFetch.get(`/user/getProfile/${userId}`)
            return response.data
        },
        refetchOnWindowFocus: false
    })

    if(!userId) {
        return
    }

    return (
        <Card className="max-h-[751px] flex flex-col">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4 border-b">
                <Avatar>
                    <AvatarImage src={profile?.profile || ''} alt="JohnDoe" />
                    <AvatarFallback>{profile?.username[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{profile?.username}</CardTitle>
            </CardHeader>
            <CardContent>     
                <MessagesDisplay />
            </CardContent>
            <CardFooter>
                <SendMessage />
            </CardFooter>
        </Card>
    )
}

export default MessageView