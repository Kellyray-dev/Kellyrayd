export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  inStock: boolean;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: 'phone-accessories' | 'home-decor';
  images: ProductImage[];
  variants?: {
    type: string;
    options: ProductVariant[];
  };
  tags: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}
