import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, Project } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star, Shield, Clock, CheckCircle2, Wallet, Banknote, Building, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { t, isRTL } = useLanguage();
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
        
        <div className={cn("relative z-10 container mx-auto px-4 text-center", isRTL && "text-right")}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 animate-in slide-in-from-bottom-4 duration-700">
            {t.home.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-100 font-light">
            {t.home.hero.subtitle}
          </p>
          
          <div className="animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={cn(
            "flex flex-col md:flex-row justify-between items-end mb-12",
            isRTL && "flex-row-reverse"
          )}>
            <div className={cn(isRTL && "text-right")}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{t.home.featured.title}</h2>
              <p className="text-muted-foreground max-w-xl">
                {t.home.featured.subtitle}
              </p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className={cn(
                "hidden md:flex group mt-4 md:mt-0",
                isRTL && "flex-row-reverse"
              )}>
                {t.home.featured.viewAll}
                <ArrowRight className={cn(
                  "h-4 w-4 group-hover:translate-x-1 transition-transform",
                  isRTL ? "mr-2 group-hover:-translate-x-1" : "ml-2"
                )} />
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
                {t.home.featured.viewAll}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className={cn("text-center max-w-2xl mx-auto mb-16", isRTL && "text-right")}>
            <h2 className="text-3xl font-heading font-bold mb-4">{t.home.whyChoose.title}</h2>
            <p className="text-muted-foreground">
              {t.home.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className={cn("bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow", isRTL && "text-right")}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.home.whyChoose.directDeveloper.title}</h3>
              <p className="text-muted-foreground">
                {t.home.whyChoose.directDeveloper.description}
              </p>
            </div>
            <div className={cn("bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow", isRTL && "text-right")}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.home.whyChoose.flexiblePayments.title}</h3>
              <p className="text-muted-foreground">
                {t.home.whyChoose.flexiblePayments.description}
              </p>
            </div>
            <div className={cn("bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow", isRTL && "text-right")}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Banknote className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.home.whyChoose.noCommission.title}</h3>
              <p className="text-muted-foreground">
                {t.home.whyChoose.noCommission.description}
              </p>
            </div>
            <div className={cn("bg-background p-8 rounded-xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow", isRTL && "text-right")}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.home.whyChoose.freehold.title}</h3>
              <p className="text-muted-foreground">
                {t.home.whyChoose.freehold.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className={cn("text-center mb-12", isRTL && "text-right")}>
            <h2 className="text-3xl font-heading font-bold mb-4">{t.home.faq.title}</h2>
            <p className="text-muted-foreground">{t.home.faq.subtitle}</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className={cn("text-lg font-medium", isRTL && "text-right")}>{t.home.faq.q1.question}</AccordionTrigger>
              <AccordionContent className={cn("text-muted-foreground leading-relaxed", isRTL && "text-right")}>
                {t.home.faq.q1.answer}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className={cn("text-lg font-medium", isRTL && "text-right")}>{t.home.faq.q2.question}</AccordionTrigger>
              <AccordionContent className={cn("text-muted-foreground leading-relaxed", isRTL && "text-right")}>
                {t.home.faq.q2.answer}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className={cn("text-lg font-medium", isRTL && "text-right")}>{t.home.faq.q3.question}</AccordionTrigger>
              <AccordionContent className={cn("text-muted-foreground leading-relaxed", isRTL && "text-right")}>
                {t.home.faq.q3.answer}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className={cn("text-lg font-medium", isRTL && "text-right")}>{t.home.faq.q4.question}</AccordionTrigger>
              <AccordionContent className={cn("text-muted-foreground leading-relaxed", isRTL && "text-right")}>
                {t.home.faq.q4.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
