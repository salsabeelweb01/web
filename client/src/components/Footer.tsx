import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import logo from "@assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
              <img src={logo} alt="Salsabeel Real Estate" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Salsabeel envisions a world where every person finds their perfect Home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/projects?type=buy" className="hover:text-white transition-colors">Buy a Home</Link></li>
              <li><Link href="/projects?type=rent" className="hover:text-white transition-colors">Rent a Home</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Commercial</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Property Management</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Contact</h3>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  Villa No 8, Salsabeel Real Estate LLC<br/>
                  University Street, Al Jurf 1<br/>
                  Ajman, UAE
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

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Salsabeel Real Estate LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
