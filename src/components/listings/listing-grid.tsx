import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ListingCard } from './listing-card';
import type { Listing } from '@/lib/types/listings';

interface ListingGridProps {
  listings: Listing[];
  className?: string;
  emptyMessage?: string;
}

export function ListingGrid({ listings, className, emptyMessage = 'No listings found' }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{emptyMessage}</h3>
        <p className="mt-2 text-muted-foreground max-w-md">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
