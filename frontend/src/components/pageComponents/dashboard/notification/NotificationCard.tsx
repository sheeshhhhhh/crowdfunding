import { format } from "date-fns"
import NotificationOptions from "./NotificationOptions"
import { ComponentProps } from "react"

type NotificationCardProps = {
    notification: any,
    size?: 'base' | 'sm'
} & ComponentProps<'div'>

const NotificationCard = ({ 
    notification,
    size='base',
    ...props
}: NotificationCardProps) => {
    const textSize = size === 'base' ? 'text-sm' : 'text-xs'
    const dotSize = size === 'base' ? 'w-2 h-2' : 'w-1 h-1'

    return (
        <div {...props} className="flex items-center">
            <div className="flex-shrink-0 mr-3">
                {!notification.isRead ? (
                    <div className={`${dotSize} bg-blue-600 rounded-full`} aria-hidden="true" />
                ): (
                    <div className={`${dotSize} bg-transparent`} />
                )}
            </div>
            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{size === "base" ? notification.message : notification.message.slice(0, 50) + '...'}</p>
            </div>
            <div className={`ml-auto ${textSize} text-muted-foreground `}>
                {format(new Date(notification.createdAt), "yyyy-MM-dd")}
            </div>
            <NotificationOptions id={notification.id} />
        </div>
    )
}

export default NotificationCard