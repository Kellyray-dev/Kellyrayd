import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

export const metadata: Metadata = {
  title: {
    default: 'VennixStore - Elevate Your Space & Style',
    template: '%s | VennixStore',
  },
  description:
    'Premium phone accessories and home decor products. Elevate your space and style with VennixStore.',
  keywords: [
    'phone accessories',
    'home decor',
    'premium',
    'wireless charger',
    'wall clock',
    'vennixstore',
  ],
  authors: [{ name: 'VennixStore' }],
  creator: 'VennixStore',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vennixstore.com',
    siteName: 'VennixStore',
    title: 'VennixStore - Elevate Your Space & Style',
    description:
      'Premium phone accessories and home decor products. Shop our curated collection.',
    images: [
      {
        url: 'https://picsum.photos/seed/og-image/1200/630',
        width: 1200,
        height: 630,
        alt: 'VennixStore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VennixStore - Elevate Your Space & Style',
    description: 'Premium phone accessories and home decor products.',
    images: ['https://picsum.photos/seed/og-image/1200/630'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
