import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, Project } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star, Shield, Clock, CheckCircle2, Wallet, Banknote, Building, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { data: featuredProjects, isLoading } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: getFeaturedProjects
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="attached_assets/stock_images/modern_luxury_home_e_c3d2b0c4.jpg"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 animate-in slide-in-from-bottom-4 duration-700">
            You Will Get Your <br/> Future Home
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100 font-light">
            Luxury apartments in Ajman for investment and living. From Salsabeel Real Estate.
          </p>
          
          <div className="animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Featured Properties</h2>
              <p className="text-muted-foreground max-w-xl">
                Explore our hand-picked selection of premium properties available for sale and rent.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="hidden md:flex group mt-4 md:mt-0">
                View All Properties 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="w-full">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Why Choose Salsabeel</h2>
            <p className="text-muted-foreground">
              We are committed to delivering innovative and exceptional projects that meet our clients' needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Direct Developer</h3>
              <p className="text-muted-foreground">
                Get the best deals directly from the developer with no third-party markups.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexible Payments</h3>
              <p className="text-muted-foreground">
                Enjoy flexible 5-Year Payment Plans designed to make ownership easy.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Banknote className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Commission</h3>
              <p className="text-muted-foreground">
                Save money with 0% Commission and No Bank Involvement required.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Freehold</h3>
              <p className="text-muted-foreground">
                100% Freehold ownership available for all nationalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Common questions about Salsabeel Real Estate properties</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">Why is Salsabeel Real Estate Company the best company in Ajman?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Salsabeel Company provides rental and sales services and also sells projects that it only owns, distinguished by its after-sales service and maintenance. We are committed to delivering quality and trust.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">Does Salsabeel Real Estate Company have projects for rent?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes, Salsabeel Real Estate Company has the management of many buildings and also its affiliated buildings. It continuously follows up the rental process while providing the best and most appropriate offer to both parties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">I need shops or an apartment for investment!</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Salsabeel Real Estate Company has many projects inside Ajman for sale and rent, and also for real estate investment. Salsabeel Company is a leading developer in the Emirate of Ajman. Contact us to get what you are looking for.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">What payment plans do you offer?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We offer flexible payment plans up to 5 years directly from the developer, with no bank involvement required. This makes purchasing your dream home or investment property accessible and hassle-free.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
