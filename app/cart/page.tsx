'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Tag, Check, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const tax = (totalPrice - discount) * 0.08;
  const total = totalPrice - discount + shipping + tax;

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'VENNIX10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try VENNIX10');
      setPromoApplied(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven&apos;t added anything to your cart yet. Start exploring our
            collections!
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-navy-light transition-colors shadow-lg shadow-navy/20"
          >
            <ShoppingBag size={18} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy">
                Shopping Cart{' '}
                <span className="text-gray-400 text-base font-normal">({totalItems} items)</span>
              </h1>
            </div>
            <Link
              href="/collections"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const itemKey = `${item.product.id}-${item.selectedVariant?.id || 'default'}`;
              return (
                <div
                  key={itemKey}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex gap-5"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0"
                  >
                    <Image
                      src={item.product.images[0].src}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                          {item.product.category === 'phone-accessories'
                            ? 'Phone Accessories'
                            : 'Home Decor'}
                        </p>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-base font-semibold text-navy hover:text-gold transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        {item.selectedVariant && (
                          <p className="text-sm text-gray-500 mt-0.5">
                            {item.selectedVariant.name}: {item.selectedVariant.value}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedVariant?.id)
                        }
                        className="text-gray-300 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-navy transition-all hover:shadow-md"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-navy text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-navy transition-all hover:shadow-md"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-navy text-lg">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart */}
            <div className="flex justify-end pt-2">
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Remove all items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-navy mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoError('');
                      }}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                    />
                  </div>
                  <button
                    onClick={handlePromoCode}
                    disabled={promoApplied}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      promoApplied
                        ? 'bg-green-100 text-green-600'
                        : 'bg-navy text-white hover:bg-navy-light'
                    }`}
                  >
                    {promoApplied ? <Check size={16} /> : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1">
                    <Check size={12} />
                    VENNIX10 applied — 10% off!
                  </p>
                )}
                {promoError && (
                  <p className="text-red-500 text-xs mt-1.5">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="font-bold text-navy text-lg">Total</span>
                <span className="font-bold text-navy text-2xl">${total.toFixed(2)}</span>
              </div>

              {/* Free Shipping Progress */}
              {totalPrice < 50 && (
                <div className="py-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Add ${(50 - totalPrice).toFixed(2)} for free shipping</span>
                    <span>{Math.round((totalPrice / 50) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button className="w-full bg-navy text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 hover:bg-navy-light transition-colors group shadow-lg shadow-navy/20">
                Checkout
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Security */}
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
                <Lock size={12} />
                <span>Secure 256-bit SSL encrypted checkout</span>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {['Visa', 'MC', 'Amex', 'PayPal', 'ApplePay'].map((method) => (
                  <div
                    key={method}
                    className="bg-gray-50 border border-gray-200 text-gray-400 text-xs px-2 py-1 rounded font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
