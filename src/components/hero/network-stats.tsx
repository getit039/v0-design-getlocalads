import { TrendingUp, MapPin, Users, CheckCircle2 } from 'lucide-react';

const stats = [
  {
    label: 'Active Listings',
    value: '450K+',
    icon: TrendingUp,
    description: 'Updated daily',
  },
  {
    label: 'Cities Covered',
    value: '2,800+',
    icon: MapPin,
    description: 'Across the US',
  },
  {
    label: 'Monthly Users',
    value: '12M+',
    icon: Users,
    description: 'And growing',
  },
  {
    label: 'Verified Listings',
    value: '89%',
    icon: CheckCircle2,
    description: 'Quality assured',
  },
];

export function NetworkStats() {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card/30"
        >
          <stat.icon className="h-6 w-6 text-accent mb-3" />
          <div className="text-3xl font-bold text-foreground">{stat.value}</div>
          <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{stat.description}</div>
        </div>
      ))}
    </div>
  );
}
