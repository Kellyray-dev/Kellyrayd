'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { Product } from '@/types';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'Collections',
      href: '/collections',
      children: [
        { label: 'All Products', href: '/collections' },
        { label: 'Phone Accessories', href: '/collections/phone-accessories' },
        { label: 'Home Decor', href: '/collections/home-decor' },
      ],
    },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-navy text-white text-center py-2 text-sm font-medium tracking-wide">
        <span className="text-gold">Free Shipping</span> on orders over $50 | Use code{' '}
        <span className="text-gold font-bold">VENNIX10</span> for 10% off
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-navy rounded-sm flex items-center justify-center">
                <span className="text-gold font-bold text-sm">V</span>
              </div>
              <div>
                <span className="text-navy font-bold text-xl tracking-tight">Vennix</span>
                <span className="text-gold font-bold text-xl tracking-tight">Store</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-navy font-medium text-sm tracking-wide transition-colors duration-200 py-6"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>
                  {link.children && (
                    <div className="absolute top-full left-0 w-52 bg-white shadow-xl border border-gray-100 rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-navy hover:bg-gray-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-navy transition-colors rounded-lg hover:bg-gray-50"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                        autoFocus
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <div className="mt-2 divide-y divide-gray-50">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="flex items-center gap-3 py-2.5 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={product.images[0].src}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</p>
                              <p className="text-xs text-gold font-semibold">${product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchQuery.length > 1 && searchResults.length === 0 && (
                      <p className="text-sm text-gray-500 py-3 text-center">No products found</p>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-navy transition-colors rounded-lg hover:bg-gray-50"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-navy text-xs font-bold rounded-full flex items-center justify-center animate-bounce-soft">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-navy transition-colors rounded-lg hover:bg-gray-50"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-up">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <Link
                href="/"
                className="block py-3 px-4 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="block py-3 px-4 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Collections
              </Link>
              <Link
                href="/collections/phone-accessories"
                className="block py-3 px-4 pl-8 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-lg text-sm transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Phone Accessories
              </Link>
              <Link
                href="/collections/home-decor"
                className="block py-3 px-4 pl-8 text-gray-600 hover:text-navy hover:bg-gray-50 rounded-lg text-sm transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home Decor
              </Link>
              <Link
                href="/about"
                className="block py-3 px-4 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/cart"
                className="block py-3 px-4 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart ({totalItems})
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search overlay backdrop */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
          }}
        />
      )}
    </>
  );
}
