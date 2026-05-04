import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, TrendingUp, MapPin } from 'lucide-react';
import { VerticalHero } from '@/components/verticals/vertical-hero';
import { OtherVerticals } from '@/components/verticals/other-verticals';
import { ListingGrid } from '@/components/listings/listing-grid';
import { SearchAssistant } from '@/components/ai/search-assistant';
import { Button } from '@/components/ui/button';
import { getVertical, isValidVertical, verticalList, type VerticalType } from '@/lib/verticals';
import { getListingsByVertical, getFeaturedListings } from '@/lib/types/listings';

interface VerticalPageProps {
  params: Promise<{ vertical: string }>;
}

export async function generateStaticParams() {
  return verticalList.map((v) => ({ vertical: v.id }));
}

export async function generateMetadata({ params }: VerticalPageProps) {
  const { vertical: verticalId } = await params;
  const vertical = getVertical(verticalId);
  
  if (!vertical) {
    return { title: 'Not Found' };
  }

  return {
    title: `${vertical.name} - ${vertical.tagline} | GetLocalAds`,
    description: vertical.description,
  };
}

export default async function VerticalPage({ params }: VerticalPageProps) {
  const { vertical: verticalId } = await params;
  
  if (!isValidVertical(verticalId)) {
    notFound();
  }

  const vertical = getVertical(verticalId)!;
  const listings = getListingsByVertical(verticalId as VerticalType);
  const featuredListings = getFeaturedListings().filter((l) => l.vertical === verticalId);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-sides py-4">
          <Link href="/" className="text-xl font-bold text-foreground">
            GetLocalAds
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/${verticalId}/post`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Post a Listing
            </Link>
            <Button size="sm" asChild>
              <Link href={`/${verticalId}`}>
                Browse {vertical.name}
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <VerticalHero verticalId={verticalId as VerticalType} />

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="px-sides py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5" style={{ color: vertical.accent }} />
                <h2 className="text-2xl font-bold text-foreground">Featured Listings</h2>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${verticalId}?featured=true`}>
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <ListingGrid listings={featuredListings} />
          </div>
        </section>
      )}

      {/* All Listings */}
      <section className="px-sides py-16 bg-card/30">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">All {vertical.name}</h2>
              <p className="mt-1 text-muted-foreground">
                {vertical.stats.listings} listings across {vertical.stats.cities} cities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground">
                <option>Most Recent</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          <ListingGrid
            listings={listings.length > 0 ? listings : featuredListings}
            emptyMessage={`No ${vertical.name.toLowerCase()} listings yet`}
          />
        </div>
      </section>

      {/* Browse by Location */}
      <section className="px-sides py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-5 w-5" style={{ color: vertical.accent }} />
            <h2 className="text-2xl font-bold text-foreground">Browse by Location</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {vertical.sampleLocations.map((location) => (
              <Link
                key={location}
                href={`/${verticalId}/${location.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-muted-foreground"
              >
                <span className="font-medium text-foreground">{location}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Other Categories */}
      <section className="px-sides py-16 bg-card/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">Explore Other Categories</h2>
          <OtherVerticals currentVerticalId={verticalId as VerticalType} />
        </div>
      </section>

      {/* CTA */}
      <section className="px-sides py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground">
            Have a {vertical.name.toLowerCase().slice(0, -1)} to list?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Create your listing in minutes with AI-powered descriptions.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href={`/${verticalId}/post`}>
              Post a Free Listing
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-sides py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link href="/" className="text-lg font-bold text-foreground">
            GetLocalAds
          </Link>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {verticalList.slice(0, 5).map((v) => (
              <Link key={v.id} href={`/${v.id}`} className="hover:text-foreground transition-colors">
                {v.name}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* AI Search Assistant */}
      <SearchAssistant vertical={verticalId as VerticalType} accentColor={vertical.accent} />
    </div>
  );
}
