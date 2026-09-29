import type { Metadata, Viewport } from 'next';
import { Open_Sans, Poppins } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tecnosaludaustral.cl'),
  title: {
    default: 'Tecno Salud Austral SPA | Equipos cardiológicos e insumos clínicos',
    template: '%s | Tecno Salud Austral',
  },
  description:
    'Electrocardiógrafos, Holter, monitores de paciente e insumos clínicos para profesionales e instituciones de salud. Despacho a todo Chile desde Castro, Chiloé.',
  openGraph: {
    title: 'Tecno Salud Austral SPA',
    description: 'Equipos cardiológicos e insumos clínicos. Despacho a todo Chile desde Castro, Chiloé.',
    type: 'website',
    locale: 'es_CL',
    images: ['/images/logo-tecno-salud-austral.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0c2340',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body className={`${openSans.variable} ${poppins.variable}`}>{children}</body>
    </html>
  );
}
