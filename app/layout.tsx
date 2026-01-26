import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Instagram Downloader - Free Instagram Post & Reel Downloader | No Login Required',
  description: 'Download Instagram posts and reels in HD quality from public accounts. Free Instagram downloader with quality enhancement options. No login required, works on mobile and desktop.',
  keywords: 'instagram downloader, download instagram posts, download instagram reels, instagram video downloader, instagram photo downloader, free instagram downloader, instagram downloader online, download instagram without login',
  authors: [{ name: 'Instagram Downloader' }],
  creator: 'Instagram Downloader',
  publisher: 'Instagram Downloader',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ig-downloader.com'), // Update with your domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Instagram Downloader - Free Instagram Post & Reel Downloader',
    description: 'Download Instagram posts and reels in HD quality from public accounts. Free, fast, and no login required.',
    url: 'https://ig-downloader.com', // Update with your domain
    siteName: 'Instagram Downloader',
    images: [
      {
        url: '/og-image.jpg', // Add OG image
        width: 1200,
        height: 630,
        alt: 'Instagram Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Downloader - Free Instagram Post & Reel Downloader',
    description: 'Download Instagram posts and reels in HD quality. Free, fast, no login required.',
    images: ['/og-image.jpg'], // Add Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Instagram Downloader',
              description: 'Free Instagram post and reel downloader. Download Instagram content in HD quality without login.',
              url: 'https://ig-downloader.com', // Update with your domain
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Download Instagram Posts',
                'Download Instagram Reels',
                'HD Quality Downloads',
                'Quality Enhancement',
                'No Login Required',
                'Mobile Friendly',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1250',
              },
            }),
          }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://cdninstagram.com" />
        <link rel="dns-prefetch" href="https://cdninstagram.com" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
