import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Wedfolio | Royal Wedding Creations',
  description: 'A premium, multi-tenant wedding website creation platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col font-serif bg-[#FDFBF7] text-stone-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
