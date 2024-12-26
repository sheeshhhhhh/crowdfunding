import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogFooter, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import UpdateForm, { UpdateFormType } from "./UpdateForm"
import { SubmitHandler } from "react-hook-form"
import axiosFetch from "@/lib/axios"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"

type CreateUpdateProps = {
    campaignId: string,
}

const CreateUpdate = ({
    campaignId
}: CreateUpdateProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    const onSubmit: SubmitHandler<UpdateFormType> = async (data) => {
        try {
            const response = await axiosFetch.post('/update', data)

            if(response.status !== 201) {
                throw new Error('An error occurred')
            }

            queryClient.invalidateQueries({ predicate: query => query.queryKey[0] === 'campaign' })
            queryClient.invalidateQueries({ queryKey: ['viewAllupdates'] }) 
            toast.success('Update created successfully')
            setIsOpen(false)
        } catch (error) {
            toast.error('An error occurred')
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    Create Update
                </Button>
            </DialogTrigger>
            <DialogContent className='w-full max-w-[700px]'>
                <DialogHeader>
                    <DialogTitle>
                        Create Update
                    </DialogTitle>
                    <DialogDescription>
                        Create a new update for your campaign
                    </DialogDescription>
                </DialogHeader>
                <UpdateForm campaignId={campaignId} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}

export default CreateUpdate