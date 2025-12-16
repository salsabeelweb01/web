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
              <span>ESTATE</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium real estate services for modern living. Find your dream home with us.
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
              <p>123 Luxury Lane</p>
              <p>Beverly Hills, CA 90210</p>
              <p>+1 (555) 123-4567</p>
              <p>hello@estate.com</p>
              
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
          <p>&copy; {new Date().getFullYear()} Estate Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
