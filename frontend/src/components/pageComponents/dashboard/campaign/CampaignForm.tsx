import Calendar from '@/components/common/Calendar'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Tiptap from '@/components/common/Tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CampaignCategory as CampaignCategoryType } from '@/types/campaign'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export type dataStateType = {
    headerImage: File | undefined
    title: string
    body: string
    goal: number
    endDate: Date | undefined
    category?: CampaignCategoryType
}

export type initialDataType = {
    headerImage: string | undefined
    title: string
    body: string
    goal: number
    endDate: Date | undefined,
    category?: CampaignCategoryType
}

type CampaignFormProps = {
    initialData?: initialDataType,
    onSubmit: (data: dataStateType) => Promise<void>,
    isUpdate?: boolean
}

const CampaignForm = ({
    initialData,
    onSubmit, 
    isUpdate=false
}: CampaignFormProps) => {
    const [previewImage, setPreviewImage] = useState<string | undefined>(initialData?.headerImage || undefined)
    const [data, setData] = useState<dataStateType>({
        headerImage: undefined,
        title: initialData?.title || '',
        body: initialData?.body || '',
        goal: initialData?.goal || 0,
        endDate: initialData?.endDate || undefined,
        category: initialData?.category || undefined
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setData({
                ...data,
                headerImage: file,
            })

            // for preview image
            const reader = new FileReader()
            reader.onload = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const isValid = () => {
        // if update, we don't need to check headerImage
        // if create, we need to check headerImage

        if(isUpdate) {
            if (!data.title || !data.body || !data.goal) {
                return false
            }

            return true
        } else {
            if (!data.headerImage || !data.title || !data.body || !data.goal) {
                return false
            }
            
            return true
        }

    }

    const { mutate, isLoading } = useMutation({
        mutationKey: ['campaigns', 'create'],
        mutationFn: async () => {
            if(!isValid()) return toast.error('Please fill in all required fields.')

            await onSubmit(data)
        }
    })
    
    return (
        <div className='space-y-4 my-8'>
            <div>
                <Label className='text-base'>Upload Image</Label>
                {previewImage ? (
                        <img src={previewImage} alt='Campaign Image' className='w-full max-h-[400px] rounded-lg mb-2' />
                ) : null}
                <Input onChange={(e) => handleImageChange(e)} type='file' />
            </div>
            <div className='flex gap-5'>
                <div className="grid w-full items-center gap-1.5">
                    <Label className='text-base' htmlFor="title">Title</Label>
                    <Input value={data.title} onChange={(e) => setData({...data, title: e.target.value})} 
                    className='w-full max-w-[800px]' type="text" id="title" placeholder="Title...." />
                </div>
                <div className='grid w-[175px] items-center gap-1.5'>
                    <Label className='text-base' htmlFor="category">Category</Label>
                    <Select value={data.category} onValueChange={(value) => setData({...data, category: value as CampaignCategoryType})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {['MEDICAL', 'EDUCATION', 'ENVIRONMENT', 'ANIMALS', 'DISASTER', 'BUSINESS', 'OTHER']
                            .map((category) => (
                                <SelectItem className='first-letter:uppercase' value={category}>
                                    {category.toLowerCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex gap-5'>
                <div className="grid w-full items-center gap-1.5 max-w-[200px]">
                    <Label className='text-base' htmlFor="goal">Fundraising Goal ($)</Label>
                    <Input value={data.goal} onChange={(e) => setData({...data, goal: e.target.valueAsNumber})} 
                    className='w-full max-w-[200px]' type="number" id="goal" placeholder="Money Goal" />
                </div>
                <div className='mt-auto'>
                    <Label>Current Money Raised</Label>
                    <p className="text-xl font-bold">$0.00</p>
                    <p className="text-xs text-muted-foreground">This will update as donations come in.</p>
                </div>
                <div>
                    <Label>End Date</Label>
                    <Calendar 
                    date={data.endDate}
                    onSelect={(date: Date | undefined) => setData({...data, endDate: date})}
                    selected={data.endDate}
                    />
                    <p className="text-xs text-muted-foreground">This campaign will end on the specified date.</p>
                </div>
            </div>
            <Tiptap body={data.body} onChange={(value) => setData({...data, body: value})} />
            <div className='w-full flex justify-center items-center'>
                <Button onClick={() => mutate()} disabled={isLoading} className='w-full max-w-[350px]'>
                    {isLoading ? <LoadingSpinner /> : "Create Campaign"}
                </Button>
            </div>
        </div>
    )
}

export default CampaignForm