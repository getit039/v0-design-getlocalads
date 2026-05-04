'use client';

import Link from 'next/link';
import { ArrowUpRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { verticals, type VerticalType } from '@/lib/verticals';

interface VerticalCardProps {
  verticalId: VerticalType;
  className?: string;
}

export function VerticalCard({ verticalId, className }: VerticalCardProps) {
  const vertical = verticals[verticalId];
  const Icon = vertical.icon;

  return (
    <Link
      href={`/${vertical.id}`}
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300',
        'hover:border-transparent hover:scale-[1.02]',
        `hover:glow-${vertical.id}`,
        className
      )}
      style={{
        '--card-accent': vertical.accent,
        '--card-accent-light': vertical.accentLight,
      } as React.CSSProperties}
    >
      {/* Domain header bar */}
      <div 
        className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50"
        style={{ backgroundColor: vertical.accentLight }}
      >
        <Globe className="h-3.5 w-3.5" style={{ color: vertical.accent }} />
        <span 
          className="text-xs font-semibold tracking-wide"
          style={{ color: vertical.accent }}
        >
          {vertical.domain}
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 ml-auto opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{ color: vertical.accent }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Icon and title row */}
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg shrink-0 transition-colors duration-300"
            style={{ backgroundColor: vertical.accentLight }}
          >
            <Icon
              className="h-6 w-6 transition-colors duration-300"
              style={{ color: vertical.accent }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground">{vertical.domain}</h3>
            <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
              {vertical.tagline}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-auto pt-4 flex items-center gap-4 text-xs">
          <div>
            <span
              className="font-bold"
              style={{ color: vertical.accent }}
            >
              {vertical.stats.listings}
            </span>
            <span className="text-muted-foreground ml-1">listings</span>
          </div>
          <div className="h-3 w-px bg-border" />
          <div>
            <span
              className="font-bold"
              style={{ color: vertical.accent }}
            >
              {vertical.stats.cities}
            </span>
            <span className="text-muted-foreground ml-1">cities</span>
          </div>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top, ${vertical.accentLight}, transparent 70%)`,
        }}
      />
    </Link>
  );
}
