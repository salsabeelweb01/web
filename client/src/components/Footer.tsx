import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import logoDark from "@assets/logog_2-removebg-preview-1_1765914929615.png";

export default function Footer() {
  const { t, isRTL } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
              <img src={logoDark} alt="Salsabeel Real Estate" className="h-16 w-auto" />
            </Link>
            <p className={cn("text-primary-foreground/70 text-sm leading-relaxed", isRTL && "text-right")}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className={cn(isRTL && "text-right")}>
            <h3 className="font-heading font-semibold mb-4 text-lg">{t.footer.company}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">{t.nav.properties}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className={cn(isRTL && "text-right")}>
            <h3 className="font-heading font-semibold mb-4 text-lg">{t.footer.services}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/projects?type=buy" className="hover:text-white transition-colors">{t.footer.buyHome}</Link></li>
              <li><Link href="/projects?type=rent" className="hover:text-white transition-colors">{t.footer.rentHome}</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">{t.footer.commercial}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.footer.propertyManagement}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={cn(isRTL && "text-right")}>
            <h3 className="font-heading font-semibold mb-4 text-lg">{t.footer.contact}</h3>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}>
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  {t.contact.address.line1}<br/>
                  {t.contact.address.line2}<br/>
                  {t.contact.address.line3}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>+971 52 424 2410</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <div className="flex flex-col">
                  <span>marketing@salsabeelre.com</span>
                  <span>info@salsabeel-re.ae</span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className={cn("border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/50", isRTL && "text-right")}>
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
