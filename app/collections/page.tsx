'use client';

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, X, Grid3X3, List } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Product } from '@/types';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function CollectionsPage() {
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter((p) => p.price <= maxPrice);

    // Bestseller filter
    if (showBestsellersOnly) {
      filtered = filtered.filter((p) => p.isBestseller);
    }

    // New filter
    if (showNewOnly) {
      filtered = filtered.filter((p) => p.isNew);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, sortBy, showBestsellersOnly, showNewOnly, maxPrice]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    showBestsellersOnly,
    showNewOnly,
    maxPrice < 200,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setShowBestsellersOnly(false);
    setShowNewOnly(false);
    setMaxPrice(200);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-navy text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Browse
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">All Collections</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Discover our complete range of premium phone accessories and home decor.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-navy hover:text-navy transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-navy text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-navy flex items-center gap-1 transition-colors"
              >
                <X size={14} />
                Clear all
              </button>
            )}

            <span className="text-gray-500 text-sm">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-navy'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-navy'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List size={16} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-gray-700 hover:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors bg-white cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {isFilterOpen && (
            <div className="w-64 flex-shrink-0 space-y-6 animate-slide-up">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-navy text-sm mb-3 uppercase tracking-wider">
                  Category
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Products' },
                    { value: 'phone-accessories', label: 'Phone Accessories' },
                    { value: 'home-decor', label: 'Home Decor' },
                  ].map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={() => setSelectedCategory(cat.value)}
                        className="w-4 h-4 accent-navy"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-navy transition-colors">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-navy text-sm mb-3 uppercase tracking-wider">
                  Max Price: <span className="text-gold">${maxPrice}</span>
                </h3>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-navy"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$10</span>
                  <span>$200</span>
                </div>
              </div>

              {/* Availability Filters */}
              <div>
                <h3 className="font-semibold text-navy text-sm mb-3 uppercase tracking-wider">
                  Filters
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showBestsellersOnly}
                      onChange={(e) => setShowBestsellersOnly(e.target.checked)}
                      className="w-4 h-4 rounded accent-navy"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-navy transition-colors">
                      Bestsellers only
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showNewOnly}
                      onChange={(e) => setShowNewOnly(e.target.checked)}
                      className="w-4 h-4 rounded accent-navy"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-navy transition-colors">
                      New arrivals only
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal size={24} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) =>
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <ListProductCard key={product.id} product={product} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListProductCard({ product }: { product: Product }) {
  const { addToCart } = require('@/context/CartContext').useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="flex gap-5 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <a href={`/products/${product.slug}`} className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
      </a>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              {product.category === 'phone-accessories' ? 'Phone Accessories' : 'Home Decor'}
            </p>
            <a href={`/products/${product.slug}`} className="text-lg font-semibold text-navy hover:text-gold transition-colors">
              {product.name}
            </a>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-bold text-navy">${product.price.toFixed(2)}</div>
            {product.compareAtPrice && (
              <div className="text-sm text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</div>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.shortDescription}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
              isAdding ? 'bg-green-500 text-white' : 'bg-navy text-white hover:bg-navy-light'
            }`}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
