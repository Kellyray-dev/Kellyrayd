import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Leaf, Award, Users } from 'lucide-react';
import Newsletter from '@/components/Newsletter';

export const metadata: Metadata = {
  title: 'About VennixStore - Our Story',
  description:
    'Learn about VennixStore — our mission to bring premium phone accessories and home decor to everyday life.',
};

const values = [
  {
    icon: Award,
    title: 'Premium Quality',
    description:
      'Every product undergoes rigorous quality testing. We source only from manufacturers who share our commitment to excellence.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Our customers are at the heart of everything we do. From product selection to after-sales support, your satisfaction drives us.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'We prioritize eco-friendly packaging and work with manufacturers who practice responsible production methods.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'VennixStore is more than a store — it\'s a community of people who appreciate thoughtful design and quality products.',
  },
];

const team = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & CEO',
    bio: 'Former designer at Apple with 12 years in product development. Founded VennixStore to make premium products accessible.',
    image: 'https://picsum.photos/seed/team1/300/300',
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Curation',
    bio: 'Interior designer turned buyer. Marcus travels globally to discover the most innovative and beautiful products.',
    image: 'https://picsum.photos/seed/team2/300/300',
  },
  {
    name: 'Sophia Rodriguez',
    role: 'Customer Experience',
    bio: 'Ensures every VennixStore customer receives the premium shopping experience they deserve.',
    image: 'https://picsum.photos/seed/team3/300/300',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-navy text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/about-hero/1400/700"
            alt="VennixStore story"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Our Story
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl mx-auto">
            Elevate Your Space & Style
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            We believe that the objects around you shape how you feel. VennixStore was born from a
            passion for products that make everyday life more beautiful.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2 mb-6">
                Thoughtfully Curated for the Modern Life
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, VennixStore began with a simple observation: quality products
                  that enhance daily life are often hard to find. Designer items sit behind
                  boutique walls while affordable alternatives sacrifice quality and aesthetics.
                </p>
                <p>
                  We set out to bridge that gap. By working directly with manufacturers and
                  artisans around the world, we&apos;re able to bring you genuinely premium
                  products at prices that make sense.
                </p>
                <p>
                  Today, we serve over 50,000 customers in 30+ countries, all united by an
                  appreciation for beautiful, functional products that truly elevate everyday life.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 bg-navy text-white font-bold px-7 py-3.5 rounded-xl hover:bg-navy-light transition-colors shadow-lg shadow-navy/20 group"
                >
                  Explore Our Collections
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/about-mission/700/700"
                  alt="Our mission"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '50K+', label: 'Customers' },
                    { value: '30+', label: 'Countries' },
                    { value: '4.9★', label: 'Rating' },
                    { value: '2020', label: 'Founded' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl font-bold text-navy">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2 mb-3">Our Values</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-navy" />
                  </div>
                  <h3 className="font-bold text-navy mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              The People
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2 mb-3">Meet Our Team</h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden mb-5 shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="144px"
                  />
                </div>
                <h3 className="font-bold text-navy text-lg">{member.name}</h3>
                <p className="text-gold text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Elevate Your Life?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Browse our curated collection of premium products and find your perfect match.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/collections/phone-accessories"
              className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-7 py-3.5 rounded-xl hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 group"
            >
              Shop Accessories
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/collections/home-decor"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Shop Home Decor
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
