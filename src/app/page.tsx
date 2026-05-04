import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Search, Sparkles, Shield, Zap, Globe } from 'lucide-react';

// Featured sites with imagery
const featuredSites = [
  { id: 'homes', image: '/images/category-homes.jpg' },
  { id: 'apartments', image: '/images/category-apartments.jpg' },
  { id: 'jobs', image: '/images/category-jobs.jpg' },
  { id: 'cars', image: '/images/category-cars.jpg' },
  { id: 'events', image: '/images/category-events.jpg' },
] as const;
import { GetLocalAdsLogo } from '@/components/brand/logo';
import { HeroSearch } from '@/components/hero/hero-search';
import { NetworkStats } from '@/components/hero/network-stats';
import { VerticalCard } from '@/components/verticals/vertical-card';
import { verticalList, verticals } from '@/lib/verticals';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Unique header for anchor site - spans full width */}
      <header className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-start w-full p-sides md:grid-cols-12 md:gap-sides pt-4">
        <div className="block flex-none md:hidden">
          {/* Mobile menu placeholder */}
        </div>
        <Link href="/" className="md:col-span-3 xl:col-span-2 max-md:place-self-center">
          <GetLocalAdsLogo className="max-md:scale-90" />
        </Link>
        <nav className="flex gap-2 justify-end items-center md:col-span-9 xl:col-span-10">
          <ul className="items-center gap-6 py-2 px-4 bg-background/20 rounded-full backdrop-blur-md hidden md:flex border border-border/50">
            {['Network', 'About', 'Post'].map((item) => (
              <li key={item}>
                <Link
                  href={item === 'Post' ? '/post' : `#${item.toLowerCase()}`}
                  className="font-semibold text-sm transition-colors duration-200 text-foreground/70 hover:text-foreground"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <Button size="sm" className="ml-2" asChild>
            <Link href="/homes">
              Explore Sites
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </nav>
      </header>

      {/* Main content with sidebar layout like the original template */}
      <div className="grid md:grid-cols-12 md:gap-sides min-h-screen">
        {/* Left Sidebar - Sticky intro text */}
        <aside className="max-md:hidden col-span-4 h-screen sticky top-0 p-sides pt-top-spacing flex flex-col justify-between">
          <div>
            <p className="italic tracking-tighter text-lg text-foreground">
              9 Sites. One Network. Endless Opportunities.
            </p>
            <div className="mt-6 text-base leading-relaxed text-muted-foreground">
              <p>GetLocalAds powers a network of specialized classified sites.</p>
              <p className="mt-2">Each site serves its niche. Together they serve everyone.</p>
              <p className="mt-2">AI-powered. Human-verified. Actually useful.</p>
            </div>
            
            {/* Quick site links */}
            <div className="mt-10">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">The Network</p>
              <div className="flex flex-wrap gap-2">
                {verticalList.slice(0, 5).map((v) => (
                  <Link
                    key={v.id}
                    href={`/${v.id}`}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                  >
                    {v.domain}
                  </Link>
                ))}
                <span className="text-xs px-2.5 py-1.5 text-muted-foreground">+4 more</span>
              </div>
            </div>
          </div>
          
          {/* Bottom stats */}
          <div className="pb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-3xl font-bold text-foreground">2.4M+</p>
                <p className="text-muted-foreground">Active Listings</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">180K+</p>
                <p className="text-muted-foreground">Cities Covered</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="md:col-span-8">
          {/* Hero Section - starts at top, aligned with sidebar */}
          <section className="relative p-sides pt-top-spacing pb-12">
            {/* Hero content first - visible at top */}
            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance">
                Find what you need.{' '}
                <span className="text-accent">Where you need it.</span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Search homes in SF, jobs in LA, cars in Chicago — all from one place,
                or go direct to any of our 9 specialized sites.
              </p>
              
              {/* Search bar */}
              <div className="mt-8 max-w-2xl">
                <HeroSearch placeholder="Search across all 9 sites..." />
              </div>
            </div>
          </section>

          {/* Featured Sites with Images */}
          <section className="p-sides py-16" id="network">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">The Network</h2>
                <p className="text-muted-foreground mt-1">Pick a site and dive in</p>
              </div>
              <Link 
                href="#all-sites" 
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                View all 9 sites
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            {/* Large featured cards with images */}
            <div className="grid gap-4 md:grid-cols-2">
              {featuredSites.slice(0, 2).map(({ id, image }) => {
                const v = verticals[id as keyof typeof verticals];
                return (
                  <Link
                    key={id}
                    href={`/${id}`}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={v.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div 
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                        style={{ backgroundColor: v.accent, color: '#000' }}
                      >
                        {v.domain}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{v.domain}</h3>
                      <p className="text-white/70 mt-1 text-sm">{v.tagline}</p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Smaller featured cards */}
            <div className="grid gap-4 md:grid-cols-3 mt-4">
              {featuredSites.slice(2).map(({ id, image }) => {
                const v = verticals[id as keyof typeof verticals];
                return (
                  <Link
                    key={id}
                    href={`/${id}`}
                    className="group relative aspect-[3/2] rounded-xl overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={v.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div 
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2"
                        style={{ backgroundColor: v.accent, color: '#000' }}
                      >
                        {v.domain}
                      </div>
                      <h3 className="text-lg font-bold text-white">{v.domain}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* All Sites Grid */}
          <section className="p-sides py-16 bg-card/30" id="all-sites">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">The Network</h2>
              <p className="text-muted-foreground mt-1">9 sites. Pick one and dive in.</p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verticalList.map((vertical) => (
                <VerticalCard key={vertical.id} verticalId={vertical.id} />
              ))}
            </div>
          </section>

          {/* Value Props */}
          <section className="p-sides py-16">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Search */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 mb-6">
                  <Search className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Search Anywhere</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Search from here and find results across all 9 sites, or go direct to 
                  GetSFHomes, GetLAJobs, or any specialized site.
                </p>
                <ul className="mt-6 space-y-2">
                  {['Cross-network AI search', 'Instant match alerts', 'One account everywhere'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Zap className="h-3.5 w-3.5 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Post */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 mb-6">
                  <Sparkles className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Post Smarter</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Our AI writes your listing description, picks the best categories, 
                  and routes it to the right site automatically.
                </p>
                <ul className="mt-6 space-y-2">
                  {['AI-generated descriptions', 'Auto-category routing', 'Cross-site visibility'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Trust section */}
          <section className="p-sides py-16 bg-card/30">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                One Network. One Trust System.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Your reputation travels with you. Verified on GetSFHomes? 
                You&apos;re verified on all 9 sites.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['Cross-Site Verification', 'AI Fraud Detection', 'Network Moderation'].map((badge) => (
                  <span 
                    key={badge}
                    className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground"
                  >
                    <Shield className="h-3.5 w-3.5" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="p-sides py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
                Pick a site. Start exploring.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Or search all 9 from right here
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {verticalList.map((v) => (
                  <Button 
                    key={v.id} 
                    variant="outline" 
                    size="lg"
                    className="text-sm"
                    style={{ borderColor: v.accent, color: v.accent }}
                    asChild
                  >
                    <Link href={`/${v.id}`}>{v.domain}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="p-sides pb-8">
            <div className="rounded-2xl bg-foreground text-background p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                      <Globe className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <span className="text-xl font-bold">
                      Get<span className="text-accent">Local</span>Ads
                    </span>
                  </div>
                  <p className="text-background/70 text-sm max-w-sm">
                    The unified network for local classified ads. 
                    AI-powered search, human-verified listings, trusted community.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-3">Property</p>
                  <ul className="space-y-2 text-sm text-background/70">
                    <li><Link href="/homes" className="hover:text-background transition-colors">{verticals.homes.domain}</Link></li>
                    <li><Link href="/apartments" className="hover:text-background transition-colors">{verticals.apartments.domain}</Link></li>
                    <li><Link href="/rentals" className="hover:text-background transition-colors">{verticals.rentals.domain}</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-3">Lifestyle</p>
                  <ul className="space-y-2 text-sm text-background/70">
                    <li><Link href="/jobs" className="hover:text-background transition-colors">{verticals.jobs.domain}</Link></li>
                    <li><Link href="/cars" className="hover:text-background transition-colors">{verticals.cars.domain}</Link></li>
                    <li><Link href="/events" className="hover:text-background transition-colors">{verticals.events.domain}</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-background/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-xs text-background/50">
                  &copy; {new Date().getFullYear()} GetLocalAds. All rights reserved.
                </p>
                <div className="flex gap-6 text-xs text-background/50">
                  <Link href="/about" className="hover:text-background transition-colors">About</Link>
                  <Link href="/privacy" className="hover:text-background transition-colors">Privacy</Link>
                  <Link href="/terms" className="hover:text-background transition-colors">Terms</Link>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
