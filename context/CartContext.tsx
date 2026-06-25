'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { CartContextType, CartState, CartItem, Product, ProductVariant } from '@/types';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; variant?: ProductVariant } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; variantId?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; variantId?: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, variant } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant?.id === variant?.id
      );

      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: updatedItems, isOpen: true };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, selectedVariant: variant }],
        isOpen: true,
      };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, variantId } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.product.id === productId && item.selectedVariant?.id === variantId)
        ),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, variantId } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId && item.selectedVariant?.id === variantId)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId && item.selectedVariant?.id === variantId
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback(
    (product: Product, quantity = 1, variant?: ProductVariant) => {
      dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, variant } });
    },
    []
  );

  const removeFromCart = useCallback((productId: string, variantId?: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, variantId } });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantId?: string) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, variantId } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
