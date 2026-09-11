import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de privacidad | Tecno Salud Austral SPA',
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Link href="/">← Tecno Salud Austral SPA</Link>
      <p>POLÍTICA DE PRIVACIDAD</p>
      <h1>Uso de datos de contacto</h1>
      <p>
        Los datos entregados en las solicitudes de cotización se utilizan para responder
        consultas comerciales y gestionar el contacto solicitado.
      </p>
      <h2>Datos enviados</h2>
      <p>
        El usuario entrega sus datos de forma voluntaria. Para consultas sobre el tratamiento
        de información, utiliza el canal de contacto comercial de Tecno Salud Austral SPA.
      </p>
    </main>
  );
}
