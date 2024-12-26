import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type UpdateFormType = {
  message: string
  campaignId: string
}

type UpdateFormProps = {
    campaignId: string,
    onSubmit: (data: UpdateFormType) => void,
    initialMessage?: string
}

const UpdateForm = ({
    campaignId,
    onSubmit,
    initialMessage
}: UpdateFormProps) => {
    const [words, setWords] = useState(0)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateFormType>({
        defaultValues: {
            message: initialMessage || '',
            campaignId: campaignId
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label className='mb-2' htmlFor="message">Your message</Label>
                <Textarea id='message' className='min-h-[150px] max-h-[500px]' 
                {...register('message', {
                    required: 'Message is required',
                    maxLength: { value: 500, message: 'Message is too long' },
                    onChange: (e) => setWords(e.target.value.length)
                })} placeholder='update on what is going on and current events' />
                {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
            </div>
            <p className='text-right text-muted-foreground my-1'>{words}/500</p>
            <Button className='mt-5 w-full' disabled={isSubmitting} type='submit'>
                {isSubmitting ? <LoadingSpinner /> : "Submit"}
            </Button>
        </form>
    )
}

export default UpdateForm