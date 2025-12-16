import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Building, Award } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="attached_assets/stock_images/dubai_skyline_modern_b08ded82.jpg"
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="bg-primary/90 text-primary-foreground mb-4 animate-in slide-in-from-bottom-4 duration-500">
            About Estate
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            Redefining Luxury Real Estate <br/> in the UAE
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-200 font-light">
            We are the premier real estate agency connecting global investors with exceptional properties across the Emirates.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Our Mission</h2>
               <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                 At Estate, we believe that finding a home is more than just a transaction; it's about finding a sanctuary that reflects your lifestyle and aspirations.
               </p>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 With over 15 years of experience in the UAE market, we specialize in luxury residential and commercial properties. Our team of expert advisors provides bespoke service, ensuring that every client finds their perfect match in this dynamic and fast-growing region.
               </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="attached_assets/stock_images/real_estate_team_mee_edfe8f79.jpg" 
                  alt="Our Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-lg shadow-xl border border-border hidden md:block">
                <div className="text-4xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <Building className="h-10 w-10 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-70">Properties Sold</div>
            </div>
            <div className="p-4">
              <Users className="h-10 w-10 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-sm opacity-70">Happy Clients</div>
            </div>
            <div className="p-4">
              <Award className="h-10 w-10 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-70">Industry Awards</div>
            </div>
            <div className="p-4">
              <Globe className="h-10 w-10 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-70">Nationalities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all">
                <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                  <img 
                    src={`attached_assets/stock_images/real_estate_team_mee_27230845.jpg`} 
                    alt="Team Member" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-1">Alex Morgan</h3>
                  <p className="text-sm text-primary uppercase tracking-wider mb-4">Senior Partner</p>
                  <p className="text-muted-foreground text-sm">
                    Specializing in Downtown and Palm Jumeirah luxury investments.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
