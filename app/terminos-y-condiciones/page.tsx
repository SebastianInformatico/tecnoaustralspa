import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y condiciones | Tecno Salud Austral SPA',
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <Link href="/">← Tecno Salud Austral SPA</Link>
      <p>TÉRMINOS Y CONDICIONES</p>
      <h1>Información legal</h1>
      <h2>Uso del sitio</h2>
      <p>
        La información disponible en este sitio tiene fines comerciales e informativos.
        La disponibilidad de productos, condiciones de venta y despacho se confirma
        directamente durante el proceso de cotización.
      </p>
      <h2>Cotizaciones</h2>
      <p>
        Las solicitudes enviadas a través del sitio no constituyen una venta ni reserva de productos.
        Tecno Salud Austral SPA responderá de acuerdo con los datos entregados y la disponibilidad aplicable.
      </p>
    </main>
  );
}
