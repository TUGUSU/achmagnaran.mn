import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Ачмаг Наран ХХК — Шинэлэг Бүхнийг Хүн Бүрт',
  description: 'Ачмаг Наран ХХК нь 2014 оноос хойш Монголын мах, махан бүтээгдэхүүний зах зээлд тасралтгүй үйл ажиллагаа явуулж, гахайн махны зах зээлийн 20 гаруй хувийг эзэлдэг тэргүүлэгч компани.',
  keywords: ['Ачмаг Наран', 'мах', 'махан бүтээгдэхүүн', 'гахайн мах', 'тахиан мах', 'Монгол', 'нийлүүлэлт'],
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
