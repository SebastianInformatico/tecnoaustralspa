import type { Metadata } from 'next';
import { WhatsAppIcon } from '../components/site/BrandIcons';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import { whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Venta de pellet',
  description: 'Pellet para calefacción en Chiloé. Consulta disponibilidad, formatos y despacho.',
};

const PELLET_MESSAGE = 'Hola, me gustaría consultar por disponibilidad y valores de pellet.';

export default function PelletPage() {
  return (
    <SiteFrame>
      <PageIntro title="Venta de pellet" crumbs={[{ label: 'Pellet' }]} />
      <div className="shell page-body">
        <div className="about-layout">
          <div className="prose">
            <p className="prose-lead">Además de insumos médicos, vendemos pellet para calefacción en Chiloé.</p>
            <h2>Formatos y stock</h2>
            <p>Los formatos, la disponibilidad y los valores se confirman al momento de consultar.</p>
            <h2>Despacho y retiro</h2>
            <p>Revisamos contigo las opciones de retiro o despacho según tu ubicación.</p>
          </div>
          <aside className="about-card">
            <h2>Consultar pellet</h2>
            <p>Escríbenos por WhatsApp con la cantidad que necesitas y tu comuna.</p>
            <a
              className="button button-whatsapp button-block"
              href={whatsappUrl(PELLET_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon aria-hidden="true" /> Consultar por WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </SiteFrame>
  );
}
