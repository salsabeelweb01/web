import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, Project } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";
import { Link } from "wouter";

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
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100 font-light">
            Discover a curated collection of the most exclusive properties in prime locations.
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
            <h2 className="text-3xl font-heading font-bold mb-4">Why Choose Estate</h2>
            <p className="text-muted-foreground">
              We provide a seamless experience for buyers, sellers, and renters with our top-tier services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trusted by Thousands</h3>
              <p className="text-muted-foreground">
                Our reputation is built on trust and integrity. We ensure every transaction is transparent and secure.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Listings</h3>
              <p className="text-muted-foreground">
                Access exclusive off-market listings and the finest properties before they hit the general market.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated team of agents is available around the clock to answer your questions and schedule viewings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
