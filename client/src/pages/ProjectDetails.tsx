import Layout from "@/components/Layout";
import { getProjectById, submitViewingRequest } from "@/lib/api";
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
import { MapPin, BedDouble, Maximize, Check, Calendar, ArrowLeft, Shield, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, FormEvent, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function ProjectDetails() {
  const [, params] = useRoute("/projects/:id");
  const id = params ? parseInt(params.id) : 0;
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id),
    enabled: !!id
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Create combined images array (gallery + feature images)
  const allImages = project ? (() => {
    const galleryImages = project.images || [];
    const featureImages = (project.features || [])
      .filter(feature => {
        const isImageUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i.test(feature) || 
                          feature.startsWith('/') || 
                          feature.startsWith('attached_assets/');
        return isImageUrl && !galleryImages.includes(feature);
      });
    return [...galleryImages, ...featureImages];
  })() : [];

  // Reset selected image when ID changes
  useEffect(() => {
    setSelectedImage(null);
    setLightboxOpen(false);
    setLightboxIndex(0);
    setGalleryCurrentIndex(0);
  }, [id]);

  // Update selected image when project loads or changes
  useEffect(() => {
    if (project && !selectedImage && project.images.length > 0) {
      setSelectedImage(project.images[0]);
    }
  }, [project, selectedImage]);

  // Auto-scroll gallery carousel
  useEffect(() => {
    if (!project || project.images.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        setGalleryCurrentIndex((current) => {
          return (current + 1) % project.images.length;
        });
      }, 4000); // Change image every 4 seconds
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [project]);

  // Navigate lightbox
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (allImages.length === 0) return;
    setLightboxIndex((current) => {
      if (direction === 'next') {
        return (current + 1) % allImages.length;
      } else {
        return current === 0 ? allImages.length - 1 : current - 1;
      }
    });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'Escape') setLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project]);

  // Open lightbox with clicked image
  const openLightbox = (imageIndex: number) => {
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  // Open lightbox with a specific image URL (for feature images)
  const openLightboxWithImage = (imageUrl: string) => {
    const imageIndex = allImages.findIndex(img => img === imageUrl);
    if (imageIndex >= 0) {
      setLightboxIndex(imageIndex);
      setLightboxOpen(true);
    }
  };

  const handleScheduleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setIsSubmitting(true);
    try {
      await submitViewingRequest({
        projectId: id,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        preferredDate: formData.get('preferredDate') as string,
        message: formData.get('message') as string || undefined,
      });
      
      setIsDialogOpen(false);
      toast({
        title: t.projectDetails.requestSent,
        description: t.projectDetails.requestSentDescription,
      });
      
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: t.common.error,
        description: error instanceof Error ? error.message : t.common.error,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Layout><div className={cn("min-h-screen flex items-center justify-center", isRTL && "text-right")}>{t.projectDetails.loading}</div></Layout>;
  }

  if (!project) {
    return <Layout><div className={cn("min-h-screen flex items-center justify-center", isRTL && "text-right")}>{t.projectDetails.notFound}</div></Layout>;
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
        <div className={cn("absolute top-4 z-10", isRTL ? "right-4" : "left-4")}>
          <Link href="/projects">
            <Button variant="secondary" size="sm" className={cn("gap-2", isRTL && "flex-row-reverse")}>
              <ArrowLeft className={cn("h-4 w-4", isRTL && "rotate-180")} /> {t.projectDetails.backToProjects}
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

      {/* Lightbox Modal */}
      {lightboxOpen && allImages.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative max-w-7xl max-h-[90vh] w-full mx-4 flex items-center">
            {/* Previous Button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className="absolute left-4 z-50 text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black/50 hover:bg-black/70"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Main Image */}
            <div 
              className="flex-1 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[lightboxIndex]}
                alt={`${project?.name || 'Property'} - Image ${lightboxIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className="absolute right-4 z-50 text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black/50 hover:bg-black/70"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>

          {/* Image Counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
              {lightboxIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Thumbnail Strip in Lightbox */}
          {allImages.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                    lightboxIndex === idx ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="container mx-auto px-4 py-8 -mt-10 relative z-10">
        <div className="bg-background rounded-xl shadow-xl border border-border/50 overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <div className={cn("flex gap-2 mb-4", isRTL && "flex-row-reverse")}>
                   <Badge variant="secondary">{project.status}</Badge>
                   <Badge className="bg-primary text-primary-foreground">{project.type === "rent" ? t.projectDetails.forRent : t.projectDetails.forSale}</Badge>
                </div>
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-2">{project.name}</h1>
                <div className={cn("flex items-center text-muted-foreground text-lg", isRTL && "flex-row-reverse")}>
                  <MapPin className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                  {project.location}
                </div>
              </div>
              <div className={cn("text-right", isRTL && "text-left")}>
                <div className="text-3xl font-bold text-primary mb-2">{project.startingPrice}</div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full md:w-auto text-lg px-8">
                      {t.projectDetails.scheduleViewing}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={cn("sm:max-w-[425px]", isRTL && "text-right")}>
                    <DialogHeader>
                      <DialogTitle>{t.projectDetails.scheduleViewingTitle}</DialogTitle>
                      <DialogDescription>
                        {t.projectDetails.scheduleViewingDescription} {project.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleScheduleSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input 
                          name="firstName"
                          placeholder={t.projectDetails.firstName} 
                          required 
                          data-testid="input-viewing-first-name"
                        />
                        <Input 
                          name="lastName"
                          placeholder={t.projectDetails.lastName} 
                          required 
                          data-testid="input-viewing-last-name"
                        />
                      </div>
                      <Input 
                        name="email"
                        type="email" 
                        placeholder={t.projectDetails.email} 
                        required 
                        data-testid="input-viewing-email"
                      />
                      <Input 
                        name="phone"
                        type="tel" 
                        placeholder={t.projectDetails.phone} 
                        required 
                        data-testid="input-viewing-phone"
                      />
                      <div className="space-y-2">
                         <label className="text-sm font-medium">{t.projectDetails.preferredDate}</label>
                         <Input 
                           name="preferredDate"
                           type="date" 
                           required 
                           data-testid="input-viewing-date"
                         />
                      </div>
                      <Textarea 
                        name="message"
                        placeholder={t.projectDetails.questionsPlaceholder} 
                        data-testid="input-viewing-message"
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                        data-testid="button-submit-viewing"
                      >
                        {isSubmitting ? t.projectDetails.sending : t.projectDetails.requestAppointment}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-10">
              {/* Key Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-secondary/30 rounded-lg">
                <div className={cn("text-center border-r border-border last:border-0", isRTL && "border-l border-r-0 first:border-l-0 last:border-l")}>
                  <BedDouble className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold">{project.bedrooms}</div>
                  <div className="text-xs uppercase text-muted-foreground">{t.projectDetails.bedrooms}</div>
                </div>
                <div className={cn("text-center border-r border-border last:border-0", isRTL && "border-l border-r-0 first:border-l-0 last:border-l")}>
                  <Maximize className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold">{project.sizeSqft}</div>
                  <div className="text-xs uppercase text-muted-foreground">{t.projectDetails.sqft}</div>
                </div>
                <div className={cn("text-center border-r border-border last:border-0", isRTL && "border-l border-r-0 first:border-l-0 last:border-l")}>
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold">2024</div>
                  <div className="text-xs uppercase text-muted-foreground">{t.projectDetails.built}</div>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold">{t.projectDetails.verified}</div>
                  <div className="text-xs uppercase text-muted-foreground">{t.projectDetails.status}</div>
                </div>
              </div>

              {/* Description */}
              <div className={cn(isRTL && "text-right")}>
                <h3 className="text-2xl font-heading font-bold mb-4">{t.projectDetails.aboutProperty}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Experience the epitome of luxury living with Salsabeel Real Estate. This project offers a perfect blend of comfort, style, and convenience, designed to meet the highest standards of modern living in Ajman.
                </p>
              </div>

              {/* Gallery with Auto-loop */}
              <div className={cn(isRTL && "text-right")}>
                <h3 className="text-2xl font-heading font-bold mb-6">{t.projectDetails.gallery}</h3>
                
                {/* Main Gallery Image with Auto-loop */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-black group">
                  <img
                    src={project.images[galleryCurrentIndex]}
                    alt={`${project.name} - Image ${galleryCurrentIndex + 1}`}
                    className="w-full h-full object-cover cursor-pointer transition-opacity duration-500"
                    onClick={() => openLightbox(galleryCurrentIndex)}
                  />
                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGalleryCurrentIndex((current) => 
                            current === 0 ? project.images.length - 1 : current - 1
                          );
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setGalleryCurrentIndex((current) => 
                            (current + 1) % project.images.length
                          );
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {/* Image Counter */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                      {galleryCurrentIndex + 1} / {project.images.length}
                    </div>
                  )}
                </div>

                {/* Horizontal Thumbnail Strip */}
                <div 
                  ref={galleryCarouselRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setGalleryCurrentIndex(idx);
                        // Scroll thumbnail into view
                        const thumb = galleryCarouselRef.current?.children[idx] as HTMLElement;
                        if (thumb) {
                          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                      }}
                      className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                        galleryCurrentIndex === idx ? "ring-2 ring-primary scale-110" : "opacity-70 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className={cn(isRTL && "text-right")}>
                <h3 className="text-2xl font-heading font-bold mb-6">{t.projectDetails.features}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => {
                    // Check if feature is a URL (image)
                    const isImageUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i.test(feature) || 
                                      feature.startsWith('/') || 
                                      feature.startsWith('attached_assets/');
                    
                      if (isImageUrl) {
                        return (
                          <div 
                            key={idx} 
                            className="relative aspect-video rounded-lg overflow-hidden bg-secondary/20 group cursor-pointer"
                            onClick={() => openLightboxWithImage(feature)}
                          >
                            <img 
                              src={feature} 
                              alt={`Feature ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          </div>
                        );
                      }
                    
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location Map */}
              <div className={cn(isRTL && "text-right")}>
                <h3 className="text-2xl font-heading font-bold mb-6">{t.projectDetails.location}</h3>
                <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(project.name + ', ' + project.location)}&output=embed&t=k&z=17&markers=${encodeURIComponent(project.location)}`}
                    title={`Satellite view of ${project.location}`}
                  />
                </div>
                <p className="mt-4 text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
