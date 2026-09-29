import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import SectionTitle from '../components/site/SectionTitle';
import IconBoxes from '../components/site/IconBoxes';
import { WhatsAppIcon } from '../components/site/BrandIcons';
import QuoteRequest from '../components/quote/QuoteRequest';
import { SITE, whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Escríbenos por WhatsApp o correo. ${SITE.name}, ${SITE.city}, Chiloé.`,
};

export default function ContactPage() {
  return (
    <SiteFrame cta={false}>
      <PageIntro title="Contacto" crumbs={[{ label: 'Contacto' }]} />

      <section className="section">
        <div className="shell">
          <IconBoxes
            columns={3}
            items={[
              {
                icon: WhatsAppIcon,
                title: 'WhatsApp',
                text: 'La vía más rápida para consultas y seguimiento de pedidos.',
                detail: SITE.phoneDisplay,
                href: whatsappUrl(),
                external: true,
              },
              {
                icon: Mail,
                title: 'Correo',
                text: 'Para enviar órdenes de compra o solicitar fichas técnicas.',
                detail: SITE.email,
                href: `mailto:${SITE.email}`,
              },
              {
                icon: MapPin,
                title: 'Dirección',
                text: SITE.address,
                detail: SITE.region,
              },
            ]}
          />
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell contact-form-wrap">
          <SectionTitle
            title="Escríbenos"
            subtitle="Para cotizar productos agrégalos a tu cotización. Para otras consultas usa este formulario."
          />
          <QuoteRequest mode="contacto" />
        </div>
      </section>
    </SiteFrame>
  );
}
