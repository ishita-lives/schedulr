import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/providers/auth';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TI Academy | Expert Tutoring Year 3-12',
  description: 'Specialized tutoring in English, Mathematics and Thinking Skills. Expert preparation for OC, NAPLAN, Selective, HAST and HSC examinations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}