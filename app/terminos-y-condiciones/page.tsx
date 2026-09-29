import type { Metadata } from 'next';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
};

export default function TermsPage() {
  return (
    <SiteFrame>
      <PageIntro title="Términos y condiciones" crumbs={[{ label: 'Términos y condiciones' }]} />
      <section className="section section--tight">
        <div className="shell prose">
          <h2>Uso del sitio</h2>
          <p>
            La información disponible en este sitio tiene fines comerciales e informativos. Las imágenes son
            referenciales. La disponibilidad de productos, condiciones de venta y despacho se confirma directamente
            durante el proceso de cotización.
          </p>
          <h2>Cotizaciones</h2>
          <p>
            Las solicitudes enviadas a través del sitio no constituyen una venta ni reserva de productos. {SITE.name}{' '}
            responderá de acuerdo con los datos entregados y la disponibilidad aplicable.
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
