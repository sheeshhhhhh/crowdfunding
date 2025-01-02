import LoadingSpinner from "@/components/common/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axiosFetch from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MailOpen, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"


type NotificationOptionsProps = {
    id: string
}

const NotificationOptions = ({
    id
}: NotificationOptionsProps) => {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)

    const { mutate: DeleteNotification, isLoading: isLoadingDelete } = useMutation({
        mutationKey: ['deleteNotification'],
        mutationFn: async () => {
            const response = await axiosFetch.delete(`/inbox/${id}`)

            if(response.status >= 400) {
                throw new Error(response.data.message)
            }

            setIsOpen(false)
            return response.data
        },
        onError: (error: any) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications']})
            queryClient.invalidateQueries({ queryKey: ['unreadNotifs']})
        }
    })

    const { mutate: MarkAsRead, isLoading: isLoadingMarkAsRead } = useMutation({
        mutationKey: ['markAsRead'],
        mutationFn: async () => {
            const response = await axiosFetch.patch(`/inbox/mark-as-read/${id}`)

            if(response.status >= 400) {
                throw new Error(response.data.message)
            }

            setIsOpen(false)
            return response.data
        },
        onError: (error: any) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications']})
            queryClient.invalidateQueries({ queryKey: ['unreadNotifs']})
        }
    })

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <Button className="ml-2" variant={'ghost'}>
                    <MoreHorizontal />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col space-y-2">
                <Button disabled={isLoadingMarkAsRead} onClick={() => MarkAsRead()}>
                    {isLoadingMarkAsRead ? <LoadingSpinner /> : <div className="flex items-center gap-2"><MailOpen /> Mark as read</div>}
                </Button>
                <Button disabled={isLoadingDelete} variant="destructive" onClick={() => DeleteNotification()}>
                    {isLoadingDelete ? <LoadingSpinner /> : <div className="flex items-center gap-2"><Trash2 /> Delete</div>}
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default NotificationOptions