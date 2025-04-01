
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/NoteCard";
import { getUserNotes } from "@/lib/api";
import { NoteWithDetails } from "@/types";
import { LogOut, Upload, User } from "lucide-react";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    const fetchUserNotes = async () => {
      try {
        setIsLoading(true);
        const fetchedNotes = await getUserNotes(user.id);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching user notes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserNotes();
  }, [user, navigate]);
  
  const handleNoteDelete = () => {
    // Refetch notes after deletion
    if (user) {
      getUserNotes(user.id).then(setNotes);
    }
  };
  
  if (!user) return null;
  
  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            My Profile
          </h1>
          <p className="text-gray-500">
            {user.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Note
          </Button>
          <Button 
            variant="outline" 
            onClick={() => signOut()}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Notes</CardTitle>
          <CardDescription>
            Notes you've uploaded to the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading your notes...</p>
            </div>
          ) : notes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {notes.map((note) => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onDelete={handleNoteDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't uploaded any notes yet</p>
              <Button onClick={() => navigate("/upload")}>Upload Your First Note</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
