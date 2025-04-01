
import { supabase } from "@/integrations/supabase/client";
import { Note, NoteWithDetails, Rating } from "@/types";
import { Database } from "@/integrations/supabase/types";

export async function fetchNotes(searchQuery?: string): Promise<NoteWithDetails[]> {
  let query = supabase
    .from("notes")
    .select(`
      *,
      profile: profiles(username, avatar_url),
      ratings(rating)
    `)
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }

  return (data || []).map((note: any) => {
    const ratings = note.ratings || [];
    const ratingsSum = ratings.reduce((sum: number, r: any) => sum + r.rating, 0);
    const averageRating = ratings.length > 0 ? ratingsSum / ratings.length : null;

    return {
      ...note,
      profile: note.profile || { username: "Unknown User" },
      average_rating: averageRating,
      ratings_count: ratings.length,
    };
  });
}

export async function getUserRating(noteId: string, userId: string): Promise<number | null> {
  const { data, error } = await supabase
    .from("ratings")
    .select("rating")
    .eq("note_id", noteId)
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No rating found
    }
    console.error("Error fetching user rating:", error);
    throw error;
  }

  return data?.rating || null;
}

export async function rateNote(
  noteId: string,
  userId: string,
  rating: number
): Promise<void> {
  const existingRating = await getUserRating(noteId, userId);
  
  if (existingRating) {
    // Update existing rating
    const { error } = await supabase
      .from("ratings")
      .update({ rating })
      .eq("note_id", noteId)
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating rating:", error);
      throw error;
    }
  } else {
    // Insert new rating
    const { error } = await supabase
      .from("ratings")
      .insert({
        note_id: noteId,
        user_id: userId,
        rating,
      });

    if (error) {
      console.error("Error inserting rating:", error);
      throw error;
    }
  }
}

export async function uploadNote(
  title: string,
  description: string,
  file: File,
  userId: string
): Promise<void> {
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `${userId}/${fileName}`;

  // 1. Upload the file to storage
  const { error: uploadError, data } = await supabase.storage
    .from("notes")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    throw uploadError;
  }

  // Get the public URL of the uploaded file
  const fileUrl = getFileUrl(filePath);
  
  // Determine file type and size
  const fileType = file.type || 'unknown';
  const fileSize = formatFileSize(file.size);

  // 2. Insert the note record
  const { error: insertError } = await supabase
    .from("notes")
    .insert({
      title,
      description,
      file_url: fileUrl,
      file_type: fileType,
      file_size: fileSize,
      file_name: file.name,
      uploader_id: userId,
    });

  if (insertError) {
    // Attempt to clean up the file if the record insertion fails
    await supabase.storage.from("notes").remove([filePath]);
    console.error("Error creating note record:", insertError);
    throw insertError;
  }
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export async function deleteNote(note: Note): Promise<void> {
  // 1. Delete the file from storage
  const { error: storageError } = await supabase.storage
    .from("notes")
    .remove([note.file_path]);

  if (storageError) {
    console.error("Error deleting file:", storageError);
    throw storageError;
  }

  // 2. Delete the note record (will cascade delete ratings)
  const { error: dbError } = await supabase
    .from("notes")
    .delete()
    .eq("id", note.id);

  if (dbError) {
    console.error("Error deleting note record:", dbError);
    throw dbError;
  }
}

export function getFileUrl(filePath: string): string {
  const { data } = supabase.storage.from("notes").getPublicUrl(filePath);
  return data.publicUrl;
}

export async function getUserNotes(userId: string): Promise<NoteWithDetails[]> {
  const { data, error } = await supabase
    .from("notes")
    .select(`
      *,
      profile: profiles(username, avatar_url),
      ratings(rating)
    `)
    .eq("uploader_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user notes:", error);
    throw error;
  }

  return (data || []).map((note: any) => {
    const ratings = note.ratings || [];
    const ratingsSum = ratings.reduce((sum: number, r: any) => sum + r.rating, 0);
    const averageRating = ratings.length > 0 ? ratingsSum / ratings.length : null;

    return {
      ...note,
      profile: note.profile || { username: "Unknown User" },
      average_rating: averageRating,
      ratings_count: ratings.length,
    };
  });
}
