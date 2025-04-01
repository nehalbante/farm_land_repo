
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { UploadForm } from "@/components/UploadForm";
import { ArrowLeft } from "lucide-react";

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);
  
  const handleUploadSuccess = () => {
    navigate("/profile");
  };
  
  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Upload Note</h1>
        <p className="text-gray-500">
          Share your notes with other users
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Note Details</CardTitle>
          <CardDescription>
            Fill in the details for your note
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadForm onSuccess={handleUploadSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
