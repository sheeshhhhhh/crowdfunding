import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar'

type CalendarProps = {
    className?: string
}

const Calendar = ({
    className
}: CalendarProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined) 

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button 
                    variant={'outline'}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <CalendarComponent 
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    disabled={{ before: new Date() }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Calendar