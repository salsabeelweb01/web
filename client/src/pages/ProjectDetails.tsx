import Layout from "@/components/Layout";
import { getProjectById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, BedDouble, Maximize, Check, Calendar, ArrowLeft, Shield } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProjectDetails() {
  const [, params] = useRoute("/projects/:id");
  const id = params ? parseInt(params.id) : 0;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id),
    enabled: !!id
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Reset selected image when ID changes
  useEffect(() => {
    setSelectedImage(null);
  }, [id]);

  // Update selected image when project loads or changes
  if (project && !selectedImage && project.images.length > 0) {
    setSelectedImage(project.images[0]);
  }

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      toast({
        title: "Request Sent",
        description: "An agent will contact you shortly to confirm your viewing.",
      });
    }, 1000);
  };

  if (isLoading) {
    return <Layout><div className="min-h-screen flex items-center justify-center">Loading...</div></Layout>;
  }

  if (!project) {
    return <Layout><div className="min-h-screen flex items-center justify-center">Project not found</div></Layout>;
  }

  return (
    <Layout>
      {/* Hero Gallery */}
      <div className="relative h-[60vh] bg-black group">
        <img
          src={selectedImage || project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover opacity-90 transition-all duration-500 ease-in-out"
        />
        <div className="absolute top-4 left-4 z-10">
          <Link href="/projects">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </div>
        
        {/* Gallery Strip Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 backdrop-blur-md rounded-full overflow-x-auto max-w-[90vw] z-20">
          {project.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedImage === img ? "ring-2 ring-primary scale-105" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 -mt-10 relative z-10">
        <div className="bg-background rounded-xl shadow-xl border border-border/50 overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <div className="flex gap-2 mb-4">
                   <Badge variant="secondary">{project.status}</Badge>
                   <Badge className="bg-primary text-primary-foreground">{project.type === "rent" ? "For Rent" : "For Sale"}</Badge>
                </div>
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-2">{project.name}</h1>
                <div className="flex items-center text-muted-foreground text-lg">
                  <MapPin className="h-5 w-5 mr-2" />
                  {project.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-2">{project.startingPrice}</div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full md:w-auto text-lg px-8">
                      Schedule Viewing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule a Viewing</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to request a tour of {project.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleScheduleSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="First Name" required />
                        <Input placeholder="Last Name" required />
                      </div>
                      <Input type="email" placeholder="Email" required />
                      <Input type="tel" placeholder="Phone" required />
                      <div className="space-y-2">
                         <label className="text-sm font-medium">Preferred Date</label>
                         <Input type="date" required />
                      </div>
                      <Textarea placeholder="Any specific questions or preferences?" />
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Request Appointment"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* Key Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-secondary/30 rounded-lg">
                  <div className="text-center border-r border-border last:border-0">
                    <BedDouble className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl font-bold">{project.bedrooms}</div>
                    <div className="text-xs uppercase text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center border-r border-border last:border-0">
                    <Maximize className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl font-bold">{project.sizeSqft}</div>
                    <div className="text-xs uppercase text-muted-foreground">Sq Ft</div>
                  </div>
                  <div className="text-center border-r border-border last:border-0">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl font-bold">2024</div>
                    <div className="text-xs uppercase text-muted-foreground">Built</div>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xl font-bold">Verified</div>
                    <div className="text-xs uppercase text-muted-foreground">Status</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">About this Property</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Experience the epitome of luxury living with Salsabeel Real Estate. This project offers a perfect blend of comfort, style, and convenience, designed to meet the highest standards of modern living in Ajman.
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-6">Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar / More Images */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Gallery</h3>
                <div className="grid gap-4">
                  {project.images.map((img, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        setSelectedImage(img);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedImage === img ? "ring-2 ring-primary" : "hover:opacity-90"
                      }`}
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
