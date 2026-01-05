import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2",
            isRTL && "flex-row-reverse"
          )}
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'en' ? 'English' : 'العربية'}</span>
          <span className="sm:hidden">{language === 'en' ? 'EN' : 'AR'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"}>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={cn(
            language === 'en' && "bg-accent",
            isRTL && "text-right"
          )}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('ar')}
          className={cn(
            language === 'ar' && "bg-accent",
            isRTL && "text-right"
          )}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

