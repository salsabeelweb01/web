import { Project } from "@/lib/api";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedDouble, Maximize, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, isRTL } = useLanguage();
  return (
    <Link 
      href={`/projects/${project.id}`} 
      className="block h-full no-underline"
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-card cursor-pointer hover:border-primary/50 hover:scale-[1.02]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge 
              variant={project.status === "Ready to Move" ? "default" : "secondary"}
              className="shadow-sm backdrop-blur-sm bg-background/90 text-foreground font-medium"
            >
              {project.status === "Ready to Move" 
                ? t.projectDetails.statusValues.readyToMove 
                : project.status === "Under Construction"
                ? t.projectDetails.statusValues.underConstruction
                : project.status === "Coming Soon"
                ? t.projectDetails.statusValues.comingSoon
                : project.status}
            </Badge>
            <Badge className="bg-primary/90 text-primary-foreground shadow-sm backdrop-blur-sm">
              {project.type === "rent" ? t.projects.forRent : t.projects.forSale}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
            <p className="text-white font-bold text-xl drop-shadow-md">{project.startingPrice}</p>
          </div>
        </div>

        <CardContent className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-heading font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span className="line-clamp-1">{project.location}</span>
              </div>
            </div>
          </div>

          <div className={cn(
            "grid grid-cols-2 gap-4 mt-6 py-4 border-t border-border/50",
            isRTL && "text-right"
          )}>
            <div className={cn(
              "flex items-center gap-2 text-sm text-muted-foreground",
              isRTL && "flex-row-reverse"
            )}>
              <BedDouble className="h-4 w-4 text-primary/70" />
              <span>{project.bedrooms} {t.projects.beds}</span>
            </div>
            <div className={cn(
              "flex items-center gap-2 text-sm text-muted-foreground",
              isRTL && "flex-row-reverse"
            )}>
              <Maximize className="h-4 w-4 text-primary/70" />
              <span>{project.sizeSqft} {t.projects.sqft}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button className={cn(
            "w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors pointer-events-none",
            isRTL && "flex-row-reverse"
          )} variant="outline">
            {t.projects.viewDetails}
            <ArrowRight className={cn(
              "h-4 w-4 group-hover:translate-x-1 transition-transform",
              isRTL ? "mr-2 group-hover:-translate-x-1" : "ml-2"
            )} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
