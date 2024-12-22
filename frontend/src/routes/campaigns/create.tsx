import { createFileRoute } from '@tanstack/react-router'
import { CardDescription, CardTitle } from '@/components/ui/card'
import Tiptap from '@/components/common/Tiptap'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Calendar from '@/components/common/Calendar'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/campaigns/create')({
  component: RouteComponent,
})

function RouteComponent() {
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className='min-h-screen pt-10'>
            <header className='flex items-center'>
            </header>
            <div className='max-w-[800px] mx-auto'>
                <CardTitle className=''>
                    Create New Campaign
                </CardTitle>
                <CardDescription>
                    Fill in the details to start your new fundraising campaign.
                </CardDescription>
                    <div className='space-y-4 my-8'>
                        <div>
                            <Label className='text-base'>Upload Image</Label>
                            {previewImage ? (
                                    <img src={previewImage} alt='Campaign Image' className='w-full max-h-[400px] rounded-lg mb-2' />
                            ) : null}
                            <Input onChange={(e) => handleImageChange(e)} type='file' />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className='text-base' htmlFor="title">Title</Label>
                            <Input className='w-full max-w-[800px]' type="text" id="title" placeholder="Title...." />
                        </div>
                        <div className='flex gap-5'>
                            <div className="grid w-full items-center gap-1.5 max-w-[200px]">
                                <Label className='text-base' htmlFor="goal">Fundraising Goal ($)</Label>
                                <Input className='w-full max-w-[200px]' type="number" id="goal" placeholder="Money Goal" />
                            </div>
                            <div className='mt-auto'>
                                <Label>Current Money Raised</Label>
                                <p className="text-xl font-bold">$0.00</p>
                                <p className="text-xs text-muted-foreground">This will update as donations come in.</p>
                            </div>
                            <div>
                                <Label>End Date</Label>
                                <Calendar />
                                <p className="text-xs text-muted-foreground">This campaign will end on the specified date.</p>
                            </div>
                        </div>
                        <Tiptap onChange={(value) => console.log(value)} />
                        <div className='w-full flex justify-center items-center'>
                            <Button className='w-full max-w-[350px]'>
                                Create Campaign
                            </Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}
