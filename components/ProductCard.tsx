'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestseller && (
            <span className="bg-navy text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-gold text-navy text-xs font-bold px-2.5 py-1 rounded-full">
              New
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-9 h-9 rounded-full bg-white text-gray-600 hover:bg-navy hover:text-white flex items-center justify-center shadow-md transition-all duration-200"
            aria-label="View product"
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Quick Add Button */}
        {showQuickAdd && (
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200 ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-navy text-white hover:bg-navy-light'
              }`}
            >
              <ShoppingBag size={16} />
              {isAdding ? 'Added!' : 'Quick Add'}
            </button>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1.5">
          {product.category === 'phone-accessories' ? 'Phone Accessories' : 'Home Decor'}
        </p>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-navy transition-colors text-sm leading-snug mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-navy text-lg">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-gray-400 text-sm line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Variants indicator */}
        {product.variants && (
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="text-xs text-gray-400">{product.variants.type}:</span>
            <div className="flex items-center gap-1">
              {product.variants.options.slice(0, 4).map((opt) => (
                <div
                  key={opt.id}
                  className={`w-4 h-4 rounded-full border border-gray-200 text-xs ${
                    !opt.inStock ? 'opacity-40' : ''
                  }`}
                  style={{
                    backgroundColor:
                      opt.value.toLowerCase().includes('black')
                        ? '#1a1a1a'
                        : opt.value.toLowerCase().includes('white') || opt.value.toLowerCase().includes('cream') || opt.value.toLowerCase().includes('pearl')
                        ? '#f5f5f5'
                        : opt.value.toLowerCase().includes('brown') || opt.value.toLowerCase().includes('cognac') || opt.value.toLowerCase().includes('walnut') || opt.value.toLowerCase().includes('terracotta') || opt.value.toLowerCase().includes('rust')
                        ? '#8B4513'
                        : opt.value.toLowerCase().includes('gold') || opt.value.toLowerCase().includes('tan') || opt.value.toLowerCase().includes('desert') || opt.value.toLowerCase().includes('sand')
                        ? '#D4AF37'
                        : opt.value.toLowerCase().includes('navy') || opt.value.toLowerCase().includes('blue') || opt.value.toLowerCase().includes('ocean')
                        ? '#0F1729'
                        : opt.value.toLowerCase().includes('green') || opt.value.toLowerCase().includes('sage') || opt.value.toLowerCase().includes('forest')
                        ? '#5C7A5C'
                        : '#e0e0e0',
                  }}
                  title={opt.value}
                />
              ))}
              {product.variants.options.length > 4 && (
                <span className="text-xs text-gray-400">+{product.variants.options.length - 4}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
