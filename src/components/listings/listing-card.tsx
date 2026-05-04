'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Clock, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, type Listing } from '@/lib/types/listings';
import { verticals } from '@/lib/verticals';

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

export function ListingCard({ listing, className }: ListingCardProps) {
  const vertical = verticals[listing.vertical];
  const timeAgo = getTimeAgo(listing.postedAt);

  return (
    <Link
      href={`/${listing.vertical}/listing/${listing.id}`}
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300',
        'hover:border-transparent hover:shadow-lg',
        className
      )}
      style={{
        '--card-accent': vertical.accent,
      } as React.CSSProperties}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={listing.images[0] || '/placeholder.svg'}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.featured && (
            <span
              className="rounded-md px-2 py-1 text-xs font-bold uppercase"
              style={{ backgroundColor: vertical.accent, color: 'var(--background)' }}
            >
              Featured
            </span>
          )}
          {listing.verified && (
            <span className="flex items-center gap-1 rounded-md bg-background/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-foreground">
              <BadgeCheck className="h-3 w-3" style={{ color: vertical.accent }} />
              Verified
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground transition-colors hover:text-foreground"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Save to favorites
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Price */}
        {listing.price !== undefined && (
          <div
            className="text-xl font-bold"
            style={{ color: vertical.accent }}
          >
            {formatPrice(listing.price, listing.priceType)}
          </div>
        )}

        {/* Title */}
        <h3 className="mt-1 font-semibold text-foreground line-clamp-2 group-hover:underline">
          {listing.title}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>
            {listing.location.neighborhood
              ? `${listing.location.neighborhood}, ${listing.location.city}`
              : `${listing.location.city}, ${listing.location.state}`}
          </span>
        </div>

        {/* Features preview */}
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(listing.features)
            .slice(0, 3)
            .map(([key, value]) => (
              <span
                key={key}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {typeof value === 'boolean' ? key : `${value} ${key}`}
              </span>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timeAgo}</span>
          </div>
          <span className="capitalize">{listing.category}</span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${vertical.accent}, 0 0 30px -10px ${vertical.accent}`,
        }}
      />
    </Link>
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
