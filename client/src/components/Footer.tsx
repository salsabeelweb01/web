import { Building2, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-heading font-bold text-xl">
              <Building2 className="h-6 w-6" />
              <span>SALSABEEL</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Salsabeel envisions a world where every person finds their perfect Home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/"><a className="hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/projects"><a className="hover:text-white transition-colors">Properties</a></Link></li>
              <li><Link href="/"><a className="hover:text-white transition-colors">Agents</a></Link></li>
              <li><Link href="/"><a className="hover:text-white transition-colors">Careers</a></Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-white transition-colors">Buy a Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sell a Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rent</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Property Management</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Contact</h3>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>Villa No 8, Salsabeel Real Estate LLC</p>
              <p>University Street, Al Jurf 1</p>
              <p>Ajman, UAE</p>
              <p>+971 52 424 2410</p>
              <p>marketing@salsabeelre.com</p>
              <p>info@saslabeel.com</p>
              
              <div className="flex gap-4 mt-4">
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
