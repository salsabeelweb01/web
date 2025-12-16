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
import { useToast } from "@/hooks/use-toast";
import { useState, FormEvent } from "react";
import { Plus, Trash2, Upload, Lock } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([""]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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
        sessionStorage.setItem('adminAuth', 'true');
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const filteredImages = images.filter(img => img.trim() !== "");
    const filteredFeatures = features.filter(f => f.trim() !== "");

    if (filteredImages.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one image URL",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          location: formData.get('location'),
          status: formData.get('status'),
          type: formData.get('type'),
          startingPrice: formData.get('startingPrice'),
          bedrooms: formData.get('bedrooms'),
          sizeSqft: formData.get('sizeSqft'),
          description: formData.get('description'),
          propertyType: formData.get('propertyType'),
          images: filteredImages,
          features: filteredFeatures,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create property');
      }

      toast({
        title: "Success",
        description: "Property has been added successfully!",
      });
      
      e.currentTarget.reset();
      setImages([""]);
      setFeatures([""]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImageField = () => setImages([...images, ""]);
  const removeImageField = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };
  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
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
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Add New Property</h1>
          <p className="text-muted-foreground">
            Fill out the form below to add a new property listing to the website.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-card p-6 rounded-xl border border-border space-y-6">
              <h2 className="text-xl font-bold">Basic Information</h2>
              
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
                  <Select name="status" required>
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
                  <Select name="type" required>
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
                <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                  <Plus className="h-4 w-4 mr-2" /> Add Image
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter image URLs. The first image will be the main photo.
              </p>
              
              {images.map((img, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={img}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder={`Image URL ${index + 1}`}
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

            <Button 
              type="submit" 
              size="lg" 
              className="w-full" 
              disabled={isSubmitting}
              data-testid="button-submit-property"
            >
              {isSubmitting ? "Adding Property..." : "Add Property"}
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
