import React from 'react';
import { Truck, Shield, RotateCcw, Star, Headphones, CreditCard } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $50',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% encrypted checkout',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Curated top-tier products',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert help anytime',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Buy now, pay later options',
  },
];

interface TrustBadgesProps {
  compact?: boolean;
}

export default function TrustBadges({ compact = false }: TrustBadgesProps) {
  const displayBadges = compact ? badges.slice(0, 4) : badges;

  return (
    <section className="bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div
          className={`grid gap-6 ${
            compact
              ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          {displayBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-1 group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                  <Icon size={22} className="text-navy" />
                </div>
                <h3 className="font-semibold text-navy text-sm">{badge.title}</h3>
                <p className="text-gray-500 text-xs leading-snug">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
