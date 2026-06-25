import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import TrustBadges from '@/components/TrustBadges';
import { getProductsByCategory } from '@/data/products';

export const metadata: Metadata = {
  title: 'Phone Accessories - Premium Mobile Accessories',
  description:
    'Shop our premium collection of phone accessories including wireless chargers, cases, screen protectors, and more.',
};

export default function PhoneAccessoriesPage() {
  const phoneProducts = getProductsByCategory('phone-accessories');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-navy text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            All Collections
          </Link>
          <div className="max-w-2xl">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
              Collection
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Phone Accessories</h1>
            <p className="text-gray-400 text-lg">
              Premium mobile accessories engineered to complement your lifestyle. From ultra-fast
              charging to stylish protection — we&apos;ve got every need covered.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: '8 Products', icon: '📦' },
              { label: 'Free Shipping $50+', icon: '🚚' },
              { label: '30-Day Returns', icon: '↩️' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-500 text-sm">{phoneProducts.length} products</p>
          <div className="flex flex-wrap gap-2">
            {['Charging', 'Cases', 'Protection', 'Mounts', 'Audio'].map((tag) => (
              <button
                key={tag}
                className="text-xs border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:border-navy hover:text-navy transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid products={phoneProducts} columns={4} />
      </div>

      {/* Trust Badges */}
      <TrustBadges compact />
    </div>
  );
}
