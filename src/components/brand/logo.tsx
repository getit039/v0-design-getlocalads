'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'wordmark';
}

export function GetLocalAdsLogo({ className, variant = 'full' }: LogoProps) {
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-8 w-8', className)}
      >
        <rect width="48" height="48" rx="12" fill="currentColor" className="text-accent" />
        <path
          d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 15.163 32.837 8 24 8ZM24 12C30.627 12 36 17.373 36 24C36 30.627 30.627 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12Z"
          fill="currentColor"
          className="text-accent-foreground"
        />
        <circle cx="24" cy="24" r="6" fill="currentColor" className="text-accent-foreground" />
        <path
          d="M24 14V18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
        <path
          d="M24 30V34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
        <path
          d="M14 24H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
        <path
          d="M30 24H34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
      </svg>
    );
  }

  if (variant === 'wordmark') {
    return (
      <span className={cn('font-bold tracking-tight', className)}>
        Get<span className="text-accent">Local</span>Ads
      </span>
    );
  }

  // Full logo
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 shrink-0"
      >
        <rect width="48" height="48" rx="12" fill="currentColor" className="text-accent" />
        <path
          d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 15.163 32.837 8 24 8ZM24 12C30.627 12 36 17.373 36 24C36 30.627 30.627 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12Z"
          fill="currentColor"
          className="text-accent-foreground"
        />
        <circle cx="24" cy="24" r="6" fill="currentColor" className="text-accent-foreground" />
        <path
          d="M24 14V18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
        <path
          d="M24 30V34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
        <path
          d="M14 24H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
        <path
          d="M30 24H34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent-foreground"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight text-foreground leading-none">
          Get<span className="text-accent">Local</span>Ads
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider leading-none mt-0.5">
          Classified Network
        </span>
      </div>
    </div>
  );
}
