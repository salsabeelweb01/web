import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { getLocations } from "@/lib/api";
import { useLocation } from "wouter";

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const [, setLocation] = useLocation();
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [type, setType] = useState<string>("buy");

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedLocation && selectedLocation !== "all") params.append("location", selectedLocation);
    if (type) params.append("type", type);
    
    setLocation(`/projects?${params.toString()}`);
  };

  if (compact) {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full max-w-4xl mx-auto bg-background p-2 rounded-lg shadow-lg border border-border/50">
         <div className="flex-1">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="border-0 shadow-none focus:ring-0 h-10">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-32">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="border-0 shadow-none focus:ring-0 h-10 border-l rounded-none">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSearch} size="default">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-card/95 backdrop-blur rounded-xl p-4 md:p-6 shadow-2xl border border-border">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_150px_150px] gap-4">
        <div className="space-y-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block pt-1">Location</label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="h-12 bg-secondary/50 border-0 focus:ring-1 focus:ring-primary/20">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block pt-1">Type</label>
          <div className="flex bg-secondary/50 rounded-md p-1 h-12">
            <button
              className={`flex-1 rounded-sm text-sm font-medium transition-all ${type === 'buy' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setType('buy')}
            >
              Buy
            </button>
            <button
              className={`flex-1 rounded-sm text-sm font-medium transition-all ${type === 'rent' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setType('rent')}
            >
              Rent
            </button>
          </div>
        </div>

        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full h-12 text-base font-medium shadow-md hover:shadow-lg transition-all">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
