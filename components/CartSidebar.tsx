'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, closeCart, totalPrice, totalItems } = useCart();

  if (!cart.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-navy" />
            <h2 className="text-lg font-bold text-navy">
              Your Cart{' '}
              <span className="text-gold text-sm font-normal">({totalItems} items)</span>
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-800"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mb-6">
                Looks like you haven&apos;t added anything yet.
              </p>
              <button
                onClick={closeCart}
                className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50 px-6">
              {cart.items.map((item) => {
                const itemKey = `${item.product.id}-${item.selectedVariant?.id || 'default'}`;
                return (
                  <div key={itemKey} className="py-4 flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={closeCart}
                      className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src={item.product.images[0].src}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="text-sm font-semibold text-gray-800 hover:text-navy transition-colors line-clamp-2 leading-tight"
                          >
                            {item.product.name}
                          </Link>
                          {item.selectedVariant && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.selectedVariant.name}: {item.selectedVariant.value}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedVariant?.id)
                          }
                          className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedVariant?.id
                              )
                            }
                            className="w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-navy hover:shadow-md transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-gray-700">
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
                            className="w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-navy hover:shadow-md transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-bold text-navy">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            {/* Free shipping progress */}
            {totalPrice < 50 && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Add ${(50 - totalPrice).toFixed(2)} more for free shipping</span>
                  <span>{Math.round((totalPrice / 50) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {totalPrice >= 50 && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <span className="text-green-500">✓</span>
                You qualify for free shipping!
              </div>
            )}

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={totalPrice >= 50 ? 'text-green-600 font-medium' : ''}>
                  {totalPrice >= 50 ? 'FREE' : '$5.99'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-navy text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="w-full bg-navy text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-navy-light transition-colors group shadow-lg shadow-navy/20"
            >
              Proceed to Checkout
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={closeCart}
              className="w-full text-gray-500 text-sm hover:text-navy transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
