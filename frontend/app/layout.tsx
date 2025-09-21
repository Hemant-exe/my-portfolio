import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hemant Rajpurohit - Blockchain Developer & Smart Contract Specialist',
  description: 'Experienced blockchain developer specializing in DeFi, NFTs, and smart contract development. Building secure, scalable decentralized applications on Ethereum, Sonic, and Solana.',
  keywords: ['blockchain developer', 'smart contracts', 'DeFi', 'NFTs', 'Ethereum', 'Solidity', 'Web3', 'cryptocurrency', 'decentralized applications'],
  authors: [{ name: 'Hemant Rajpurohit', url: 'https://github.com/Hemant-exe' }],
  creator: 'Hemant Rajpurohit',
  publisher: 'Hemant Rajpurohit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hemant-raj.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hemant Rajpurohit - Blockchain Developer & Smart Contract Specialist',
    description: 'Experienced blockchain developer specializing in DeFi, NFTs, and smart contract development. Building secure, scalable decentralized applications.',
    url: 'https://hemant-raj.vercel.app',
    siteName: 'Hemant Rajpurohit Portfolio',
    images: [
      {
        url: '/Picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Hemant Rajpurohit - Blockchain Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hemant Rajpurohit - Blockchain Developer & Smart Contract Specialist',
    description: 'Experienced blockchain developer specializing in DeFi, NFTs, and smart contract development.',
    images: ['/Picture.jpg'],
    creator: '@Hemant_Raj_17',
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
    google: 'your-google-verification-code', // Add your actual verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
