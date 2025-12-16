import { db } from "./db";
import { projects } from "@shared/schema";

const projectsData = [
  {
    name: "Salsabeel Golf View",
    location: "Al Zorah, Ajman",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "Contact for Price",
    bedrooms: "1-2 & Townhouse",
    sizeSqft: "493 - 3364",
    description: "Premium apartments in Al Zorah, Ajman offering stunning golf course views. Spacious layouts designed for modern luxury living.",
    propertyType: "Apartments & Townhouses",
    images: [
      "/attached_assets/projects/salsabeel_golf_view.png",
      "/attached_assets/Untitled-design-15-1-1_1765881960651.png",
      "/attached_assets/Untitled-design-7-768x768_1765882662290.png",
      "/attached_assets/Untitled-design-8-768x768_1765882670496.png",
      "/attached_assets/Untitled-design-9-768x768_1765882673794.png",
      "/attached_assets/Untitled-design-10-768x768_1765882677104.png",
      "/attached_assets/Untitled-design-16-768x768_1765882680103.png"
    ],
    features: ["Golf Course View", "Nature Reserve Access", "Modern Design", "Spacious Balconies"]
  },
  {
    name: "Salsabeel 5",
    location: "Al Alia, Ajman",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "Contact for Price",
    bedrooms: "1-2",
    sizeSqft: "955 - 1587",
    description: "Spacious residential apartments and shops in Al Alia. Salsabeel 5 is designed for comfort and convenience.",
    propertyType: "Shops & Apartments",
    images: [
      "/attached_assets/projects/salsabeel_5.png",
      "/attached_assets/stock_images/modern_apartment_bui_c1d03950.jpg",
    ],
    features: ["Shops Available", "Finished Units", "Modern Design", "Prime Location"]
  },
  {
    name: "Reem Al Salsabeel",
    location: "Al Alia, Ajman",
    status: "Ready to Move",
    type: "buy",
    startingPrice: "Contact for Price",
    bedrooms: "1",
    sizeSqft: "1031.6 - 1070.5",
    description: "Luxury redefined in Al Alia. Reem Al Salsabeel offers high-end finishes and spacious floor plans.",
    propertyType: "Shops & 1 BHK",
    images: [
      "/attached_assets/projects/reem_al_salsabeel.png",
      "/attached_assets/stock_images/modern_apartment_bui_6ce365b6.jpg",
    ],
    features: ["Premium Finishes", "Shops Available", "Covered Parking", "Smart Access"]
  },
  {
    name: "Salsabeel Parks",
    location: "Al Alia, Ajman",
    status: "Under Construction",
    type: "buy",
    startingPrice: "Contact for Price",
    bedrooms: "1-2",
    sizeSqft: "1136.6 - 1727.7",
    description: "Modern living meets natural tranquility at Salsabeel Parks. Located in the developing Al Alia district.",
    propertyType: "Shops & Apartments",
    images: [
      "/attached_assets/projects/salsabeel_parks.png",
      "/attached_assets/stock_images/modern_apartment_bui_0a227c55.jpg",
    ],
    features: ["Community Parks", "Family Friendly", "Modern Finishes", "Parking"]
  },
  {
    name: "Salsabeel Golf View Residence Block A-B",
    location: "Al Zorah, Ajman",
    status: "Under Construction",
    type: "buy",
    startingPrice: "Contact for Price",
    bedrooms: "Studio, 1-2",
    sizeSqft: "406 - 1803",
    description: "The newest addition to the Golf View community. Block A-B offers refined living spaces with direct access to the Al Zorah Golf Club.",
    propertyType: "Studio & Apartments",
    images: [
      "/attached_assets/projects/golf_view_residence.png",
      "/attached_assets/stock_images/modern_apartment_bui_fc00fafc.jpg",
    ],
    features: ["Golf Views", "Swimming Pool", "Gym", "Gated Security"]
  },
  {
    name: "Azora Tower",
    location: "Al Zorah, Ajman",
    status: "Under Construction",
    type: "buy",
    startingPrice: "Contact for Price",
    bedrooms: "Studio, 1-3",
    sizeSqft: "724 - 2468",
    description: "Luxury tower living in Al Zorah. Azora Tower presents premium studios and apartments with breathtaking views.",
    propertyType: "Studio & Apartments",
    images: [
      "/attached_assets/projects/azora_tower.png",
      "/attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg"
    ],
    features: ["High Rise Living", "Panoramic Views", "Premium Amenities", "Prime Location"]
  }
];

async function seed() {
  console.log("Seeding database...");
  
  try {
    // Clear existing projects
    await db.delete(projects);
    
    // Insert new projects
    await db.insert(projects).values(projectsData);
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
  
  process.exit(0);
}

seed();
