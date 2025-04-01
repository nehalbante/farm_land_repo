
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { uploadNote } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { FileUp, Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const uploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Please select a file")
    .transform((files) => files[0])
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 20MB"),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

interface UploadFormProps {
  onSuccess?: () => void;
}

export const UploadForm = ({ onSuccess }: UploadFormProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  
  const onSubmit = async (data: UploadFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload notes",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      await uploadNote(
        data.title,
        data.description || "",
        data.file,
        user.id
      );
      
      toast({
        title: "Note uploaded",
        description: "Your note has been uploaded successfully",
      });
      
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error uploading note:", error);
      toast({
        title: "Error uploading note",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter note title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter note description" 
                  {...field} 
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files)}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                Upload PDF, Word, or other document files (max 20MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Note
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
