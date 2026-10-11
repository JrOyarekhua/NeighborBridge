export type ResourceCategory = "Food" | "Housing" | "Emergency";

export type TrustLevel = "Verified" | "Partner-verified" | "Needs re-check";

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  address: string;
  zip: string;
  /** Searchable alongside ZIP ("30303 or Downtown"). */
  neighborhood: string;
  hours: string;
  /** Full text for the detail page. */
  eligibility: string;
  /** One line for the card. */
  eligibilityShort: string;
  services: string[];
  website?: string;
  directions?: string;
  transit?: string;
  phone?: string;
  verifiedLink: boolean;
  trustLevel: TrustLevel;
  /** "Oct 10", or "Not yet verified". */
  verifiedDate: string;
  sourceLabel: string;
  openNow: boolean;
  openStatus: string;
  /** Latest community report, if any (demo data). */
  neighborStatus?: string;
  /** Only resources with a verified location appear on the map. */
  coords?: { lat: number; lng: number };
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
    neighborhood: "West Midtown",
    hours: "Hours vary by partner location — confirm before visiting",
    eligibility: "Requirements vary by partner program",
    eligibilityShort: "No ID needed · partner requirements vary",
    services: ["Food pantry locator", "Community food programs", "Benefits assistance"],
    website: "https://www.acfb.org/get-help/",
    directions: "https://www.google.com/maps/search/?api=1&query=Atlanta+Community+Food+Bank",
    transit:
      "https://www.google.com/maps/dir/?api=1&destination=Atlanta+Community+Food+Bank&travelmode=transit",
    phone: "404-892-3333",
    verifiedLink: true,
    trustLevel: "Verified",
    verifiedDate: "Oct 10",
    sourceLabel: "Official website",
    openNow: true,
    openStatus: "Open now · closes 4 PM",
    neighborStatus: "3 neighbors confirmed open today · 40 min ago",
    coords: { lat: 33.7787, lng: -84.4181 },
  },
  {
    id: "intown-pantry",
    name: "Intown Neighborhood Pantry",
    category: "Food",
    description:
      "A sample neighborhood pantry record demonstrating grocery pickup and referral information.",
    address: "Intown Atlanta service area",
    zip: "30308",
    neighborhood: "Midtown",
    hours: "Demo hours unavailable — contact information not published",
    eligibility: "Demo eligibility: confirm requirements with a provider",
    eligibilityShort: "Call before visiting",
    services: ["Grocery pickup", "Pantry referrals"],
    verifiedLink: false,
    trustLevel: "Needs re-check",
    verifiedDate: "Sep 28",
    sourceLabel: "Community submission",
    openNow: false,
    openStatus: "Hours need confirmation",
  },
  {
    id: "westside-meals",
    name: "Westside Community Meals",
    category: "Food",
    description:
      "A sample community meal program record serving residents in west Atlanta neighborhoods.",
    address: "West Atlanta service area",
    zip: "30314",
    neighborhood: "Westside",
    hours: "Demo hours unavailable",
    eligibility: "Demo listing — eligibility has not been verified",
    eligibilityShort: "Walk-ins welcome",
    services: ["Prepared meals", "Food resource referrals"],
    verifiedLink: false,
    trustLevel: "Needs re-check",
    verifiedDate: "Sep 26",
    sourceLabel: "Community submission",
    openNow: true,
    openStatus: "Open now · closes 6 PM",
    neighborStatus: "2 reports: running low · 1 hr ago",
  },
  {
    id: "gateway",
    name: "Gateway Center",
    category: "Housing",
    description:
      "Official organization providing coordinated support intended to help individuals move toward stable housing.",
    address: "Downtown Atlanta",
    zip: "30303",
    neighborhood: "Downtown",
    hours: "Program hours vary — confirm through the official website",
    eligibility: "Program-specific; contact the organization to confirm",
    eligibilityShort: "Adults 18+ · assessment required",
    services: ["Coordinated entry", "Shelter support", "Housing navigation"],
    website: "https://www.gatewayctr.org/",
    directions: "https://www.google.com/maps/search/?api=1&query=Gateway+Center+Atlanta",
    transit:
      "https://www.google.com/maps/dir/?api=1&destination=Gateway+Center+Atlanta&travelmode=transit",
    phone: "404-215-6600",
    verifiedLink: true,
    trustLevel: "Partner-verified",
    verifiedDate: "Oct 10",
    sourceLabel: "Official website",
    openNow: true,
    openStatus: "Open now · closes 5 PM",
    neighborStatus: "4 neighbors confirmed open today · 25 min ago",
    coords: { lat: 33.7478, lng: -84.3947 },
  },
  {
    id: "south-atlanta-housing",
    name: "South Atlanta Housing Navigation",
    category: "Housing",
    description:
      "A sample resource record showing how housing navigation and referral services could appear.",
    address: "South Atlanta service area",
    zip: "30315",
    neighborhood: "South Atlanta",
    hours: "Demo hours unavailable",
    eligibility: "Demo listing — screening criteria have not been verified",
    eligibilityShort: "Atlanta residents · appointment required",
    services: ["Housing referrals", "Application navigation"],
    verifiedLink: false,
    trustLevel: "Needs re-check",
    verifiedDate: "Sep 30",
    sourceLabel: "Community submission",
    openNow: false,
    openStatus: "Opens tomorrow 9 AM",
  },
  {
    id: "eastside-rent",
    name: "Eastside Stability Support",
    category: "Housing",
    description:
      "A sample program record for residents seeking housing stability information and referrals.",
    address: "East Atlanta service area",
    zip: "30316",
    neighborhood: "East Atlanta",
    hours: "Demo hours unavailable",
    eligibility: "Demo listing — availability is not guaranteed",
    eligibilityShort: "Call to confirm eligibility",
    services: ["Stability planning", "Rental resource referrals"],
    verifiedLink: false,
    trustLevel: "Needs re-check",
    verifiedDate: "Sep 29",
    sourceLabel: "Community submission",
    openNow: false,
    openStatus: "Hours need confirmation",
  },
  {
    id: "georgia-211",
    name: "Georgia 2-1-1 Helpline",
    category: "Emergency",
    description:
      "Dial 2-1-1 to be connected with local help for food, housing, utilities, and other urgent needs.",
    address: "Phone and online service",
    zip: "30303",
    neighborhood: "Citywide",
    hours: "Confirm availability on the official website",
    eligibility: "Open to anyone seeking local resource referrals",
    eligibilityShort: "No ID requirement listed",
    services: ["Resource referrals", "Urgent needs navigation"],
    website: "https://211.org/",
    phone: "211",
    verifiedLink: true,
    trustLevel: "Needs re-check",
    verifiedDate: "Not yet verified",
    sourceLabel: "Public directory entry",
    openNow: false,
    openStatus: "Hours unavailable",
  },
];

