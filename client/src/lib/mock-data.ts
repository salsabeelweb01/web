import salsabeelImg from "@assets/Untitled-design-15-1-1_1765881960651.png";
import salsabeelImg2 from "@assets/Untitled-design-7-768x768_1765882662290.png";
import salsabeelImg3 from "@assets/Untitled-design-8-768x768_1765882670496.png";
import salsabeelImg4 from "@assets/Untitled-design-9-768x768_1765882673794.png";
import salsabeelImg5 from "@assets/Untitled-design-10-768x768_1765882677104.png";
import salsabeelImg6 from "@assets/Untitled-design-16-768x768_1765882680103.png";

// Project Images from Website
import pSalsabeelGolfView from "@assets/projects/salsabeel_golf_view.png";
import pSalsabeel5 from "@assets/projects/salsabeel_5.png";
import pReemAlSalsabeel from "@assets/projects/reem_al_salsabeel.png";
import pSalsabeelParks from "@assets/projects/salsabeel_parks.png";
import pGolfViewRes from "@assets/projects/golf_view_residence.png";
import pAzora from "@assets/projects/azora_tower.png";

export interface Project {
  id: number;
  name: string;
  location: string;
  status: "Rent" | "Under Construction" | "Ready to Move";
  type: "rent" | "buy";
  startingPrice: string;
  bedrooms: number | string;
  sizeSqft: string;
  description: string;
  images: string[];
  features: string[];
  propertyType: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
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
      pSalsabeelGolfView,
      salsabeelImg,
      salsabeelImg2,
      salsabeelImg3,
      salsabeelImg4,
      salsabeelImg5,
      salsabeelImg6
    ],
    features: ["Golf Course View", "Nature Reserve Access", "Modern Design", "Spacious Balconies"]
  },
  {
    id: 2,
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
      pSalsabeel5,
      "attached_assets/stock_images/modern_apartment_bui_c1d03950.jpg",
    ],
    features: ["Shops Available", "Finished Units", "Modern Design", "Prime Location"]
  },
  {
    id: 3,
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
      pReemAlSalsabeel,
      "attached_assets/stock_images/modern_apartment_bui_6ce365b6.jpg",
    ],
    features: ["Premium Finishes", "Shops Available", "Covered Parking", "Smart Access"]
  },
  {
    id: 4,
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
      pSalsabeelParks,
      "attached_assets/stock_images/modern_apartment_bui_0a227c55.jpg",
    ],
    features: ["Community Parks", "Family Friendly", "Modern Finishes", "Parking"]
  },
  {
    id: 5,
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
      pGolfViewRes,
      "attached_assets/stock_images/modern_apartment_bui_fc00fafc.jpg",
    ],
    features: ["Golf Views", "Swimming Pool", "Gym", "Gated Security"]
  },
  {
    id: 6,
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
      pAzora,
      "attached_assets/stock_images/luxury_living_room_i_139e9c46.jpg"
    ],
    features: ["High Rise Living", "Panoramic Views", "Premium Amenities", "Prime Location"]
  }
];
