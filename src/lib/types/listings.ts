import type { VerticalType } from '../verticals';

export interface ListingLocation {
  city: string;
  state: string;
  zip?: string;
  neighborhood?: string;
}

export interface ListingContact {
  name: string;
  method: 'email' | 'phone' | 'chat';
  value?: string;
}

export interface Listing {
  id: string;
  vertical: VerticalType;
  title: string;
  description: string;
  price?: number;
  priceType?: 'fixed' | 'negotiable' | 'per-month' | 'per-hour' | 'per-night' | 'salary';
  location: ListingLocation;
  images: string[];
  category: string;
  features: Record<string, string | number | boolean>;
  contact: ListingContact;
  postedAt: Date;
  featured?: boolean;
  verified?: boolean;
}

export interface ListingFilter {
  vertical?: VerticalType;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  query?: string;
}

// Mock data for development
export const mockListings: Listing[] = [
  {
    id: '1',
    vertical: 'homes',
    title: 'Beautiful 4BR Victorian in Pacific Heights',
    description: 'Stunning renovated Victorian home with original details, modern kitchen, and panoramic bay views.',
    price: 2450000,
    priceType: 'fixed',
    location: { city: 'San Francisco', state: 'CA', neighborhood: 'Pacific Heights' },
    images: ['/placeholder.svg'],
    category: 'Single Family',
    features: { bedrooms: 4, bathrooms: 3, sqft: 2800, parking: 2 },
    contact: { name: 'Sarah M.', method: 'email' },
    postedAt: new Date('2024-01-15'),
    featured: true,
    verified: true,
  },
  {
    id: '2',
    vertical: 'apartments',
    title: 'Luxury 2BR Penthouse in Williamsburg',
    description: 'Modern penthouse with private rooftop, floor-to-ceiling windows, and Manhattan skyline views.',
    price: 4500,
    priceType: 'per-month',
    location: { city: 'Brooklyn', state: 'NY', neighborhood: 'Williamsburg' },
    images: ['/placeholder.svg'],
    category: '2 Bedroom',
    features: { bedrooms: 2, bathrooms: 2, sqft: 1400, pets: true },
    contact: { name: 'Mike R.', method: 'phone' },
    postedAt: new Date('2024-01-18'),
    featured: true,
  },
  {
    id: '3',
    vertical: 'jobs',
    title: 'Senior Product Designer - Remote',
    description: 'Join our growing team to lead product design for our AI-powered platform. Competitive salary and equity.',
    price: 180000,
    priceType: 'salary',
    location: { city: 'Los Angeles', state: 'CA' },
    images: ['/placeholder.svg'],
    category: 'Remote',
    features: { type: 'Full-Time', experience: '5+ years', equity: true },
    contact: { name: 'HR Team', method: 'email' },
    postedAt: new Date('2024-01-20'),
    featured: true,
  },
  {
    id: '4',
    vertical: 'cars',
    title: '2023 Tesla Model Y Long Range',
    description: 'Pearl white, autopilot, premium interior, only 8,000 miles. Original owner, immaculate condition.',
    price: 42500,
    priceType: 'negotiable',
    location: { city: 'Chicago', state: 'IL' },
    images: ['/placeholder.svg'],
    category: 'Electric',
    features: { year: 2023, miles: 8000, color: 'Pearl White', autopilot: true },
    contact: { name: 'David K.', method: 'chat' },
    postedAt: new Date('2024-01-22'),
    verified: true,
  },
  {
    id: '5',
    vertical: 'events',
    title: 'Red Rocks Amphitheatre - Summer Concert Series',
    description: 'Experience live music at the iconic Red Rocks venue. Multiple artists, food vendors, and breathtaking views.',
    price: 85,
    priceType: 'fixed',
    location: { city: 'Denver', state: 'CO' },
    images: ['/placeholder.svg'],
    category: 'Concerts',
    features: { date: '2024-07-15', time: '7:00 PM', capacity: 9500 },
    contact: { name: 'Red Rocks', method: 'email' },
    postedAt: new Date('2024-01-10'),
    featured: true,
  },
  {
    id: '6',
    vertical: 'rentals',
    title: 'Oceanfront Villa - South Beach',
    description: 'Luxurious 3BR villa steps from the beach. Pool, full kitchen, concierge service included.',
    price: 450,
    priceType: 'per-night',
    location: { city: 'Miami', state: 'FL', neighborhood: 'South Beach' },
    images: ['/placeholder.svg'],
    category: 'Vacation',
    features: { bedrooms: 3, bathrooms: 2, pool: true, oceanView: true },
    contact: { name: 'Beach Rentals', method: 'chat' },
    postedAt: new Date('2024-01-19'),
    featured: true,
  },
];

export function getListingsByVertical(vertical: VerticalType): Listing[] {
  return mockListings.filter(l => l.vertical === vertical);
}

export function getFeaturedListings(): Listing[] {
  return mockListings.filter(l => l.featured);
}

export function formatPrice(price: number, priceType?: string): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

  switch (priceType) {
    case 'per-month':
      return `${formatted}/mo`;
    case 'per-night':
      return `${formatted}/night`;
    case 'per-hour':
      return `${formatted}/hr`;
    case 'salary':
      return `${formatted}/yr`;
    case 'negotiable':
      return `${formatted} OBO`;
    default:
      return formatted;
  }
}
