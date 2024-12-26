import { Update } from "@/types/update"
import { userProfile } from "@/types/user"
import { format } from "date-fns"

type UpdateCardProps = {
    update: Update,
    user?: userProfile,
}

const UpdateCard = ({
    update,
    user
}: UpdateCardProps) => {

    if (!update) {
        return null
    }

    return (
        <div>
            <header className='flex gap-2'>
              <h1 className='font-bold text-lg'>
                {format(new Date(update.createdAt), 'yyyy-MM-dd')}
              </h1>
              <p className='text-muted-foreground'>
                by {user?.username ? user.username : 'Unknown'}
              </p>
            </header>
            <div>
              <span>{update.message}</span>
            </div>
        </div>
    )
}

export default UpdateCard