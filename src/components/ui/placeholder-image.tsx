import * as React from "react"
import { cn } from "@/lib/utils"

interface PlaceholderImageProps extends React.ImgHTMLAttributes<HTMLDivElement> {
  text?: string
}

const PlaceholderImage = React.forwardRef<HTMLDivElement, PlaceholderImageProps>(
  ({ className, text = "Image", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center bg-muted rounded-lg",
          className
        )}
        {...props}
      >
        <span className="text-muted-foreground text-sm">{text}</span>
      </div>
    )
  }
)

PlaceholderImage.displayName = "PlaceholderImage"

export { PlaceholderImage }