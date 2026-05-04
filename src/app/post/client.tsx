'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ListingCreator } from '@/components/ai/listing-creator';

export function PostPageClient() {
  const handleComplete = (content: { title: string; description: string; highlights: string[]; tags: string[] }) => {
    // In a real app, this would save the listing or proceed to the next step
    console.log('Generated listing:', content);
    alert('Listing created! In a full app, this would be saved to the database.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-sides py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <Link href="/" className="text-xl font-bold text-foreground">
            GetLocalAds
          </Link>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Content */}
      <div className="px-sides pt-28 pb-16">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground">Create Your Listing</h1>
            <p className="mt-3 text-muted-foreground">
              Let AI craft the perfect description. Just tell us the basics and we&apos;ll handle the rest.
            </p>
          </div>

          <ListingCreator onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
}
