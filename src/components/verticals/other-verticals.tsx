'use client';

import Link from 'next/link';
import { verticals, verticalList, type VerticalType } from '@/lib/verticals';

interface OtherVerticalsProps {
  currentVerticalId: VerticalType;
}

export function OtherVerticals({ currentVerticalId }: OtherVerticalsProps) {
  const otherVerticals = verticalList.filter((v) => v.id !== currentVerticalId).slice(0, 4);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {otherVerticals.map((v) => {
        const Icon = v.icon;
        return (
          <Link
            key={v.id}
            href={`/${v.id}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-transparent"
            style={{
              ['--hover-glow' as string]: v.accent,
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg shrink-0"
              style={{ backgroundColor: v.accentLight }}
            >
              <Icon className="h-6 w-6" style={{ color: v.accent }} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{v.shortDomain}</h3>
              <p className="text-xs text-muted-foreground truncate">{v.domain}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
