export interface Project {
  id: number;
  name: string;
  location: string;
  status: "Rent" | "Under Construction" | "Ready to Move";
  type: "rent" | "buy";
  startingPrice: string;
  bedrooms: number;
  sizeSqft: number;
  description: string;
  images: string[];
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "The Highland Residences",
    location: "Beverly Hills, CA",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "$2,500,000",
    bedrooms: 3,
    sizeSqft: 2400,
    description: "Experience the pinnacle of luxury living in this architectural masterpiece. Featuring floor-to-ceiling windows, a private infinity pool, and panoramic city views.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_c3d2b0c4.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Infinity Pool", "Smart Home System", "Wine Cellar", "Private Gym"]
  },
  {
    id: 2,
    name: "Azure Skyline Apartments",
    location: "Miami, FL",
    status: "Rent",
    type: "rent",
    startingPrice: "$4,500/mo",
    bedrooms: 2,
    sizeSqft: 1200,
    description: "Modern waterfront apartments with direct beach access. Enjoy resort-style amenities including a rooftop lounge, fitness center, and concierge service.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_0a227c55.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Ocean View", "Rooftop Lounge", "Valet Parking", "Pet Friendly"]
  },
  {
    id: 3,
    name: "Oakwood Estate",
    location: "Austin, TX",
    status: "Under Construction",
    type: "buy",
    startingPrice: "$850,000",
    bedrooms: 4,
    sizeSqft: 3200,
    description: "A sustainable community nestled in nature. These modern farmhouses offer open-concept living, solar energy integration, and spacious backyards.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e035fd25.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Solar Panels", "Large Backyard", "Community Garden", "Walking Trails"]
  },
  {
    id: 4,
    name: "Metropolitan Lofts",
    location: "New York, NY",
    status: "Rent",
    type: "rent",
    startingPrice: "$6,200/mo",
    bedrooms: 1,
    sizeSqft: 950,
    description: "Industrial-chic lofts in the heart of SoHo. High ceilings, exposed brick walls, and premium finishes make this the ultimate urban retreat.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_fc00fafc.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Exposed Brick", "High Ceilings", "Doorman", "Roof Deck"]
  },
  {
    id: 5,
    name: "Serenity Heights",
    location: "Seattle, WA",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "$1,200,000",
    bedrooms: 3,
    sizeSqft: 1800,
    description: "Contemporary townhomes with stunning views of the Puget Sound. Steps away from the tech district and vibrant local markets.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e68ceba0.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Water View", "Private Garage", "Smart Locks", "Fireplace"]
  },
  {
    id: 6,
    name: "The Glass House",
    location: "Chicago, IL",
    status: "Under Construction",
    type: "buy",
    startingPrice: "$3,100,000",
    bedrooms: 4,
    sizeSqft: 4000,
    description: "An iconic glass structure redefining the skyline. Exclusive penthouses with 360-degree views and private elevator access.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_c1d03950.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["360 Views", "Private Elevator", "Indoor Pool", "Concierge"]
  },
  {
    id: 7,
    name: "Maplewood Cottages",
    location: "Portland, OR",
    status: "Rent",
    type: "rent",
    startingPrice: "$2,800/mo",
    bedrooms: 2,
    sizeSqft: 1100,
    description: "Charming cottages in a historic neighborhood. Renovated interiors with vintage character and modern conveniences.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_d408787b.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Hardwood Floors", "Garden", "Pet Friendly", "Quiet Street"]
  },
  {
    id: 8,
    name: "Desert Oasis Villa",
    location: "Scottsdale, AZ",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "$1,800,000",
    bedrooms: 5,
    sizeSqft: 3800,
    description: "Luxury desert living at its finest. This sprawling estate features a resort-style pool, outdoor kitchen, and breathtaking mountain views.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_c3d2b0c4.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Pool", "Outdoor Kitchen", "Mountain View", "Guest Casita"]
  },
  {
    id: 9,
    name: "Harbor Point",
    location: "Boston, MA",
    status: "Rent",
    type: "rent",
    startingPrice: "$3,500/mo",
    bedrooms: 1,
    sizeSqft: 800,
    description: "Waterfront living with easy access to the financial district. Modern amenities and a vibrant community atmosphere.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_6ce365b6.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Waterfront", "Gym", "Co-working Space", "Parking"]
  },
  {
    id: 10,
    name: "Alpine Lodge",
    location: "Aspen, CO",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "$5,500,000",
    bedrooms: 6,
    sizeSqft: 5500,
    description: "The ultimate ski-in/ski-out retreat. Timber frame construction, stone fireplaces, and luxurious finishes throughout.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e035fd25.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Ski-in/Ski-out", "Hot Tub", "Home Theater", "Wine Cellar"]
  },
  {
    id: 11,
    name: "Urban Core Apartments",
    location: "Atlanta, GA",
    status: "Under Construction",
    type: "rent",
    startingPrice: "$1,900/mo",
    bedrooms: 1,
    sizeSqft: 700,
    description: "Smart apartments designed for the modern professional. Integrated technology and flexible living spaces.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_0a227c55.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Smart Home", "Fitness Center", "Pool", "Transit Access"]
  },
  {
    id: 12,
    name: "Coastal Breeze",
    location: "San Diego, CA",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "$1,400,000",
    bedrooms: 3,
    sizeSqft: 1600,
    description: "Beachside bungalows with laid-back vibes. Updated interiors, private patios, and just steps from the sand.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e68ceba0.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Beach Access", "Private Patio", "Surfing", "Outdoor Shower"]
  }
];
