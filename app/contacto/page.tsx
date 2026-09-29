import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '../components/site/BrandIcons';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import QuoteRequest from '../components/quote/QuoteRequest';
import { SITE, hasRealPhone, whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Escríbenos por WhatsApp o correo. Tecno Salud Austral, ${SITE.city}, Chiloé.`,
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <PageIntro
        title="Contacto"
        lead="Para cotizar productos agrégalos a tu cotización. Para otras consultas usa este formulario o nuestros canales directos."
        crumbs={[{ label: 'Contacto' }]}
      />
      <section className="page-body">
        <div className="shell contact-layout">
          <div className="contact-channels">
            <a className="channel-card" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon aria-hidden="true" />
              <div>
                <h2>WhatsApp</h2>
                <p>La vía más rápida para consultas y seguimiento de pedidos.</p>
                <span className="channel-value">{hasRealPhone ? SITE.phoneDisplay : 'Abrir conversación'}</span>
              </div>
            </a>
            <a className="channel-card" href={`mailto:${SITE.email}`}>
              <Mail aria-hidden="true" />
              <div>
                <h2>Correo</h2>
                <p>Para enviar órdenes de compra o solicitar fichas técnicas.</p>
                <span className="channel-value">{SITE.email}</span>
              </div>
            </a>
            <div className="channel-card">
              <MapPin aria-hidden="true" />
              <div>
                <h2>Dirección</h2>
                <p>{SITE.address}</p>
                <span className="channel-value">{SITE.region}</span>
              </div>
            </div>
          </div>
          <QuoteRequest mode="contacto" />
        </div>
      </section>
    </SiteFrame>
  );
}
