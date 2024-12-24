import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import useDebounce from '@/hooks/useDebounce'
import axiosFetch from '@/lib/axios'
import { CampaignPost } from '@/types/campaign'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { differenceInCalendarDays } from 'date-fns'
import { Filter, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type searchParams = {
  page: number,
  search: string,
  filter: string // categories
}

export const Route = createFileRoute('/campaigns/browse')({
  component: RouteComponent,
  validateSearch: (search: Record<string, any>): searchParams => {
    return {
      page: Number(search?.page ?? 1), // pagination
      search: search?.search ?? '',    // search
      filter: search?.filter ?? ''     // filter
    }
  }
})

function SearchInput() {
    const [searchInput, setSearchInput] = useState('')
    const [filter, setFilter] = useState('')
    const debounceValue = useDebounce(searchInput, 500)
    const navigate = useNavigate({ from: '/campaigns/browse' })

    useEffect(() => {
        navigate({
            search: prev => ({
                ...prev,
                search: debounceValue
            })
        })
    }, [debounceValue])

    useEffect(() => {
        navigate({
            search: prev => ({
                ...prev,
                filter: filter
            })
        })
    }, [filter])

    return (
        <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search campaigns"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-8"
                />
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-80'>
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Categories</h4>
                        {["Environment", "Health", "Education", "Technology"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                            id={category}
                            checked={category === filter}
                            onCheckedChange={() => setFilter(category)}
                            />
                            <Label htmlFor={category}>{category}</Label>
                        </div>
                        ))}
                    </div>
                    {/* <div className="space-y-2">
                        <h4 className="font-medium leading-none">Minimum Progress</h4>
                        <Slider
                        min={0}
                        max={100}
                        step={10}
                        value={[progressFilter]}
                        onValueChange={(value) => setProgressFilter(value[0])}
                        />
                        <div className="text-right text-sm text-muted-foreground">
                        {progressFilter}% or more
                        </div>
                    </div> */}
                    {/* <Button onClick={clearFilters} variant="outline" className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button> */}
                </div>
                </PopoverContent>
            </Popover>
      </div>
    )
}

function RouteComponent() {
    const search =Route.useSearch() 

    const { data: campaigns } = useQuery({
        queryKey: ['campaigns', search.search],
        queryFn: async () => {
            const response = await axiosFetch.get('/campaign/browse-campaigns?search=' + search.search)

            return response.data as CampaignPost[]
        },
        refetchOnWindowFocus: false
    })

    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Crowdfunding Campaigns</h1>
          <Link to='/campaigns/create'>
            <Button>Create Campaign</Button>
          </Link>
        </div>

        <SearchInput />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns?.map((campaign) => (
            <Link to={`/campaigns/${campaign.id}`} key={campaign.id}>
              <Card key={campaign.id} className="flex flex-col ">
                <img src={campaign.headerImage} alt={campaign.title} className="h-48 w-full object-cover rounded-t-lg" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{campaign.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        by {campaign.user.username}
                      </CardDescription>
                    </div>
                    {/* <Badge>{campaign.category}</Badge> */}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Progress value={(campaign.current / campaign.goal) * 100} className="mb-2" />
                  <div className="flex justify-between text-sm font-medium">
                    <span>${campaign.current.toLocaleString()} raised</span>
                    <span>{((campaign.current / campaign.goal) * 100).toFixed(0)}%</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{campaign.totalDonors} backers</span>
                    <span>•</span>
                    { 
                      campaign.endDate ? 
                      <span>{differenceInCalendarDays(new Date(campaign.endDate), new Date())} days left</span> :
                      <span>No EndDate</span>
                    }
                  </div>
                  <Button>Donate Now</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    )
}
