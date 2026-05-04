import {
  Home,
  Building2,
  Key,
  Briefcase,
  Car,
  Hotel,
  UtensilsCrossed,
  GraduationCap,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react';

export type VerticalType =
  | 'homes'
  | 'apartments'
  | 'rentals'
  | 'jobs'
  | 'cars'
  | 'hotels'
  | 'restaurants'
  | 'schools'
  | 'events';

export interface Vertical {
  id: VerticalType;
  name: string;
  domain: string; // The hub site domain (e.g., getsfhomes.com)
  shortDomain: string; // Display version without .com
  tagline: string;
  description: string;
  accent: string;
  accentLight: string;
  icon: LucideIcon;
  categories: string[];
  sampleLocations: string[];
  stats: {
    listings: string;
    cities: string;
  };
  placeholder: string;
}

export const verticals: Record<VerticalType, Vertical> = {
  homes: {
    id: 'homes',
    name: 'Homes',
    domain: 'getsfhomes.com',
    shortDomain: 'GetSFHomes',
    tagline: 'Find your dream home',
    description: 'Single-family homes, condos, townhouses, and land for sale in your area.',
    accent: 'oklch(0.72 0.19 160)', // emerald
    accentLight: 'oklch(0.72 0.19 160 / 0.15)',
    icon: Home,
    categories: ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Land', 'New Construction'],
    sampleLocations: ['San Francisco', 'Oakland', 'San Jose', 'Palo Alto', 'Berkeley'],
    stats: { listings: '24,500+', cities: '180+' },
    placeholder: 'Search for 3 bed home with pool in Oakland...',
  },
  apartments: {
    id: 'apartments',
    name: 'Apartments',
    domain: 'getatlantaapartments.com',
    shortDomain: 'GetAtlantaApartments',
    tagline: 'Your next apartment awaits',
    description: 'Studios, 1-bedroom, and luxury apartments available for rent.',
    accent: 'oklch(0.68 0.16 250)', // blue
    accentLight: 'oklch(0.68 0.16 250 / 0.15)',
    icon: Building2,
    categories: ['Studio', '1 Bedroom', '2 Bedroom', '3+ Bedroom', 'Penthouse', 'Loft'],
    sampleLocations: ['Atlanta', 'Buckhead', 'Midtown', 'Decatur', 'Sandy Springs'],
    stats: { listings: '45,200+', cities: '320+' },
    placeholder: 'Find pet-friendly 2BR under $2000 in Buckhead...',
  },
  rentals: {
    id: 'rentals',
    name: 'Rentals',
    domain: 'getmiamirentals.com',
    shortDomain: 'GetMiamiRentals',
    tagline: 'Short & long-term rentals',
    description: 'Vacation rentals, furnished units, and flexible lease options.',
    accent: 'oklch(0.75 0.18 200)', // cyan
    accentLight: 'oklch(0.75 0.18 200 / 0.15)',
    icon: Key,
    categories: ['Vacation', 'Furnished', 'Month-to-Month', 'Corporate', 'Sublet', 'Room Share'],
    sampleLocations: ['Miami', 'Fort Lauderdale', 'Tampa', 'Orlando', 'Key West'],
    stats: { listings: '18,700+', cities: '150+' },
    placeholder: 'Beachfront rental for July in Miami...',
  },
  jobs: {
    id: 'jobs',
    name: 'Jobs',
    domain: 'getlajobs.com',
    shortDomain: 'GetLAJobs',
    tagline: 'Land your next opportunity',
    description: 'Full-time, part-time, remote, and contract positions across industries.',
    accent: 'oklch(0.75 0.18 85)', // amber
    accentLight: 'oklch(0.75 0.18 85 / 0.15)',
    icon: Briefcase,
    categories: ['Full-Time', 'Part-Time', 'Remote', 'Contract', 'Internship', 'Freelance'],
    sampleLocations: ['Los Angeles', 'San Diego', 'Irvine', 'Santa Monica', 'Pasadena'],
    stats: { listings: '67,800+', cities: '420+' },
    placeholder: 'Remote marketing manager role $80k+...',
  },
  cars: {
    id: 'cars',
    name: 'Cars',
    domain: 'getchicars.com',
    shortDomain: 'GetChiCars',
    tagline: 'Drive your next car home',
    description: 'New, used, and certified pre-owned vehicles from dealers and private sellers.',
    accent: 'oklch(0.63 0.24 25)', // red
    accentLight: 'oklch(0.63 0.24 25 / 0.15)',
    icon: Car,
    categories: ['Sedan', 'SUV', 'Truck', 'Sports', 'Electric', 'Luxury'],
    sampleLocations: ['Chicago', 'Naperville', 'Evanston', 'Schaumburg', 'Aurora'],
    stats: { listings: '89,300+', cities: '280+' },
    placeholder: 'Tesla Model 3 under $35k in Chicago area...',
  },
  hotels: {
    id: 'hotels',
    name: 'Hotels',
    domain: 'getvegashotels.com',
    shortDomain: 'GetVegasHotels',
    tagline: 'Book your perfect stay',
    description: 'Hotels, resorts, boutique stays, and accommodations for every budget.',
    accent: 'oklch(0.70 0.20 310)', // purple
    accentLight: 'oklch(0.70 0.20 310 / 0.15)',
    icon: Hotel,
    categories: ['Luxury', 'Business', 'Budget', 'Resort', 'Boutique', 'Extended Stay'],
    sampleLocations: ['Las Vegas', 'Henderson', 'Reno', 'Lake Tahoe', 'Boulder City'],
    stats: { listings: '12,400+', cities: '200+' },
    placeholder: 'Las Vegas strip hotel with pool under $200/night...',
  },
  restaurants: {
    id: 'restaurants',
    name: 'Restaurants',
    domain: 'getatxeats.com',
    shortDomain: 'GetATXEats',
    tagline: 'Discover local dining',
    description: 'Restaurants, cafes, bars, and eateries with reviews and menus.',
    accent: 'oklch(0.70 0.18 50)', // orange
    accentLight: 'oklch(0.70 0.18 50 / 0.15)',
    icon: UtensilsCrossed,
    categories: ['Fine Dining', 'Casual', 'Fast Food', 'Cafe', 'Bar & Grill', 'Food Truck'],
    sampleLocations: ['Austin', 'Dallas', 'Houston', 'San Antonio', 'Fort Worth'],
    stats: { listings: '156,200+', cities: '580+' },
    placeholder: 'Best tacos in Austin with outdoor seating...',
  },
  schools: {
    id: 'schools',
    name: 'Schools',
    domain: 'getbosschools.com',
    shortDomain: 'GetBosSchools',
    tagline: 'Education for every stage',
    description: 'Preschools, K-12, colleges, and vocational training programs.',
    accent: 'oklch(0.65 0.15 145)', // teal
    accentLight: 'oklch(0.65 0.15 145 / 0.15)',
    icon: GraduationCap,
    categories: ['Preschool', 'Elementary', 'High School', 'College', 'Vocational', 'Online'],
    sampleLocations: ['Boston', 'Cambridge', 'Worcester', 'Springfield', 'Lowell'],
    stats: { listings: '34,100+', cities: '390+' },
    placeholder: 'Top-rated elementary school in Cambridge...',
  },
  events: {
    id: 'events',
    name: 'Events',
    domain: 'getdenverevents.com',
    shortDomain: 'GetDenverEvents',
    tagline: 'What\'s happening near you',
    description: 'Concerts, festivals, sports, community events, and local happenings.',
    accent: 'oklch(0.68 0.22 330)', // pink
    accentLight: 'oklch(0.68 0.22 330 / 0.15)',
    icon: CalendarDays,
    categories: ['Concerts', 'Festivals', 'Sports', 'Community', 'Workshops', 'Nightlife'],
    sampleLocations: ['Denver', 'Boulder', 'Colorado Springs', 'Fort Collins', 'Aurora'],
    stats: { listings: '8,900+', cities: '260+' },
    placeholder: 'Live music events this weekend in Denver...',
  },
};

export const verticalList = Object.values(verticals);

export function getVertical(id: string): Vertical | undefined {
  return verticals[id as VerticalType];
}

export function isValidVertical(id: string): id is VerticalType {
  return id in verticals;
}
