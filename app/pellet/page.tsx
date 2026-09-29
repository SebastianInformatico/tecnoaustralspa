import type { Metadata } from 'next';
import { Flame, MessageCircle, Package, Truck } from 'lucide-react';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import { whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Venta de pellet',
  description: 'Pellet para calefacción en Chiloé. Consulta disponibilidad, formatos y despacho.',
};

const PELLET_MESSAGE = 'Hola, me gustaría consultar por disponibilidad y valores de pellet.';

const DETAILS = [
  { icon: Flame, title: 'Producto', text: 'Pellet para calefacción. Consulta las alternativas disponibles antes de comprar.' },
  { icon: Package, title: 'Formatos', text: 'Te informamos formatos y presentación según disponibilidad.' },
  { icon: Truck, title: 'Despacho', text: 'Revisamos opciones de retiro y despacho al momento de cotizar.' },
];

export default function PelletPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Otra línea de negocio"
        title="Venta de pellet para calefacción"
        lead="Además del abastecimiento médico, comercializamos pellet en Chiloé. Consulta stock y valores por WhatsApp."
        crumbs={[{ label: 'Pellet' }]}
      >
        <a
          className="button button-primary page-intro-cta"
          href={whatsappUrl(PELLET_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle aria-hidden="true" /> Consultar disponibilidad
        </a>
      </PageIntro>
      <section className="section section--tight">
        <div className="shell pillar-grid pillar-grid--three">
          {DETAILS.map(({ icon: Icon, title, text }) => (
            <article key={title} className="pillar">
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
