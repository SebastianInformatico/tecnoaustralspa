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
    <SiteFrame>
      <PageIntro
        eyebrow="Cotización"
        title="Solicitar cotización"
        lead="Revisa tu lista, ajusta cantidades y déjanos tus datos. Te respondemos por correo con una propuesta."
        crumbs={[{ label: 'Cotización' }]}
      />
      <section className="section section--tight">
        <div className="shell">
          <QuoteRequest />
        </div>
      </section>
    </SiteFrame>
  );
}
