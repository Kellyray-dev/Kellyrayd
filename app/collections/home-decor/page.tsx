import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import TrustBadges from '@/components/TrustBadges';
import { getProductsByCategory } from '@/data/products';

export const metadata: Metadata = {
  title: 'Home Decor - Curated Interior Design Pieces',
  description:
    'Discover our curated collection of home decor products. Minimalist wall clocks, ceramic vases, candles, and more.',
};

export default function HomeDecorPage() {
  const homeProducts = getProductsByCategory('home-decor');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-navy text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold rounded-full filter blur-3xl" />
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Home Decor</h1>
            <p className="text-gray-400 text-lg">
              Transform your living space with our curated selection of premium home decor.
              Artisan-crafted pieces that bring warmth, beauty, and intention to every room.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: '8 Products', icon: '🏡' },
              { label: 'Handcrafted Quality', icon: '✨' },
              { label: 'Gift Ready', icon: '🎁' },
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
          <p className="text-gray-500 text-sm">{homeProducts.length} products</p>
          <div className="flex flex-wrap gap-2">
            {['Clocks', 'Vases', 'Lighting', 'Candles', 'Pillows', 'Storage', 'Art'].map((tag) => (
              <button
                key={tag}
                className="text-xs border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:border-navy hover:text-navy transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid products={homeProducts} columns={4} />
      </div>

      {/* Trust Badges */}
      <TrustBadges compact />
    </div>
  );
}
