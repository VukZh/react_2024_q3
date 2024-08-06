import type { Metadata } from 'next'

import '../index.css';

export const metadata: Metadata = {
  title: 'Rick and Morty Search',
  description: 'Search for Rick and Morty characters',
  icons: {
    icon: '/images/rm.png',
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
