import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const BrowseSkeleton = () => {


  return (
    <>
      {[...Array(6)].map(() => (
      <Card className="flex flex-col">
        <Skeleton className="h-48 w-full object-cover rounded-t-lg" />
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="w-full max-w-[369.61px]">
              <Skeleton className="h-14 w-full " />
              <Skeleton className='h-5 mt-1 w-full' />
            </div>
            <Skeleton className="h-[22px] my-1 ml-1 w-[76.39px] rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <Skeleton className="h-4 w-full flex-1 rounded-full" />
          <div className="flex justify-between text-sm font-medium mt-1">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Skeleton className="h-4 w-[100px]" />
            <span>•</span>
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <Skeleton className="h-8 w-[113.94px] rounded-md" />
        </CardFooter>
      </Card>
      ))}
    </>
  )
}

export default BrowseSkeleton