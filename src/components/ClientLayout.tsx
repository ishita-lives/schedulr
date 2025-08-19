'use client';

import Navigation from '@/components/Navigation';
import Providers from '@/components/Providers';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Navigation />
      {children}
    </Providers>
  );
} 