import type { Metadata } from 'next';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import QuoteRequest from '../components/quote/QuoteRequest';

export const metadata: Metadata = {
  title: 'Solicitar cotización',
  description: 'Arma tu lista de equipos e insumos y recibe disponibilidad, alternativas y valores.',
};

export default function QuoteRequestPage() {
  return (
    <SiteFrame cta={false}>
      <PageIntro
        title="Mi cotización"
        lead="Revisa los productos, ajusta cantidades y completa tus datos. Te enviamos la cotización por correo."
        crumbs={[{ label: 'Cotización' }]}
      />
      <section className="page-body">
        <div className="shell">
          <QuoteRequest />
        </div>
      </section>
    </SiteFrame>
  );
}
