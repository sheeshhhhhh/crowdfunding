import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import axiosFetch from '@/lib/axios'
import { Update } from '@/types/update'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import UpdateForm, { UpdateFormType } from './UpdateForm'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useState } from 'react'

type UpdateOptionsProps = {
    update: Update
}

const UpdateOptions = ({
    update 
}: UpdateOptionsProps) => {
    const [isOpen, setIsOpen] = useState(false) // for popover

    const closePopover = () => {
        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <Button>
                    <MoreHorizontal />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex-col space-y-2">

                <EditUpdate closePopover={closePopover} initialMessage={update.message} campaignId={update.postId} updateId={update.id} />

                <DeleteUpdate closePopover={closePopover} updateId={update.id} />

            </PopoverContent>
        </Popover>
    )
}

type DeleteUpdateProps = {
    updateId: string,
    closePopover: () => void
}

export const DeleteUpdate = ({
    updateId,
    closePopover
}: DeleteUpdateProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteUpdate, isLoading: isLoadingDelete } = useMutation({
        mutationFn: async () => {
            const response = await axiosFetch.delete(`/update/${updateId}`)

            if(response.status !== 200) {
                throw new Error('An error occurred')
            }
            
            queryClient.setQueryData(['viewAllupdates'], (data: Update[] | undefined) => {
                return data?.filter((updateData: Update) => updateData.id !== updateId)
            })

            setIsOpen(false)
            toast.success('Update deleted successfully')
            closePopover()
        },
        onError: () => {
            toast.error('An error occurred')
        }
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={'destructive'} className="w-full">
                    <Trash2 />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete this update message?
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => deleteUpdate()} disabled={isLoadingDelete} className="min-w-[150px]" variant={'destructive'}>
                        {isLoadingDelete ? <LoadingSpinner /> : "Delete"}
                    </Button>
                    <DialogClose>
                        <Button className="min-w-[150px]" variant={'outline'}>
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

type editUpdateProps = {
    campaignId: string,
    initialMessage: string,
    updateId: string,
    closePopover: () => void
}

export const EditUpdate = ({
    campaignId,
    initialMessage,
    updateId,
    closePopover
}: editUpdateProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()
    const onSubmitUpdate: SubmitHandler<UpdateFormType> = async (data) => {
        try {
            const response = await axiosFetch.patch(`/update/${updateId}`, data)

            if(response.status !== 200) {
                throw new Error('An error occurred')
            }
            
            queryClient.setQueryData(['viewAllupdates'], (data: Update[] | undefined) => {
                return data?.map((update: Update) => {
                    if(update.id === updateId) {
                        return response.data
                    }
                    return update
                })
            })

            setIsOpen(false)
            toast.success('Update updated successfully')
            closePopover()
        } catch (error) {
            toast.error('An error occurred')
        } 
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <Pencil />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Update
                    </DialogTitle>
                    <DialogDescription>
                        Edit Update message for your campaign
                    </DialogDescription>
                </DialogHeader>
                <UpdateForm onSubmit={onSubmitUpdate} initialMessage={initialMessage} campaignId={campaignId} />
            </DialogContent>
        </Dialog>

    )
}

export default UpdateOptions