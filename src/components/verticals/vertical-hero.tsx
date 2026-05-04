'use client';

import { useState } from 'react';
import { Search, Sparkles, ArrowRight, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { verticals, type VerticalType } from '@/lib/verticals';

interface VerticalHeroProps {
  verticalId: VerticalType;
  className?: string;
}

export function VerticalHero({ verticalId, className }: VerticalHeroProps) {
  const vertical = verticals[verticalId];
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState(vertical.sampleLocations[0] || '');
  const [isFocused, setIsFocused] = useState(false);
  const Icon = vertical.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Search:', { query, location, vertical: vertical.id });
    }
  };

  return (
    <section
      className={cn('relative overflow-hidden', className)}
      style={{ '--vertical-accent': vertical.accent } as React.CSSProperties}
    >
      {/* Background with vertical accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${vertical.accent}, transparent)`,
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative px-sides pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-4xl">
          {/* Site branding */}
          <div className="flex flex-col items-center gap-3 mb-8">
            {/* Domain badge */}
            <div 
              className="flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ 
                borderColor: vertical.accent,
                backgroundColor: vertical.accentLight,
              }}
            >
              <Globe className="h-4 w-4" style={{ color: vertical.accent }} />
              <span 
                className="text-sm font-bold"
                style={{ color: vertical.accent }}
              >
                {vertical.domain}
              </span>
            </div>
            
            {/* Icon and name */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: vertical.accentLight }}
              >
                <Icon className="h-7 w-7" style={{ color: vertical.accent }} />
              </div>
              <div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: vertical.accent }}
                >
                  {vertical.shortDomain}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Part of the <Link href="/" className="underline hover:text-foreground">GetLocalAds</Link> Network
                </p>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            {vertical.tagline}
          </h1>

          {/* Description */}
          <p className="mt-4 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            {vertical.description}
          </p>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="mt-10">
            <div
              className={cn(
                'flex flex-col md:flex-row items-stretch md:items-center gap-3 rounded-2xl border bg-card/50 backdrop-blur-sm p-3 transition-all duration-300',
                isFocused
                  ? 'border-transparent shadow-lg'
                  : 'border-border hover:border-muted-foreground/30'
              )}
              style={{
                boxShadow: isFocused ? `0 0 40px -10px ${vertical.accent}` : undefined,
              }}
            >
              {/* Location selector */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/50 md:min-w-[180px]">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-sm text-foreground focus:outline-none cursor-pointer w-full"
                >
                  {vertical.sampleLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search input */}
              <div className="flex-1 flex items-center gap-3 px-4">
                <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 shrink-0">
                  <Sparkles className="h-3 w-3" style={{ color: vertical.accent }} />
                  <span className="text-xs font-medium" style={{ color: vertical.accent }}>
                    AI
                  </span>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={vertical.placeholder}
                  className="flex-1 bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                size="lg"
                className="rounded-xl px-6"
                style={{
                  backgroundColor: query.trim() ? vertical.accent : undefined,
                  color: query.trim() ? 'var(--background)' : undefined,
                }}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
                {query.trim() && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </form>

          {/* Quick categories */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {vertical.categories.slice(0, 6).map((category) => (
              <button
                key={category}
                className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
