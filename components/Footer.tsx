import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center">
                <span className="text-navy font-bold text-sm">V</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                Vennix<span className="text-gold">Store</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevate your space and style with our carefully curated collection of premium phone
              accessories and home decor products.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-gold mb-5">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Products', href: '/collections' },
                { label: 'Phone Accessories', href: '/collections/phone-accessories' },
                { label: 'Home Decor', href: '/collections/home-decor' },
                { label: 'Bestsellers', href: '/collections?filter=bestseller' },
                { label: 'New Arrivals', href: '/collections?filter=new' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-gold mb-5">Help</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Shipping & Returns', href: '/shipping' },
                { label: 'Track Order', href: '/track' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-gold mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Commerce Street<br />San Francisco, CA 94102
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:+14155551234" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +1 (415) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:hello@vennixstore.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  hello@vennixstore.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} VennixStore. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-xs">Secure payments via:</span>
            <div className="flex items-center gap-2">
              {['Visa', 'MC', 'Amex', 'PayPal'].map((card) => (
                <div
                  key={card}
                  className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded font-medium"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
