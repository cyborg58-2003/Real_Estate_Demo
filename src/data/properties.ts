import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import heroImage from "@/assets/hero.jpg";

export type Property = {
  slug: string;
  name: string;
  tagline: string;
  status: "For Sale" | "Under Offer" | "Just Listed" | "Exclusive";
  location: string;
  city: string;
  type: "House" | "Villa" | "Estate" | "Penthouse" | "Architectural";
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  pricePerSqft: number;
  year: number;
  lot: string;
  architect: string;
  image: string;
  gallery: string[];
  summary: string;
  description: string;
  features: string[];
  amenities: string[];
  agentId: string;
  coordinates: { lat: number; lng: number };
  floorplan: string;
  virtualTourAvailable: boolean;
};

export const LOCATIONS = [
  "Sunset Valley",
  "Lakeside",
  "Hillside",
  "Malibu Bluffs",
  "Aspen Pines",
  "Palm Springs",
  "Beverly Crest",
  "Soho Skyline",
] as const;

export const PROPERTY_TYPES = ["House", "Villa", "Estate", "Penthouse", "Architectural"] as const;

export const PRICE_RANGES = [
  { label: "Under $1.5M", min: 0, max: 1_500_000 },
  { label: "$1.5M – $2.5M", min: 1_500_000, max: 2_500_000 },
  { label: "$2.5M – $4.0M", min: 2_500_000, max: 4_000_000 },
  { label: "$4.0M+", min: 4_000_000, max: Number.POSITIVE_INFINITY },
] as const;

export const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const specLine = (p: Property) =>
  `${p.beds} beds · ${p.baths} baths · ${p.sqft.toLocaleString("en-US")} sqft`;

