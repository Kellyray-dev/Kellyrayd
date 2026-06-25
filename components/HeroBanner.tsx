'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: 'New Collection',
    title: 'Elevate Your\nMobile Life',
    subtitle: 'Discover premium phone accessories engineered for style and performance.',
    cta: 'Shop Phone Accessories',
    href: '/collections/phone-accessories',
    image: 'https://picsum.photos/seed/hero-phone/1200/700',
    accent: 'Phone Accessories',
  },
  {
    id: 2,
    tag: 'Home Collection',
    title: 'Transform Your\nLiving Space',
    subtitle: 'Curated home decor pieces that bring warmth, beauty, and elegance to every room.',
    cta: 'Shop Home Decor',
    href: '/collections/home-decor',
    image: 'https://picsum.photos/seed/hero-home/1200/700',
    accent: 'Home Decor',
  },
  {
    id: 3,
    tag: 'Bestsellers',
    title: 'Fan Favorites\nYou\'ll Love',
    subtitle: 'Our most-loved products, handpicked by thousands of happy customers worldwide.',
    cta: 'View Bestsellers',
    href: '/collections',
    image: 'https://picsum.photos/seed/hero-best/1200/700',
    accent: 'Bestsellers',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden bg-navy">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div
          className={`max-w-2xl transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-px bg-gold" />
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {slide.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < slide.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-lg hover:bg-gold-light transition-all duration-200 group shadow-lg shadow-gold/20"
            >
              {slide.cta}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-8 h-2 bg-gold'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 text-white/60 text-sm font-medium">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  );
}
