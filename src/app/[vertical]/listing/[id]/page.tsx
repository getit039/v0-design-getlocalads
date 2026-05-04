import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Clock, BadgeCheck, Heart, Share2, MessageSquare, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getVertical, isValidVertical, type VerticalType } from '@/lib/verticals';
import { mockListings, formatPrice } from '@/lib/types/listings';

interface ListingPageProps {
  params: Promise<{ vertical: string; id: string }>;
}

export async function generateMetadata({ params }: ListingPageProps) {
  const { vertical: verticalId, id } = await params;
  const listing = mockListings.find(l => l.id === id);
  
  if (!listing) {
    return { title: 'Listing Not Found' };
  }

  return {
    title: `${listing.title} | GetLocalAds`,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { vertical: verticalId, id } = await params;
  
  if (!isValidVertical(verticalId)) {
    notFound();
  }

  const vertical = getVertical(verticalId)!;
  const listing = mockListings.find(l => l.id === id);

  if (!listing) {
    notFound();
  }

  const timeAgo = getTimeAgo(listing.postedAt);
  const relatedListings = mockListings
    .filter(l => l.vertical === listing.vertical && l.id !== listing.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-sides py-4">
          <Link 
            href={`/${verticalId}`} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to {vertical.name}</span>
          </Link>
          <Link href="/" className="text-xl font-bold text-foreground">
            GetLocalAds
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-sides pt-24 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image gallery */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={listing.images[0] || '/placeholder.svg'}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {listing.featured && (
                    <span
                      className="rounded-lg px-3 py-1.5 text-sm font-bold uppercase"
                      style={{ backgroundColor: vertical.accent, color: 'var(--background)' }}
                    >
                      Featured
                    </span>
                  )}
                  {listing.verified && (
                    <span className="flex items-center gap-1.5 rounded-lg bg-background/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-foreground">
                      <BadgeCheck className="h-4 w-4" style={{ color: vertical.accent }} />
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Title and price */}
              <div>
                {listing.price !== undefined && (
                  <div
                    className="text-3xl font-bold"
                    style={{ color: vertical.accent }}
                  >
                    {formatPrice(listing.price, listing.priceType)}
                  </div>
                )}
                <h1 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                  {listing.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {listing.location.neighborhood
                        ? `${listing.location.neighborhood}, ${listing.location.city}, ${listing.location.state}`
                        : `${listing.location.city}, ${listing.location.state}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Posted {timeAgo}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold text-foreground mb-4">Details</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {Object.entries(listing.features).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">{key}</span>
                      <span className="mt-1 font-medium text-foreground">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span
                  className="rounded-lg px-3 py-1 text-sm font-medium"
                  style={{ backgroundColor: vertical.accentLight, color: vertical.accent }}
                >
                  {listing.category}
                </span>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact card */}
              <div className="rounded-xl border border-border bg-card p-5 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Seller</h3>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-foreground">
                    {listing.contact.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{listing.contact.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      Prefers {listing.contact.method}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" size="lg" style={{ backgroundColor: vertical.accent }}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  Tip: Mention you found this on GetLocalAds
                </p>
              </div>

              {/* Safety tips */}
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <h4 className="text-sm font-semibold text-foreground mb-2">Safety Tips</h4>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>• Meet in a public place</li>
                  <li>• Never share financial info</li>
                  <li>• Trust your instincts</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related listings */}
          {relatedListings.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Similar Listings</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedListings.map((related) => (
                  <Link
                    key={related.id}
                    href={`/${related.vertical}/listing/${related.id}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-muted-foreground"
                  >
                    <div className="relative aspect-[4/3] bg-secondary">
                      <Image
                        src={related.images[0] || '/placeholder.svg'}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      {related.price !== undefined && (
                        <div className="font-bold" style={{ color: vertical.accent }}>
                          {formatPrice(related.price, related.priceType)}
                        </div>
                      )}
                      <h3 className="mt-1 font-semibold text-foreground line-clamp-1 group-hover:underline">
                        {related.title}
                      </h3>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {related.location.city}, {related.location.state}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}
