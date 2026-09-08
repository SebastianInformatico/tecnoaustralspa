import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tecno Salud Austral SPA | Equipamiento cardiológico',
  description: 'Insumos cardiológicos, electrocardiógrafos, Holter y monitoreo para profesionales e instituciones.',
  openGraph: {
    title: 'Tecno Salud Austral SPA | Equipamiento cardiológico',
    description: 'Soluciones cardiológicas para una vida más saludable.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
