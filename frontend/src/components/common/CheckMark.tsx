import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type CheckMarkProps = {
    className?: string,
    backgroundColor?: string,
    checkColor?: string,
} & ComponentProps<'svg'>

const CheckMark = ({
    className,
    backgroundColor="#07b481",
    checkColor="#FFFFFF",
    ...props
}: CheckMarkProps) => {

    return (
      <div>
        <svg className={cn('', className)} {...props} width="115px" height="115px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <circle id="filled-circle" fill={backgroundColor} cx="66.5" cy="66.5" r="54.5" />
                <circle id="white-circle" fill={checkColor} cx="66.5" cy="66.5" r="55.5" />
                <circle id="outline" stroke={backgroundColor} stroke-width="4" cx="66.5" cy="66.5" r="54.5" />
                <polyline id="check" stroke={checkColor} stroke-width="5.5" points="41 70 56 85 92 49" />
            </g>
        </svg>
      </div>
    )
}

export default CheckMark