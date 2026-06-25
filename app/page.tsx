import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Award, TrendingUp } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import CollectionCard from '@/components/CollectionCard';
import TrustBadges from '@/components/TrustBadges';
import Newsletter from '@/components/Newsletter';
import { products, collections, getBestsellers } from '@/data/products';

export const metadata: Metadata = {
  title: 'VennixStore - Elevate Your Space & Style',
  description:
    'Shop premium phone accessories and home decor at VennixStore. Curated products that elevate your everyday life.',
};

const stats = [
  { value: '50K+', label: 'Happy Customers', icon: Award },
  { value: '500+', label: 'Products', icon: TrendingUp },
  { value: '4.9/5', label: 'Average Rating', icon: Zap },
];

export default function HomePage() {
  const bestsellers = getBestsellers();
  const newArrivals = products.filter((p) => p.isNew);
  const phoneProducts = products.filter((p) => p.category === 'phone-accessories').slice(0, 4);
  const homeProducts = products.filter((p) => p.category === 'home-decor').slice(0, 4);

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Stats Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-navy">{stat.value}</div>
                  <div className="text-gray-500 text-xs sm:text-sm mt-0.5">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Shop By Category
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2 mb-3">
              Our Collections
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} large />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Most Loved
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2">Bestsellers</h2>
              <div className="w-16 h-1 bg-gold mt-3 rounded-full" />
            </div>
            <Link
              href="/collections"
              className="hidden sm:flex items-center gap-2 text-navy font-semibold text-sm hover:text-gold transition-colors group"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={bestsellers} columns={4} />

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-navy text-white font-bold px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="relative py-20 overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Our Promise
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 max-w-2xl mx-auto">
            Crafted for the Modern Lifestyle
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            Every product in our store is hand-selected for quality, durability, and design
            excellence. We believe premium shouldn&apos;t compromise on sustainability.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { number: '100%', label: 'Satisfaction Guaranteed' },
              { number: '30', label: 'Day Free Returns' },
              { number: '2-Day', label: 'Express Shipping' },
              { number: '24/7', label: 'Customer Support' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-gold text-2xl font-bold">{item.number}</div>
                <div className="text-gray-400 text-sm mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone Accessories Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Accessories
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2">Phone Accessories</h2>
              <div className="w-16 h-1 bg-gold mt-3 rounded-full" />
            </div>
            <Link
              href="/collections/phone-accessories"
              className="hidden sm:flex items-center gap-2 text-navy font-semibold text-sm hover:text-gold transition-colors group"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={phoneProducts} columns={4} />
        </div>
      </section>

      {/* Home Decor Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Decor
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2">Home Decor</h2>
              <div className="w-16 h-1 bg-gold mt-3 rounded-full" />
            </div>
            <Link
              href="/collections/home-decor"
              className="hidden sm:flex items-center gap-2 text-navy font-semibold text-sm hover:text-gold transition-colors group"
            >
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={homeProducts} columns={4} />
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Just Dropped
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2 mb-3">New Arrivals</h2>
              <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
            </div>
            <ProductGrid products={newArrivals} columns={4} />
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2 mb-3">
              What Our Customers Say
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah M.',
                location: 'New York, NY',
                rating: 5,
                text: 'The MagSafe charger is absolutely stunning. The build quality is premium and it charges my phone incredibly fast. Worth every penny!',
                product: 'MagSafe Wireless Charger Pro',
                avatar: 'https://picsum.photos/seed/avatar1/60/60',
              },
              {
                name: 'James R.',
                location: 'Austin, TX',
                rating: 5,
                text: 'The Nordic wall clock transformed my living room. The silent sweep mechanism means no ticking — perfect for a peaceful space.',
                product: 'Minimalist Wall Clock Nordic',
                avatar: 'https://picsum.photos/seed/avatar2/60/60',
              },
              {
                name: 'Emma L.',
                location: 'Seattle, WA',
                rating: 5,
                text: 'Super fast shipping and the leather phone case is even better in person. The Cognac Brown color is absolutely gorgeous.',
                product: 'Premium Leather Phone Case',
                avatar: 'https://picsum.photos/seed/avatar3/60/60',
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-gold fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-navy text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.location}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-400">Purchased: {review.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
