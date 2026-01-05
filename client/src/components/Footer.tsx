import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import { t } from "@/lib/translations";
import logoDark from "@assets/logog_2-removebg-preview-1_1765914929615.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
              <img src={logoDark} alt="Salsabeel Real Estate" className="h-16 w-auto" />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">{t.footer.company}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="hover:text-white transition-colors">{t.nav.about}</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">{t.nav.properties}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">{t.footer.services}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/projects?type=buy" className="hover:text-white transition-colors">{t.footer.buyHome}</Link></li>
              <li><Link href="/projects?type=rent" className="hover:text-white transition-colors">{t.footer.rentHome}</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">{t.footer.commercial}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.footer.propertyManagement}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">{t.footer.contact}</h3>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-3">
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
                <a 
                  href="https://www.facebook.com/salsabeelrealestate.re/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/salsabeelrealestate/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@salsabeel.real.estate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
