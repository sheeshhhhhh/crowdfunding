import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuthContext } from '@/context/AuthContext'
import { Link } from '@tanstack/react-router'
import { MapPin, MessageCircleCode } from 'lucide-react'

type ProfileHeaderProps = {
    id: string,
    name: string,
    profile: string,
    location?: string,
    bio?: string,
    stats: {
        campaigns: number,
        raised: number,
        donors: number,
    }
}

const ProfileHeader = ({
    id,
    name,
    profile,
    location,
    bio,
    stats
}: ProfileHeaderProps) => {
    const { user } = useAuthContext()

    const isOwner = user?.id === id

    return (
        <Card className="mb-8">
            <CardContent className="px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar className='w-32 h-32'>
                    <AvatarImage src={profile} />
                    <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    {
                    isOwner ? 
                        <Link to="/settings">
                            <Button className="mt-2 sm:mt-0" variant="outline">
                                Edit Profile
                            </Button>
                        </Link>
                    :
                        <Link>
                            {/* should redirect to message if we create messaging feature */}
                            <Button className="mt-2 sm:mt-0" variant="outline">
                                <MessageCircleCode className="mr-2 h-4 w-4" />
                                Message
                            </Button>
                        </Link>
                    }
                </div>
                <p className="text-gray-600 mb-2 flex items-center justify-center sm:justify-start">
                    <MapPin className="h-4 w-4 mr-1" />
                    {location ? location : 'No Location'}
                </p>
                <p className="text-gray-600 mb-4">Passionate fundraiser | Making a difference</p>
                {bio && 
                    <p className="text-sm mb-4">
                        {bio}
                    </p>
                }
                <div className="flex flex-wrap justify-center sm:justify-start gap-6">
                    <div>
                        <span className="font-semibold text-lg">{stats.campaigns}</span> Campaigns
                    </div>
                    <div>
                        <span className="font-semibold text-lg">${stats.raised}</span> Raised
                    </div>
                    <div>
                        <span className="font-semibold text-lg">{stats.donors}</span> Supporters
                    </div>
                </div>
                </div>
            </div>
            </CardContent>
        </Card>
    )
}

export default ProfileHeader