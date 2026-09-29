import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
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
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0c2340',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body className={openSans.variable}>{children}</body>
    </html>
  );
}
