import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Trash2 } from "lucide-react";
import { NoteWithDetails } from "@/types";
import { RatingStars } from "./RatingStars";
import { useAuth } from "@/context/AuthContext";
import { deleteNote } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NoteCardProps {
  note: NoteWithDetails;
  onDelete?: () => void;
  showRatingInteraction?: boolean;
}

export const NoteCard = ({ note, onDelete, showRatingInteraction = false }: NoteCardProps) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isOwner = user?.id === note.uploader_id;
  const fileUrl = note.file_url;
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = note.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDelete = async () => {
    if (!isOwner) return;
    
    try {
      setIsDeleting(true);
      await deleteNote(note);
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully",
      });
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error deleting note",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold line-clamp-1">{note.title}</CardTitle>
          {isOwner && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this note and any associated ratings.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {note.description && (
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{note.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="truncate max-w-[150px]">{note.file_name}</span>
          </div>
          <div>
            Uploaded by <span className="font-medium">{note.profile?.username || "Unknown User"}</span>
          </div>
          <div>
            {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <RatingStars 
          noteId={note.id}
          averageRating={note.average_rating}
          ratingsCount={note.ratings_count}
          interactive={showRatingInteraction}
        />
        <Button 
          onClick={handleDownload} 
          variant="default" 
          size="sm"
          className="gap-1"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};