export const PROPERTIES: Property[] = [
  {
    slug: "sunset-valley-home",
    name: "Sunset Valley Home",
    tagline: "Low-slung single-storey sanctuary centered around a gravel courtyard",
    status: "For Sale",
    location: "Sunset Valley",
    city: "Sunset Valley, CA",
    type: "House",
    price: 1_250_000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    pricePerSqft: 446,
    year: 2019,
    lot: "0.62 acres",
    architect: "Olson & Partners",
    image: property1,
    gallery: [
      property1,
      heroImage,
      property2,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "A low-slung single-storey house set behind mature oaks, organised around a gravel courtyard and a long western terrace that catches the last hour of light.",
    description:
      "Designed with an understated brutalist elegance, Sunset Valley Home merges raw board-formed concrete walls with warm vertical cedar cladding. Natural light washes through floor-to-ceiling clerestory glass, drawing the eye toward surrounding oak woodlands. The central gravel courtyard creates a serene microclimate, perfect for morning reflection or intimate evening entertaining.",
    features: [
      "Board-formed concrete and cedar façade",
      "Courtyard entry with mature landscaping",
      "Open kitchen with honed stone counters",
      "Radiant-heated polished concrete floors",
      "Custom minimalist steel doors and cabinetry",
    ],
    amenities: ["Radiant Heating", "Solar Roof Array", "Outdoor Fireplace", "Smart Home Automation", "EV Charging"],
    agentId: "elena-vance",
    coordinates: { lat: 37.3861, lng: -122.1856 },
    floorplan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: true,
  },
  {
    slug: "lakeside-retreat",
    name: "Lakeside Retreat",
    tagline: "Double-height waterfront pavilion with private dock and boathouse",
    status: "Just Listed",
    location: "Lakeside",
    city: "Lake Tahoe, CA",
    type: "Villa",
    price: 1_850_000,
    beds: 5,
    baths: 4,
    sqft: 3500,
    pricePerSqft: 528,
    year: 2021,
    lot: "1.1 acres",
    architect: "Kengo Studio",
    image: property2,
    gallery: [
      property2,
      heroImage,
      property3,
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Full-height glazing opens the living pavilion to the water, while warm timber panelling and deep eaves keep the interior quiet and shaded through the afternoon.",
    description:
      "Hovering over the water edge, Lakeside Retreat is a triumph of alpine modernism. Glulam timber beams frame soaring glass walls overlooking pristine crystal waters. The primary suite occupies the top level, featuring a private cantilevered balcony, soaking tub with direct lake views, and a dual-sided fireplace.",
    features: [
      "Sliding glass walls to a lake-facing deck",
      "Double-height living pavilion with exposed timber frame",
      "Private dock and custom timber boathouse",
      "Guest suite with separate entry and kitchen",
    ],
    amenities: ["Private Boat Dock", "Infinity Edge Spa", "Wine Cellar", "Custom Timber Deck", "Floor-to-Ceiling Windows"],
    agentId: "marcus-thorne",
    coordinates: { lat: 39.0968, lng: -120.0324 },
    floorplan: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: true,
  },
  {
    slug: "hillside-manor",
    name: "Hillside Manor",
    tagline: "Limestone estate on a meadow ridge framed by custom steel casement glass",
    status: "For Sale",
    location: "Hillside",
    city: "Carmel Valley, CA",
    type: "Estate",
    price: 1_450_000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    pricePerSqft: 453,
    year: 2017,
    lot: "2.4 acres",
    architect: "Vanguard Design Group",
    image: property3,
    gallery: [
      property3,
      heroImage,
      property1,
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "A limestone manor on a wild meadow ridge, restored with a restrained hand: steel windows, lime plaster, and rooms that follow the movement of the sun.",
    description:
      "Set on a rolling meadow ridge, Hillside Manor pairs historic European textures with crisp contemporary living spaces. Locally quarried limestone, hand-troweled lime plaster walls, and custom blackened steel casement windows deliver an atmosphere of timeless permanence.",
    features: [
      "Restored limestone and lime-plaster envelope",
      "Steel-framed casement windows throughout",
      "Meadow grounds with stone terracing and olive trees",
      "Two-bay carriage house with workshop space",
    ],
    amenities: ["Meadow Terraces", "Carriage House", "Custom Wine Storage", "Library", "Chef's Kitchen"],
    agentId: "elena-vance",
    coordinates: { lat: 36.4799, lng: -121.7327 },
    floorplan: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: false,
  },
  {
    slug: "malibu-ocean-bluffs",
    name: "Malibu Ocean Bluffs",
    tagline: "Cantilevered glass architectural masterpiece with panoramic Pacific Ocean views",
    status: "Exclusive",
    location: "Malibu Bluffs",
    city: "Malibu, CA",
    type: "Architectural",
    price: 4_850_000,
    beds: 5,
    baths: 6,
    sqft: 5400,
    pricePerSqft: 898,
    year: 2023,
    lot: "1.8 acres",
    architect: "Studio Foster & Partners",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Perched high on the Malibu bluffs, this glass and steel cantilevered structure floats effortlessly over the coastline with unobstructed 220-degree Pacific ocean vistas.",
    description:
      "A masterpiece of structural engineering, Malibu Ocean Bluffs features automated glass walls that slide completely out of sight into pocket recesses, seamlessly connecting the grand living area to a 90-foot infinity pool. Includes a private funicular down to a secluded beach cove.",
    features: [
      "Automated sliding motor-driven glass wall pocket doors",
      "90ft heated oceanfront infinity pool and spa",
      "Private funicular access to private beach cove",
      "Subterranean 4-car showroom garage with turntable",
    ],
    amenities: ["Private Beach Access", "Infinity Edge Pool", "Showroom Garage", "Private Cinema", "Home Gym"],
    agentId: "sophia-chen",
    coordinates: { lat: 34.0259, lng: -118.7798 },
    floorplan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: true,
  },
  {
    slug: "aspen-pines-sanctuary",
    name: "Aspen Pines Sanctuary",
    tagline: "Modern mountain compound with cedar, granite and glass in a pine forest",
    status: "For Sale",
    location: "Aspen Pines",
    city: "Aspen, CO",
    type: "Estate",
    price: 3_950_000,
    beds: 6,
    baths: 7,
    sqft: 6100,
    pricePerSqft: 647,
    year: 2022,
    lot: "3.5 acres",
    architect: "Charles Wright Architecture",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
    ],
    summary:
      "Surrounded by whispering lodgepole pines, this ski-in ski-out mountain compound pairs massive hearthstone fireplaces with geometric zinc rooflines.",
    description:
      "Aspen Pines Sanctuary offers an unparalleled mountain living experience. Designed for multi-generational gatherings, it features ski locker rooms, heated driveway pavement, a custom cedar sauna, outdoor fire cauldron, and floor-to-ceiling glass viewing galleries.",
    features: [
      "Direct ski-in / ski-out access to Aspen Mountain slopes",
      "Heated granite driveway and exterior snow-melting system",
      "Floor-to-ceiling double-glazed thermal curtain walls",
      "Cedar sauna & Nordic plunge pool wellness suite",
    ],
    amenities: ["Ski-in/Ski-out", "Cedar Sauna", "Nordic Plunge Pool", "Heated Driveway", "Wine Tasting Room"],
    agentId: "julian-ross",
    coordinates: { lat: 39.1911, lng: -106.8175 },
    floorplan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: true,
  },
  {
    slug: "palm-springs-modernist",
    name: "Palm Springs Modernist Pavilion",
    tagline: "Desert architectural retreat with butterfly roofline and mountain backdrops",
    status: "Just Listed",
    location: "Palm Springs",
    city: "Palm Springs, CA",
    type: "Architectural",
    price: 2_150_000,
    beds: 3,
    baths: 3,
    sqft: 3100,
    pricePerSqft: 693,
    year: 2020,
    lot: "0.45 acres",
    architect: "Richard Neutra Legacy Studio",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "A tribute to desert mid-century modernism, this light-filled pavilion features a classic butterfly roof, terrazzo flooring, and dramatic views of the San Jacinto Mountains.",
    description:
      "Framed by iconic desert palms, this home embraces indoor-outdoor desert living. Sliding glass panels retract to reveal a saltwater swimming pool, sunken fire lounge, and custom outdoor kitchen under shade sails.",
    features: [
      "Signature butterfly roofline with exposed steel beams",
      "Custom poured terrazzo tile flooring throughout",
      "Saltwater swimming pool with mountain view patio",
      "Native desert xeriscape garden with automated drip system",
    ],
    amenities: ["Saltwater Pool", "Terrazzo Floors", "Outdoor Kitchen", "Sunken Fire Pit", "Solar Power System"],
    agentId: "elena-vance",
    coordinates: { lat: 33.8303, lng: -116.5453 },
    floorplan: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: true,
  },
  {
    slug: "beverly-crest-villa",
    name: "Beverly Crest Modern Villa",
    tagline: "Gated ridge-top estate with city-to-ocean skyline vistas and infinity pool",
    status: "Under Offer",
    location: "Beverly Crest",
    city: "Beverly Hills, CA",
    type: "Villa",
    price: 3_450_000,
    beds: 5,
    baths: 6,
    sqft: 4800,
    pricePerSqft: 718,
    year: 2022,
    lot: "0.85 acres",
    architect: "Marmol Radziner",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Privately situated behind double security gates on a private promontory, this Beverly Crest villa commands sweeping views from downtown LA to the Santa Monica coast.",
    description:
      "Boasting museum-quality finishes, Italian oak millwork, and custom bronze fixtures, Beverly Crest Modern Villa is tailored for sophisticated living. The main level hosts a temperature-controlled 600-bottle glass wine cellar and a luxury spa suite.",
    features: [
      "Double-gated long private motor court drive",
      "Glass-enclosed 600-bottle wine tasting cellar",
      "Zero-edge horizon pool overlooking Los Angeles basin",
      "Primary suite with dual spa bathrooms and walk-in dressing rooms",
    ],
    amenities: ["Gated Security", "Zero-Edge Pool", "600-Bottle Wine Cellar", "Italian Oak Millwork", "Smart Security"],
    agentId: "sophia-chen",
    coordinates: { lat: 34.0901, lng: -118.4158 },
    floorplan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: true,
  },
  {
    slug: "soho-skyline-penthouse",
    name: "Soho Skyline Glass Penthouse",
    tagline: "Duplex sky residence with private rooftop garden and skyline vistas",
    status: "Exclusive",
    location: "Soho Skyline",
    city: "New York, NY",
    type: "Penthouse",
    price: 5_200_000,
    beds: 4,
    baths: 4,
    sqft: 4200,
    pricePerSqft: 1238,
    year: 2024,
    lot: "Rooftop terrace",
    architect: "Herzog & de Meuron",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "A crowning duplex penthouse in historic Soho featuring 18-foot ceilings, key-operated private elevator access, and a 1,400 sqft landscaped rooftop garden terrace.",
    description:
      "Experience Manhattan luxury from the clouds. Designed with minimalist polished micro-cement floors, museum lighting, and custom Boffi kitchen architecture, this penthouse provides unmatched privacy and panoramic urban views.",
    features: [
      "Direct key-locked elevator entry into private foyer",
      "1,400 sqft landscaped roof terrace with outdoor kitchen & plunge pool",
      "18ft floor-to-ceiling curtain wall windows with motorized shades",
      "Boffi custom kitchen with Calacatta marble island",
    ],
    amenities: ["Private Elevator", "Landscaped Roof Garden", "Rooftop Plunge Pool", "Doorman 24/7", "Private Storage"],
    agentId: "sophia-chen",
    coordinates: { lat: 40.7233, lng: -74.003 },
    floorplan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    virtualTourAvailable: true,
  },
];

export const getProperty = (slug: string) => PROPERTIES.find((p) => p.slug === slug);
