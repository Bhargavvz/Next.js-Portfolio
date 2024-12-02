import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import { Suspense } from 'react';
import CursorWrapper from '@/components/ui/CursorWrapper';
import GoToTop from '@/components/ui/GoToTop';
import LoadingAnimation from '@/components/LoadingAnimation';
import "./globals.css";
import { ToastProvider } from '@/contexts/ToastContext';

export const metadata: Metadata = {
  title: 'Bhargav Adepu',
  description: 'A showcase of my work and thoughts on software development',
  keywords: ["portfolio", "developer", "full stack", "Bhargav", "web development"],
  authors: [{ name: "Adepu Vaatsava Sri Bhargav" }],
  creator: "Adepu Vaatsava Sri Bhargav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#030014] text-white antialiased">
        <ToastProvider>
          <div className="relative">
            <Suspense fallback={<LoadingAnimation />}>
              {children}
            </Suspense>
            <GoToTop />
          </div>
          <CursorWrapper />
        </ToastProvider>
      </body>
    </html>
  );
}
