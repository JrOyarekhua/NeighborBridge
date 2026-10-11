export type ResourceCategory = "Food" | "Housing";

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  address: string;
  zip: string;
  hours: string;
  eligibility: string;
  services: string[];
  website?: string;
  directions?: string;
  verifiedLink: boolean;
};

export const resources: Resource[] = [
  {
    id: "acfb",
    name: "Atlanta Community Food Bank",
    category: "Food",
    description:
      "Use the organization’s official food finder to locate partner pantries and food programs across metro Atlanta.",
    address: "Metro Atlanta service area",
    zip: "30344",
    hours: "Hours vary by partner location — confirm before visiting",
    eligibility: "Requirements vary by partner program",
    services: ["Food pantry locator", "Community food programs", "Benefits assistance"],
    website: "https://www.acfb.org/get-help/",
    directions: "https://www.google.com/maps/search/?api=1&query=Atlanta+Community+Food+Bank",
    verifiedLink: true,
  },
  {
    id: "intown-pantry",
    name: "Intown Neighborhood Pantry",
    category: "Food",
    description:
      "A sample neighborhood pantry record demonstrating grocery pickup and referral information.",
    address: "Intown Atlanta service area",
    zip: "30308",
    hours: "Demo hours unavailable — contact information not published",
    eligibility: "Demo eligibility: confirm requirements with a provider",
    services: ["Grocery pickup", "Pantry referrals"],
    verifiedLink: false,
  },
  {
    id: "westside-meals",
    name: "Westside Community Meals",
    category: "Food",
    description:
      "A sample community meal program record serving residents in west Atlanta neighborhoods.",
    address: "West Atlanta service area",
    zip: "30314",
    hours: "Demo hours unavailable",
    eligibility: "Demo listing — eligibility has not been verified",
    services: ["Prepared meals", "Food resource referrals"],
    verifiedLink: false,
  },
  {
    id: "gateway",
    name: "Gateway Center",
    category: "Housing",
    description:
      "Official organization providing coordinated support intended to help individuals move toward stable housing.",
    address: "Downtown Atlanta",
    zip: "30303",
    hours: "Program hours vary — confirm through the official website",
    eligibility: "Program-specific; contact the organization to confirm",
    services: ["Coordinated entry", "Shelter support", "Housing navigation"],
    website: "https://www.gatewayctr.org/",
    directions: "https://www.google.com/maps/search/?api=1&query=Gateway+Center+Atlanta",
    verifiedLink: true,
  },
  {
    id: "south-atlanta-housing",
    name: "South Atlanta Housing Navigation",
    category: "Housing",
    description:
      "A sample resource record showing how housing navigation and referral services could appear.",
    address: "South Atlanta service area",
    zip: "30315",
    hours: "Demo hours unavailable",
    eligibility: "Demo listing — screening criteria have not been verified",
    services: ["Housing referrals", "Application navigation"],
    verifiedLink: false,
  },
  {
    id: "eastside-rent",
    name: "Eastside Stability Support",
    category: "Housing",
    description:
      "A sample program record for residents seeking housing stability information and referrals.",
    address: "East Atlanta service area",
    zip: "30316",
    hours: "Demo hours unavailable",
    eligibility: "Demo listing — availability is not guaranteed",
    services: ["Stability planning", "Rental resource referrals"],
    verifiedLink: false,
  },
];

export type ExchangeType = "Need" | "Offer" | "Skill";

export type ExchangeListing = {
  id: string;
  title: string;
  type: ExchangeType;
  category: string;
  description: string;
  location: string;
  posted: string;
};

export const exchangeListings: ExchangeListing[] = [
  {
    id: "resume",
    title: "Offering resume review assistance",
    type: "Offer",
    category: "Career support",
    description:
      "A volunteer is offering thoughtful resume feedback and help organizing work experience.",
    location: "Virtual or Central Atlanta",
    posted: "Added this week",
  },
  {
    id: "clothing",
    title: "Interview clothing donations needed",
    type: "Need",
    category: "Clothing",
    description:
      "A neighborhood career closet is seeking clean, professional clothing for upcoming interviews.",
    location: "Southwest Atlanta",
    posted: "Added 2 days ago",
  },
  {
    id: "computer",
    title: "Basic computer skills tutoring",
    type: "Skill",
    category: "Digital skills",
    description:
      "Patient, beginner-friendly help with email, online forms, and everyday computer tasks.",
    location: "East Atlanta",
    posted: "Added this week",
  },
  {
    id: "volunteer",
    title: "Community pantry volunteer shift",
    type: "Need",
    category: "Volunteer",
    description:
      "Help a demo neighborhood pantry organize shelf-stable items and prepare grocery bags.",
    location: "West Atlanta",
    posted: "Added today",
  },
];
