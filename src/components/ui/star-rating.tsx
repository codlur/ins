import * as React from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  ({ rating, maxRating = 5, size = "md" }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6"
    }

    return (
      <div ref={ref} className="flex items-center">
        <div className="flex">
          {[...Array(maxRating)].map((_, i) => (
            <Star
              key={i}
              className={`${sizeClasses[size]} ${
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }
)

StarRating.displayName = "StarRating"

export { StarRating }