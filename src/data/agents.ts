export type Agent = {
  id: string;
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  specialties: string[];
  salesVolume: string;
  activeListingsCount: number;
};

export const AGENTS: Agent[] = [
  {
    id: "elena-vance",
    name: "Elena Vance",
    title: "Principal & Architectural Specialist",
    location: "Sunset Valley & Hillside",
    phone: "+1 (415) 555-0192",
    email: "elena@homestead.estate",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "With 14 years specializing in modernist and organic architecture, Elena connects visionary design homes with buyers who appreciate structural clarity.",
    specialties: ["Mid-Century Modern", "Desert Modernism", "Private Sales"],
    salesVolume: "$240M+",
    activeListingsCount: 4,
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    title: "Senior Luxury Advisor",
    location: "Lakeside & Waterfront",
    phone: "+1 (415) 555-0143",
    email: "marcus@homestead.estate",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    bio: "Marcus brings a background in structural engineering and architectural history, ensuring clients receive deep technical insight into unique estate properties.",
    specialties: ["Waterfront Estates", "Eco-Construction", "Historic Restorations"],
    salesVolume: "$310M+",
    activeListingsCount: 3,
  },
  {
    id: "sophia-chen",
    name: "Sophia Chen",
    title: "Coastal & Penthouse Director",
    location: "Malibu & Soho",
    phone: "+1 (310) 555-0188",
    email: "sophia@homestead.estate",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    bio: "Specializing in ultra-prime coastal compounds and urban sky residences, Sophia is trusted by international collectors and design connoisseurs.",
    specialties: ["Coastal Compounds", "Luxury Penthouses", "Design Consultation"],
    salesVolume: "$420M+",
    activeListingsCount: 5,
  },
  {
    id: "julian-ross",
    name: "Julian Ross",
    title: "Mountain & Ranch Partner",
    location: "Aspen & Napa",
    phone: "+1 (970) 555-0112",
    email: "julian@homestead.estate",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Julian curates secluded alpine retreats and vineyard estates that blend natural surroundings with uncompromised contemporary craftsmanship.",
    specialties: ["Alpine Retreats", "Vineyard Estates", "Land Acquisitions"],
    salesVolume: "$195M+",
    activeListingsCount: 3,
  },
];

export const getAgent = (id: string) => AGENTS.find((a) => a.id === id);
