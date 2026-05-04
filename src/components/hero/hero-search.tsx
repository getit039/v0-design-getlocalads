'use client';

import { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSearchProps {
  placeholder?: string;
  className?: string;
}

export function HeroSearch({ placeholder = 'Search anything...', className }: HeroSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // TODO: Implement AI search
      console.log('Search query:', query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative w-full max-w-2xl mx-auto',
        className
      )}
    >
      <div
        className={cn(
          'relative flex items-center rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-300',
          isFocused
            ? 'border-accent shadow-lg shadow-accent/20'
            : 'border-border hover:border-muted-foreground/30'
        )}
      >
        {/* AI indicator */}
        <div className="flex items-center gap-2 pl-5 pr-3 py-4">
          <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">AI</span>
          </div>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-4 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        {/* Submit button */}
        <div className="pr-2.5">
          <Button
            type="submit"
            size="lg"
            className={cn(
              'rounded-xl px-5 transition-all duration-300',
              query.trim()
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'bg-secondary text-secondary-foreground'
            )}
          >
            <Search className="h-5 w-5 mr-2" />
            Search
            {query.trim() && (
              <ArrowRight className="h-4 w-4 ml-2 animate-pulse" />
            )}
          </Button>
        </div>
      </div>

      {/* Helper text */}
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Try: &quot;3 bed home with pool under $500k in Oakland&quot; or &quot;Remote marketing jobs $100k+&quot;
      </p>
    </form>
  );
}
