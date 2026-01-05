import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useToast } from "@/hooks/use-toast";
import { useState, FormEvent, useEffect, useRef, useCallback } from "react";
import { Plus, Trash2, Upload, Lock, Building, X, Image as ImageIcon, Edit2 } from "lucide-react";
import { Project, getProjects } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface ImageFile {
  file?: File;
  url: string;
  preview?: string;
  isUploaded: boolean;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([{ url: "", isUploaded: false }]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<string>("");
  const [formType, setFormType] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: existingProjects, refetch } = useQuery({
    queryKey: ['adminProjects'],
    queryFn: () => getProjects(),
    enabled: isAuthenticated,
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        toast({
          title: "Access Denied",
          description: "Incorrect password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify password",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      toast({
        title: "Success",
        description: "Property has been deleted",
      });
      
      refetch();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['featuredProjects'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Handle file upload
  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    const previewUrls: string[] = [];
    
    try {
      // Create preview URLs for immediate display
      const previewImages: ImageFile[] = fileArray.map((file) => {
        const preview = URL.createObjectURL(file);
        previewUrls.push(preview);
        return {
          file,
          url: "",
          preview,
          isUploaded: false,
        };
      });

      // Add preview images immediately
      setImages((prev) => {
        const filtered = prev.filter((img) => img.url.trim() !== "");
        return [...filtered, ...previewImages];
      });

      const formData = new FormData();
      fileArray.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/upload/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        // Clean up preview URLs and remove preview images on error
        previewUrls.forEach(url => URL.revokeObjectURL(url));
        setImages((prev) => prev.filter((img) => !previewUrls.includes(img.preview || "")));
        throw new Error(error.error || "Failed to upload images");
      }

      const data = await response.json();
      
      // Update preview images with actual URLs
      setImages((prev) => {
        return prev.map((img, idx) => {
          const previewIndex = previewUrls.indexOf(img.preview || "");
          if (previewIndex !== -1 && data.images[previewIndex]) {
            // Clean up preview URL
            if (img.preview) {
              URL.revokeObjectURL(img.preview);
            }
            return {
              url: data.images[previewIndex],
              isUploaded: true,
            };
          }
          return img;
        });
      });

      toast({
        title: "Success",
        description: `${data.images.length} image(s) uploaded successfully!`,
      });
    } catch (error) {
      // Clean up any remaining preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };

  // Handle URL input (for manual URL entry)
  const updateImageUrl = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = { url: value, isUploaded: false };
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, { url: "", isUploaded: false }]);
  };

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const loadProjectForEdit = (project: Project) => {
    setEditingId(project.id);
    setFormStatus(project.status);
    setFormType(project.type);
    setImages(project.images.map(url => ({ url, isUploaded: true })));
    setFeatures(project.features.length > 0 ? project.features : [""]);
    
    // Fill form fields
    if (formRef.current) {
      const form = formRef.current;
      (form.querySelector('[name="name"]') as HTMLInputElement).value = project.name;
      (form.querySelector('[name="location"]') as HTMLInputElement).value = project.location;
      (form.querySelector('[name="startingPrice"]') as HTMLInputElement).value = project.startingPrice;
      (form.querySelector('[name="bedrooms"]') as HTMLInputElement).value = project.bedrooms;
      (form.querySelector('[name="sizeSqft"]') as HTMLInputElement).value = project.sizeSqft;
      (form.querySelector('[name="propertyType"]') as HTMLInputElement).value = project.propertyType;
      (form.querySelector('[name="description"]') as HTMLTextAreaElement).value = project.description;
    }
    
    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormStatus("");
    setFormType("");
    setImages([{ url: "", isUploaded: false }]);
    setFeatures([""]);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const filteredImages = images
      .filter(img => img.url.trim() !== "")
      .map(img => img.url);
    const filteredFeatures = features.filter(f => f.trim() !== "");

    if (filteredImages.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one image",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Get all form values - Select components are controlled, so use state
      const formValues = {
        name: formData.get('name') as string,
        location: formData.get('location') as string,
        status: formStatus || formData.get('status') as string,
        type: formType || formData.get('type') as string,
        startingPrice: formData.get('startingPrice') as string,
        bedrooms: formData.get('bedrooms') as string,
        sizeSqft: formData.get('sizeSqft') as string,
        description: formData.get('description') as string,
        propertyType: formData.get('propertyType') as string,
        images: filteredImages,
        features: filteredFeatures,
      };

      // Validate required fields
      const missingFields: string[] = [];
      if (!formValues.name?.trim()) missingFields.push('Property Name');
      if (!formValues.location?.trim()) missingFields.push('Location');
      if (!formValues.status?.trim()) missingFields.push('Status');
      if (!formValues.type?.trim()) missingFields.push('Type');
      if (!formValues.startingPrice?.trim()) missingFields.push('Starting Price');
      if (!formValues.bedrooms?.trim()) missingFields.push('Bedrooms');
      if (!formValues.sizeSqft?.trim()) missingFields.push('Size (sqft)');
      if (!formValues.description?.trim()) missingFields.push('Description');
      if (!formValues.propertyType?.trim()) missingFields.push('Property Type');

      if (missingFields.length > 0) {
        toast({
          title: "Validation Error",
          description: `Please fill in: ${missingFields.join(', ')}`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const isEditing = editingId !== null;
      const url = isEditing ? `/api/projects/${editingId}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      console.log(`${isEditing ? 'Updating' : 'Creating'} project:`, formValues);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Provide more detailed error message
        let errorMessage = errorData.error || `Failed to ${isEditing ? 'update' : 'create'} property`;
        if (errorData.message) {
          errorMessage += `: ${errorData.message}`;
        }
        if (errorData.details && Array.isArray(errorData.details)) {
          const fieldErrors = errorData.details.map((d: any) => `${d.field}: ${d.message}`).join(', ');
          errorMessage += ` (${fieldErrors})`;
        }
        throw new Error(errorMessage);
      }

      toast({
        title: "Success",
        description: `Property has been ${isEditing ? 'updated' : 'added'} successfully!`,
      });
      
      // Reset form using ref
      if (formRef.current) {
        formRef.current.reset();
      }
      setImages([{ url: "", isUploaded: false }]);
      setFeatures([""]);
      setFormStatus("");
      setFormType("");
      setEditingId(null);
      refetch();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['featuredProjects'] });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${editingId ? 'update' : 'add'} property`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeatureField = () => setFeatures([...features, ""]);
  const removeFeatureField = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="min-h-[70vh] flex items-center justify-center bg-background">
          <div className="w-full max-w-md p-8">
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-heading font-bold mb-2">Admin Access</h1>
              <p className="text-muted-foreground mb-6">
                Enter your password to access the admin panel
              </p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  data-testid="input-admin-password"
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isAuthenticating}
                  data-testid="button-admin-login"
                >
                  {isAuthenticating ? "Verifying..." : "Access Admin Panel"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <Badge className="bg-primary/90 text-primary-foreground mb-4">Admin</Badge>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Property Management</h1>
          <p className="text-muted-foreground">
            Add new properties or manage existing listings.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Existing Properties */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-xl border border-border sticky top-20">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Existing Properties ({existingProjects?.length || 0})
                </h2>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {existingProjects?.map((project) => (
                    <div 
                      key={project.id} 
                      className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{project.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{project.location}</p>
                      </div>
                      <div className="flex gap-1 shrink-0 ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => loadProjectForEdit(project)}
                          title="Edit property"
                        >
                          <Edit2 className="h-4 w-4 text-primary" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              disabled={deletingId === project.id}
                              title="Delete property"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Property</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{project.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(project.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                  
                  {existingProjects?.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No properties yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Add/Edit Property Form */}
            <div className="lg:col-span-2">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-card p-6 rounded-xl border border-border space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                      {editingId ? "Edit Property" : "Add New Property"}
                    </h2>
                    {editingId && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={cancelEdit}
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Property Name *</label>
                      <Input 
                        name="name" 
                        placeholder="e.g., Salsabeel Golf View" 
                        required 
                        data-testid="input-property-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location *</label>
                      <Input 
                        name="location" 
                        placeholder="e.g., Al Zorah, Ajman" 
                        required 
                        data-testid="input-property-location"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status *</label>
                      <Select name="status" required value={formStatus} onValueChange={setFormStatus}>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                          <SelectItem value="Under Construction">Under Construction</SelectItem>
                          <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type *</label>
                      <Select name="type" required value={formType} onValueChange={setFormType}>
                        <SelectTrigger data-testid="select-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Starting Price *</label>
                      <Input 
                        name="startingPrice" 
                        placeholder="e.g., AED 500,000" 
                        required 
                        data-testid="input-price"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bedrooms *</label>
                      <Input 
                        name="bedrooms" 
                        placeholder="e.g., 1-2" 
                        required 
                        data-testid="input-bedrooms"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Size (sqft) *</label>
                      <Input 
                        name="sizeSqft" 
                        placeholder="e.g., 800 - 1200" 
                        required 
                        data-testid="input-size"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type *</label>
                    <Input 
                      name="propertyType" 
                      placeholder="e.g., Apartments & Townhouses" 
                      required 
                      data-testid="input-property-type"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description *</label>
                    <Textarea 
                      name="description" 
                      placeholder="Describe the property..." 
                      className="min-h-[120px]" 
                      required 
                      data-testid="input-description"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="bg-card p-6 rounded-xl border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Images</h2>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        <Upload className="h-4 w-4 mr-2" /> 
                        {isUploading ? "Uploading..." : "Upload Files"}
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                        <Plus className="h-4 w-4 mr-2" /> Add URL
                      </Button>
                    </div>
                  </div>
                  
                  {/* Drag and Drop Zone */}
                  <div
                    ref={dropZoneRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-2">
                      Drag & drop images here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: JPG, PNG, GIF, WEBP (Max 10MB per image)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>

                  {/* Image Preview Grid */}
                  {images.some(img => img.url.trim() !== "") && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((img, index) => {
                        if (!img.url.trim()) return null;
                        return (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border border-border bg-secondary">
                              {img.preview || img.url ? (
                                <img
                                  src={img.preview || img.url}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder-image.png";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImageField(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            {img.isUploaded && (
                              <Badge className="absolute top-2 left-2" variant="secondary">
                                Uploaded
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* URL Input Fields (for manual URL entry) */}
                  {images.map((img, index) => (
                    <div key={`url-${index}`} className="flex gap-2">
                      <Input 
                        value={img.url}
                        onChange={(e) => updateImageUrl(index, e.target.value)}
                        placeholder={`Image URL ${index + 1} (or upload above)`}
                        data-testid={`input-image-${index}`}
                      />
                      {images.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeImageField(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <p className="text-xs text-muted-foreground">
                    💡 Tip: Drag & drop images or upload files. You can also enter image URLs manually. The first image will be the main photo.
                  </p>
                </div>

                {/* Features */}
                <div className="bg-card p-6 rounded-xl border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Features</h2>
                    <Button type="button" variant="outline" size="sm" onClick={addFeatureField}>
                      <Plus className="h-4 w-4 mr-2" /> Add Feature
                    </Button>
                  </div>
                  
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1} (e.g., Swimming Pool)`}
                        data-testid={`input-feature-${index}`}
                      />
                      {features.length > 1 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFeatureField(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  {editingId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={cancelEdit}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className={editingId ? "flex-1" : "w-full"} 
                    disabled={isSubmitting}
                    data-testid="button-submit-property"
                  >
                    {isSubmitting 
                      ? (editingId ? "Updating Property..." : "Adding Property...") 
                      : (editingId ? "Update Property" : "Add Property")}
                    <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