export type ExchangeType = "Need Help" | "Want to Help" | "Volunteer" | "Give Back";

export type ExchangeListing = {
  id: string;
  title: string;
  type: ExchangeType;
  category: string;
  description: string;
  location: string;
  posted: string;
  /** Give Back listings come from an organization. */
  organization?: string;
  timeCommitment?: string;
  schedule?: string;
  requirements?: string;
  sourceLabel?: string;
  /** Official signup page; only set once the link is verified. */
  signupUrl?: string;
};

export const exchangeListings: ExchangeListing[] = [
  {
    id: "resume",
    title: "Offering resume review assistance",
    type: "Want to Help",
    category: "Career support",
    description:
      "A volunteer is offering thoughtful resume feedback and help organizing work experience.",
    location: "Virtual or Central Atlanta",
    posted: "Added this week",
  },
  {
    id: "clothing",
    title: "Interview clothing donations needed",
    type: "Need Help",
    category: "Clothing",
    description:
      "A neighborhood career closet is seeking clean, professional clothing for upcoming interviews.",
    location: "Southwest Atlanta",
    posted: "Added 2 days ago",
  },
  {
    id: "volunteer",
    title: "Community pantry volunteer shift",
    type: "Volunteer",
    category: "Volunteer",
    description:
      "Help a demo neighborhood pantry organize shelf-stable items and prepare grocery bags.",
    location: "West Atlanta",
    posted: "Added today",
  },
  {
    id: "acfb-give-back",
    title: "Help sort and pack food donations",
    type: "Give Back",
    category: "Hunger relief",
    organization: "Atlanta Community Food Bank",
    description: "Support local hunger-relief efforts by helping prepare food for distribution.",
    location: "Metro Atlanta",
    posted: "Sample opportunity",
    timeCommitment: "Details on the organization’s signup page",
    schedule: "Confirm current opportunities with the organization",
    sourceLabel: "Sample content based on Atlanta Community Food Bank’s public volunteer program",
  },
  {
    id: "open-hand-give-back",
    title: "Support meal preparation or delivery",
    type: "Give Back",
    category: "Food and nutrition",
    organization: "Open Hand Atlanta",
    description: "Explore ways to support meal preparation or delivery through the organization.",
    location: "See the organization’s website",
    posted: "Sample opportunity",
    timeCommitment: "Details on the organization’s signup page",
    schedule: "Confirm current opportunities with the organization",
    sourceLabel: "Sample content based on Open Hand Atlanta’s public volunteer program",
  },
];
