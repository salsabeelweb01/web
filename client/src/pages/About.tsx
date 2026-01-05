import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Building, Award } from "lucide-react";
import { t } from "@/lib/translations";
import { cn } from "@/lib/utils";

import teamMuna from "@assets/team/muna_jaber.jpeg";
import teamRomany from "@assets/team/romany_nabil.jpg";
import teamAhmedF from "@assets/team/ahmed_fawzy.jpeg";
import teamAhmedH from "@assets/team/ahmed_hammad.jpg";

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
            {t.about.badge}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
            {t.about.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-200 font-light">
            {t.about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
               <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{t.about.vision.title}</h2>
               <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                 {t.about.vision.paragraph1}
               </p>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 {t.about.vision.paragraph2}
               </p>
            </div>
            <div>
               <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{t.about.mission.title}</h2>
               <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                 {t.about.mission.paragraph1}
               </p>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 {t.about.mission.paragraph2}
               </p>
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
              <div className="text-4xl font-bold mb-2">7+</div>
              <div className="text-sm opacity-70">{t.about.stats.projects}</div>
            </div>
            <div className="p-4">
              <Award className="h-10 w-10 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">8+</div>
              <div className="text-sm opacity-70">{t.about.stats.years}</div>
            </div>
            <div className="p-4">
              <Users className="h-10 w-10 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-70">{t.about.stats.clients}</div>
            </div>
            <div className="p-4">
              <Globe className="h-10 w-10 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">2016</div>
              <div className="text-sm opacity-70">{t.about.stats.founded}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">{t.about.team.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all p-6">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                 <img src={teamMuna} className="w-full h-full object-cover" alt="Muna jaber" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">Muna Jaber</h3>
              <p className="text-sm text-primary uppercase tracking-wider">CEO</p>
            </div>
            <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all p-6">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                 <img src={teamRomany} className="w-full h-full object-cover" alt="Romany Nabil" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">Romany Nabil</h3>
              <p className="text-sm text-primary uppercase tracking-wider">General Manager</p>
            </div>
            <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all p-6">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                 <img src={teamAhmedF} className="w-full h-full object-cover" alt="Ahmed Fawzy" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">Ahmed Fawzy</h3>
              <p className="text-sm text-primary uppercase tracking-wider">Sales Manager</p>
            </div>
            <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all p-6">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                 <img src={teamAhmedH} className="w-full h-full object-cover" alt="Ahmed Hammad" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">Ahmed Hammad</h3>
              <p className="text-sm text-primary uppercase tracking-wider">Holding Manager</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}