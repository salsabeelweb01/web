import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactInquiry } from "@/lib/api";
import { useState, FormEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function Contact() {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string,
      });
      
      toast({
        title: t.contact.form.success,
        description: t.contact.form.successDescription,
      });
      
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/30 py-20">
        <div className={cn("container mx-auto px-4 text-center", isRTL && "text-right")}>
          <Badge className="bg-primary/90 text-primary-foreground mb-4">{t.contact.badge}</Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t.contact.heroTitle}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.contact.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div className={cn(isRTL && "text-right")}>
                <h2 className="text-3xl font-heading font-bold mb-8">{t.contact.info.title}</h2>
                <div className="space-y-8">
                  <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t.contact.info.phone}</h3>
                      <p className="text-muted-foreground text-lg">+971 52 424 2410</p>
                    </div>
                  </div>

                  <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t.contact.info.email}</h3>
                      <p className="text-muted-foreground text-lg">marketing@salsabeelre.com</p>
                      <p className="text-muted-foreground text-lg">info@salsabeel-re.ae</p>
                    </div>
                  </div>

                  <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t.contact.info.address}</h3>
                      <p className="text-muted-foreground text-lg">
                        {t.contact.address.line1}<br/>
                        {t.contact.address.line2}<br/>
                        {t.contact.address.line3}
                      </p>
                    </div>
                  </div>

                  <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{t.contact.info.officeHours}</h3>
                      <p className="text-muted-foreground text-lg">{t.contact.info.saturday}</p>
                      <p className="text-muted-foreground text-lg">{t.contact.info.friday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-muted rounded-xl border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-primary/40" />
                </div>
                <p className="text-muted-foreground relative z-10">Map Integration Available</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className={cn("bg-card p-8 md:p-10 rounded-2xl shadow-lg border border-border", isRTL && "text-right")}>
              <h2 className="text-2xl font-heading font-bold mb-6">{t.contact.form.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.contact.form.firstName}</label>
                    <Input 
                      name="firstName"
                      placeholder={t.contact.form.firstName} 
                      className="bg-background" 
                      required 
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.contact.form.lastName}</label>
                    <Input 
                      name="lastName"
                      placeholder={t.contact.form.lastName} 
                      className="bg-background" 
                      required 
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contact.form.email}</label>
                  <Input 
                    name="email"
                    type="email" 
                    placeholder={t.contact.form.email} 
                    className="bg-background" 
                    required 
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contact.form.phone}</label>
                  <Input 
                    name="phone"
                    type="tel" 
                    placeholder={t.contact.form.phone} 
                    className="bg-background" 
                    required 
                    data-testid="input-phone"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contact.form.message}</label>
                  <Textarea 
                    name="message"
                    placeholder={t.contact.form.message} 
                    className="min-h-[150px] bg-background resize-none" 
                    required 
                    data-testid="input-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className={cn("w-full text-lg", isRTL && "flex-row-reverse")} 
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                  <Send className={cn("h-4 w-4", isRTL ? "mr-2" : "ml-2")} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
