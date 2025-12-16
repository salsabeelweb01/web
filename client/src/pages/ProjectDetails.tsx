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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import Untitled_design_15_1_1 from "@assets/Untitled-design-15-1-1.png";

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
      <div className="relative h-[60vh] bg-black">
        <img
          src={Untitled_design_15_1_1}
          alt={project.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute top-4 left-4 z-10">
          <Link href="/projects">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Projects
            </Button>
          </Link>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
                  {project.images.slice(1).map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {/* Fallback if only 1 image */}
                  {project.images.length === 1 && (
                     <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                       No additional images
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
