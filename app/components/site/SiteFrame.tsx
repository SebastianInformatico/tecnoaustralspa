import Header from './Header';
import Footer from './Footer';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappUrl } from '@/lib/site';

/** Estructura común de todas las páginas públicas: header, contenido, footer. */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <a
        className="whatsapp-float"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <WhatsAppIcon aria-hidden="true" />
      </a>
    </>
  );
}
