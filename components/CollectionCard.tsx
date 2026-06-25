import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
  large?: boolean;
}

export default function CollectionCard({ collection, large = false }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={`group relative overflow-hidden rounded-2xl block ${
        large ? 'aspect-[4/3]' : 'aspect-square'
      }`}
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
          {collection.productCount} Products
        </p>
        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">{collection.name}</h3>
        <p className="text-gray-300 text-sm mb-4 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {collection.description}
        </p>
        <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all duration-200">
          Shop Collection
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
