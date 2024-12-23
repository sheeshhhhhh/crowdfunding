import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { ComponentProps } from 'react';

type CalendarProps = {
    className?: string,
    date: Date | undefined,
    onSelect: (date: Date | undefined) => void,
    selected: Date | undefined
} & Partial<ComponentProps<typeof CalendarComponent>>

const Calendar = ({
    className,
    date,
    onSelect,
    selected,
    ...props
}: CalendarProps) => {

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
                    {...props}
                    selected={selected}
                    onSelect={onSelect}
                    mode='single'
                    disabled={{ before: new Date() }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Calendar