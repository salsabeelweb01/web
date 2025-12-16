import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, getLocations } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function Projects() {
  const [location] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);

  const filterLocation = searchParams.get("location") || "all";
  const filterType = searchParams.get("type") || "all";
  const filterStatus = searchParams.get("status") || "all";

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', filterLocation, filterType, filterStatus],
    queryFn: () => getProjects({
      location: filterLocation === "all" ? undefined : filterLocation,
      type: filterType === "all" ? undefined : filterType as "rent" | "buy",
      status: filterStatus === "all" ? undefined : filterStatus
    })
  });

  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations
  });

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    const newSearch = newParams.toString();
    const newUrl = newSearch ? `${location}?${newSearch}` : location;
    // In wouter, we navigate to the new URL
    window.history.pushState(null, "", newUrl);
    // Force re-render/fetch by just using the link behavior or window location if wouter doesn't auto-detect
    // Actually, wouter's useSearch hook will update if we use navigate, but here we are just manipulating URL.
    // Let's use a cleaner navigation
    window.location.href = newUrl; // Simple reload for now to ensure query refetch, or better yet, let's use the proper navigation method if we had the hook accessible.
  };

  // Better navigation approach with wouter
  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchString);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    const newSearch = newParams.toString();
    window.location.hash = ""; // Clear hash if any
    // Use window.location.search update to trigger wouter? No, wouter uses pushState.
    // Let's just construct the full URL
    const target = `/projects?${newSearch}`;
    // We can't easily access 'navigate' here without useLocation hook returning it, 
    // but useLocation returns [location, setLocation].
    // Let's use setLocation from a wrapper or just simple href for prototype speed.
    // Actually, setLocation is available but I didn't destructure it above.
  };
  
  // Let's re-implement the hook usage correctly
  const [, setLocationPath] = useLocation();
  
  const setFilter = (key: string, value: string) => {
     const newParams = new URLSearchParams(searchString);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setLocationPath(`/projects?${newParams.toString()}`);
  }


  return (
    <Layout>
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold mb-4">Properties</h1>
          <p className="text-muted-foreground">Discover our exclusive portfolio of properties.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-card p-4 rounded-lg border shadow-sm sticky top-20 z-40">
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Location</label>
            <Select value={filterLocation} onValueChange={(val) => setFilter("location", val)}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations?.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Type</label>
            <Select value={filterType} onValueChange={(val) => setFilter("type", val)}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Status</label>
            <Select value={filterStatus} onValueChange={(val) => setFilter("status", val)}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Under Construction">Under Construction</SelectItem>
                <SelectItem value="Ready to Move">Ready to Move</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : projects?.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-muted-foreground">No properties found matching your filters.</h3>
            <button 
              onClick={() => setLocationPath("/projects")}
              className="mt-4 text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
