
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadNote } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { FileUp, Loader2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MB

const uploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Please select a file")
    .transform((files) => files[0])
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 200MB"),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

interface UploadFormProps {
  onSuccess?: () => void;
}

export const UploadForm = ({ onSuccess }: UploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
    },
  });
  
  const onSubmit = async (data: UploadFormValues) => {
    try {
      setIsUploading(true);
      await uploadNote(
        data.title,
        "", // Empty description
        data.file,
        null // No user ID needed anymore
      );
      
      toast({
        title: "Note uploaded",
        description: "Your note has been uploaded successfully",
      });
      
      form.reset();
      setSelectedFile(null);
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

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      form.setValue("file", files);
    } else {
      setSelectedFile(null);
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
          name="file"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    onChange(e.target.files);
                    handleFileChange(e.target.files);
                  }}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedFile && (
          <Card className="bg-gray-50 mt-4">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
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
