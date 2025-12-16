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
    name: "The Palm Royale",
    location: "Palm Jumeirah, Dubai",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "AED 12,500,000",
    bedrooms: 5,
    sizeSqft: 6400,
    description: "Experience the pinnacle of luxury living on the iconic Palm Jumeirah. Featuring private beach access, infinity pool, and panoramic views of the Dubai skyline.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_c3d2b0c4.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Private Beach", "Infinity Pool", "Smart Home System", "Maid's Room"]
  },
  {
    id: 2,
    name: "Downtown Heights",
    location: "Downtown Dubai",
    status: "Rent",
    type: "rent",
    startingPrice: "AED 180,000/yr",
    bedrooms: 2,
    sizeSqft: 1400,
    description: "Modern apartments with direct views of the Burj Khalifa. Walking distance to Dubai Mall and Opera District.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_0a227c55.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Burj Khalifa View", "Rooftop Lounge", "Valet Parking", "Gym"]
  },
  {
    id: 3,
    name: "Saadiyat Beach Villas",
    location: "Saadiyat Island, Abu Dhabi",
    status: "Under Construction",
    type: "buy",
    startingPrice: "AED 6,850,000",
    bedrooms: 4,
    sizeSqft: 4200,
    description: "Exclusive villas nestled in nature near the cultural district. Sustainable design with open-concept living and private gardens.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e035fd25.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Beach Access", "Large Garden", "Near Louvre", "Walking Trails"]
  },
  {
    id: 4,
    name: "Marina Gate Penthouses",
    location: "Dubai Marina",
    status: "Rent",
    type: "rent",
    startingPrice: "AED 350,000/yr",
    bedrooms: 3,
    sizeSqft: 2800,
    description: "Premium waterfront living in the heart of Dubai Marina. High ceilings, panoramic glass walls, and 5-star amenities.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_fc00fafc.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Marina View", "Infinity Pool", "Concierge", "Direct Tram Access"]
  },
  {
    id: 5,
    name: "Jumeirah Golf Estates",
    location: "Jumeirah Golf Estates, Dubai",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "AED 9,200,000",
    bedrooms: 5,
    sizeSqft: 5800,
    description: "Mediterranean-inspired villas overlooking world-class golf courses. A serene community perfect for families.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e68ceba0.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Golf Course View", "Private Pool", "Gated Community", "Clubhouse Access"]
  },
  {
    id: 6,
    name: "Business Bay Lofts",
    location: "Business Bay, Dubai",
    status: "Under Construction",
    type: "buy",
    startingPrice: "AED 2,100,000",
    bedrooms: 1,
    sizeSqft: 950,
    description: "Sleek, modern lofts designed for young professionals. Located along the Dubai Canal with easy access to Downtown.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_c1d03950.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Canal View", "Smart Home", "Co-working Space", "Retail Podium"]
  },
  {
    id: 7,
    name: "Al Barari Reserve",
    location: "Al Barari, Dubai",
    status: "Rent",
    type: "rent",
    startingPrice: "AED 550,000/yr",
    bedrooms: 6,
    sizeSqft: 11000,
    description: "An oasis of tranquility. These massive estates feature lush botanical gardens, freshwater streams, and ultimate privacy.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_d408787b.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Botanical Gardens", "Private Cinema", "Staff Quarters", "Spa"]
  },
  {
    id: 8,
    name: "Yas Acres",
    location: "Yas Island, Abu Dhabi",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "AED 4,800,000",
    bedrooms: 4,
    sizeSqft: 3800,
    description: "Luxury living near the F1 track and theme parks. Spacious interiors and access to a world-class golf course and country club.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_c3d2b0c4.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Golf Course", "Theme Park Access", "Community Pool", "Schools Nearby"]
  },
  {
    id: 9,
    name: "Bluewaters Residences",
    location: "Bluewaters Island, Dubai",
    status: "Rent",
    type: "rent",
    startingPrice: "AED 280,000/yr",
    bedrooms: 2,
    sizeSqft: 1600,
    description: "Island living with views of Ain Dubai. Vibrant lifestyle destination with retail, dining, and hospitality at your doorstep.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_6ce365b6.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Ain Dubai View", "Beach Club", "Pedestrian Bridge to JBR", "Podium Gardens"]
  },
  {
    id: 10,
    name: "Emirates Hills Mansion",
    location: "Emirates Hills, Dubai",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "AED 45,000,000",
    bedrooms: 7,
    sizeSqft: 18000,
    description: "The Beverly Hills of Dubai. A palatial mansion overlooking the Montgomerie Golf Course with custom finishes throughout.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e035fd25.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Golf Front", "Private Elevator", "Home Theater", "Basement Parking"]
  },
  {
    id: 11,
    name: "Creek Harbour Horizon",
    location: "Dubai Creek Harbour",
    status: "Under Construction",
    type: "rent",
    startingPrice: "AED 110,000/yr",
    bedrooms: 1,
    sizeSqft: 850,
    description: "Future-ready living in the new heart of Dubai. Stunning views of the Creek Tower and wildlife sanctuary.",
    images: [
      "attached_assets/stock_images/modern_apartment_bui_0a227c55.jpg",
      "attached_assets/stock_images/luxury_living_room_i_09908d3c.jpg",
      "attached_assets/stock_images/luxury_living_room_i_15d09f92.jpg"
    ],
    features: ["Creek View", "Park Access", "Marina Promenade", "Smart Home"]
  },
  {
    id: 12,
    name: "Al Zahia Villas",
    location: "Al Zahia, Sharjah",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "AED 2,400,000",
    bedrooms: 4,
    sizeSqft: 3200,
    description: "Premier lifestyle destination in Sharjah. Gated community with lush green parks, clubhouse, and family-friendly amenities.",
    images: [
      "attached_assets/stock_images/modern_luxury_home_e_e68ceba0.jpg",
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg",
      "attached_assets/stock_images/luxury_living_room_i_de3389a8.jpg"
    ],
    features: ["Gated Community", "Clubhouse", "Parks", "Retail Center"]
  }
];
