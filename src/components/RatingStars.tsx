
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserRating, rateNote } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface RatingStarsProps {
  noteId: string;
  averageRating: number | null;
  ratingsCount: number;
  interactive?: boolean;
  className?: string;
  onRatingChange?: () => void;
}

export const RatingStars = ({
  noteId,
  averageRating,
  ratingsCount,
  interactive = false,
  className,
  onRatingChange,
}: RatingStarsProps) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const displayRating = hoveredRating ?? rating ?? averageRating ?? 0;

  useEffect(() => {
    if (user && interactive) {
      const fetchUserRating = async () => {
        try {
          const userRating = await getUserRating(noteId, user.id);
          setRating(userRating);
        } catch (error) {
          console.error("Error fetching user rating:", error);
        }
      };
      
      fetchUserRating();
    }
  }, [noteId, user, interactive]);

  const handleRating = async (newRating: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to rate notes",
        variant: "destructive",
      });
      return;
    }

    if (!interactive) return;

    try {
      setIsLoading(true);
      await rateNote(noteId, user.id, newRating);
      setRating(newRating);
      
      if (onRatingChange) {
        onRatingChange();
      }
      
      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error("Error rating note:", error);
      toast({
        title: "Error submitting rating",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-5 w-5 cursor-default transition-colors",
              {
                "fill-yellow-400 text-yellow-400": star <= displayRating,
                "text-gray-300": star > displayRating,
                "cursor-pointer": interactive && !isLoading,
              }
            )}
            onClick={() => {
              if (interactive && !isLoading) handleRating(star);
            }}
            onMouseEnter={() => {
              if (interactive && !isLoading) setHoveredRating(star);
            }}
            onMouseLeave={() => {
              if (interactive && !isLoading) setHoveredRating(null);
            }}
          />
        ))}
      </div>
      <span className="mt-1 text-xs text-gray-500">
        {interactive 
          ? rating 
            ? "Your rating" 
            : "Rate this note"
          : ratingsCount > 0 
            ? `${averageRating?.toFixed(1)} (${ratingsCount} ${ratingsCount === 1 ? "rating" : "ratings"})` 
            : "No ratings yet"}
      </span>
    </div>
  );
};
