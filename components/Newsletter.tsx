'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-14 h-14 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={26} className="text-gold" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration
            delivered straight to your inbox.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              'Exclusive member discounts',
              'Early access to new products',
              'Style tips & inspiration',
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-gray-400 text-sm">
                <Check size={14} className="text-gold" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 animate-fade-in">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check size={28} className="text-green-400" />
              </div>
              <h3 className="text-white text-xl font-semibold">You&apos;re in!</h3>
              <p className="text-gray-400">
                Thanks for subscribing. Check your inbox for a welcome discount.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-500 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-gold text-navy font-bold px-6 py-4 rounded-xl hover:bg-gold-light transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg shadow-gold/20 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-gray-600 text-xs mt-4">
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
