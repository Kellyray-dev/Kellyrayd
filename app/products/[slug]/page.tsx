'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductBySlug, products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ProductVariant } from '@/types';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.options.find((v) => v.inStock)
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');

  const { addToCart } = useCart();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedVariant);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link href="/collections" className="hover:text-navy transition-colors">
              Collections
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link
              href={`/collections/${product.category}`}
              className="hover:text-navy transition-colors"
            >
              {product.category === 'phone-accessories' ? 'Phone Accessories' : 'Home Decor'}
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-navy font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href={`/collections/${product.category}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-navy text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to{' '}
          {product.category === 'phone-accessories' ? 'Phone Accessories' : 'Home Decor'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src={product.images[selectedImage].src}
                alt={product.images[selectedImage].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isBestseller && (
                  <span className="bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    New Arrival
                  </span>
                )}
                {discount && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Save {discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx
                        ? 'border-navy shadow-md scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
                {product.category === 'phone-accessories' ? 'Phone Accessories' : 'Home Decor'}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? 'text-gold fill-gold'
                          : 'text-gray-200 fill-gray-200'
                      }
                    />
                  ))}
                </div>
                <span className="font-semibold text-navy text-sm">{product.rating}</span>
              </div>
              <span className="text-gray-400 text-sm">
                {product.reviewCount.toLocaleString()} reviews
              </span>
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 py-4 border-y border-gray-100">
              <span className="text-4xl font-bold text-navy">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-50 text-red-500 text-sm font-bold px-3 py-1 rounded-lg">
                    Save ${(product.compareAtPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>

            {/* Variants */}
            {product.variants && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-navy text-sm">
                    {product.variants.type}:{' '}
                    {selectedVariant && (
                      <span className="text-gold font-normal">{selectedVariant.value}</span>
                    )}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.options.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => variant.inStock && setSelectedVariant(variant)}
                      disabled={!variant.inStock}
                      className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        selectedVariant?.id === variant.id
                          ? 'border-navy bg-navy text-white shadow-md'
                          : variant.inStock
                          ? 'border-gray-200 text-gray-700 hover:border-navy hover:text-navy'
                          : 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                      }`}
                    >
                      {variant.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-navy hover:shadow-md transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center font-bold text-navy text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-navy hover:shadow-md transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={`flex-1 flex items-center justify-center gap-2.5 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg ${
                  isAdding
                    ? 'bg-green-500 text-white shadow-green-500/20'
                    : product.inStock
                    ? 'bg-navy text-white hover:bg-navy-light shadow-navy/20 active:scale-[0.98]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isAdding ? (
                  <>
                    <Check size={18} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                  isWishlisted
                    ? 'border-red-300 bg-red-50 text-red-500'
                    : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors">
              <Share2 size={15} />
              Share this product
            </button>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              {[
                {
                  icon: Truck,
                  title: 'Free Shipping',
                  desc: 'On orders over $50. Standard: 3-5 days.',
                },
                {
                  icon: RotateCcw,
                  title: '30-Day Returns',
                  desc: 'Easy hassle-free returns, no questions asked.',
                },
                {
                  icon: Shield,
                  title: 'Secure Checkout',
                  desc: '100% encrypted and secure transactions.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-navy" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              {(['description', 'features', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-semibold capitalize transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? 'border-navy text-navy'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-3xl">
                <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={13} className="text-gold" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                {/* Rating Summary */}
                <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-navy">{product.rating}</div>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-4">{star}</span>
                          <Star size={10} className="text-gold fill-gold" />
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Reviews */}
                {[
                  {
                    name: 'Alex P.',
                    rating: 5,
                    date: '2 weeks ago',
                    text: 'Absolutely love this product! The quality exceeded my expectations. Would highly recommend to anyone looking for premium quality.',
                  },
                  {
                    name: 'Maria S.',
                    rating: 5,
                    date: '1 month ago',
                    text: 'Fast shipping, beautiful packaging, and the product itself is stunning. This is exactly what I was looking for.',
                  },
                  {
                    name: 'David K.',
                    rating: 4,
                    date: '6 weeks ago',
                    text: 'Great quality and looks exactly like the photos. Only giving 4 stars because shipping took a bit longer than expected.',
                  },
                ].map((review) => (
                  <div key={review.name} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-navy text-sm">{review.name}</p>
                          <p className="text-gray-400 text-xs">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={13} className="text-gold fill-gold" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-100 pt-14">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                  You May Also Like
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-1">Related Products</h2>
              </div>
              <Link
                href={`/collections/${product.category}`}
                className="text-sm text-navy font-medium hover:text-gold transition-colors flex items-center gap-1"
              >
                View All
                <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
