import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import SiteFrame from './components/site/SiteFrame';
import ProductCard from './components/catalog/ProductCard';
import { FAMILIES, getLine, linesByFamily } from '@/lib/catalog';
import { SITE, whatsappUrl } from '@/lib/site';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  logo: `${SITE.url}/images/logo-tecno-salud-austral.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pje. Canal Trinidad 2, Villa Guarello',
    addressLocality: SITE.city,
    addressRegion: 'Los Lagos',
    addressCountry: 'CL',
  },
  areaServed: 'CL',
};

export default function HomePage() {
  const ecg = getLine('electrocardiografos')!;

  return (
    <SiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <section className="shell home-top">
        <div className="home-banner">
          <div className="home-banner-text">
            <h1>Equipos de cardiología, monitoreo e insumos clínicos</h1>
            <p>
              Electrocardiógrafos, Holter, monitores de paciente, electrodos y consumibles. Cotiza en línea y te
              despachamos a cualquier región de Chile.
            </p>
            <div className="home-banner-actions">
              <Link href="/productos" className="button button-primary">
                Ver productos
              </Link>
              <a className="button button-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" /> Cotizar por WhatsApp
              </a>
            </div>
          </div>
          <div className="home-banner-image">
            <Image src={ecg.image} alt={ecg.name} fill priority sizes="(max-width: 900px) 60vw, 360px" />
          </div>
        </div>

        <div className="home-promos">
          <Link href="/contacto" className="promo-box">
            <strong>Compras institucionales</strong>
            <span>Cotización formal para clínicas, CESFAM, hospitales y licitaciones.</span>
            <em>Escríbenos</em>
          </Link>
          <Link href="/productos?familia=insumos" className="promo-box promo-box--alt">
            <strong>Insumos para tu equipo</strong>
            <span>Electrodos, cables, manguitos y papel compatibles con tu modelo.</span>
            <em>Ver insumos</em>
          </Link>
        </div>
      </section>

      {FAMILIES.map((family) => {
        const lines = linesByFamily(family.id);
        return (
          <section key={family.id} className="shell block">
            <div className="block-head">
              <h2>{family.name}</h2>
              <Link href={`/productos?familia=${family.id}`}>Ver todo</Link>
            </div>
            <div className="product-grid product-grid--4">
              {lines.map((line) => (
                <ProductCard key={line.slug} line={line} />
              ))}
              {lines.length % 4 !== 0 && (
                <Link href="/cotizar" className="product-help-card">
                  <strong>¿No encuentras lo que buscas?</strong>
                  <span>
                    Trabajamos más productos de los que aparecen en el catálogo. Indícanos marca y modelo de tu equipo y
                    lo buscamos.
                  </span>
                  <em>Solicitar cotización</em>
                </Link>
              )}
            </div>
          </section>
        );
      })}

      <section className="shell block">
        <div className="info-row">
          <div className="info-box">
            <h2>¿Cómo cotizar?</h2>
            <ol className="plain-steps">
              <li>Agrega los productos que necesitas a tu cotización.</li>
              <li>Envía tus datos y la ciudad de despacho.</li>
              <li>Te respondemos por correo con valores, disponibilidad y plazo de entrega.</li>
            </ol>
            <Link href="/cotizar" className="button button-primary">
              Ir a mi cotización
            </Link>
          </div>
          <div className="info-box">
            <h2>Sobre {SITE.shortName}</h2>
            <p>
              Somos una empresa de {SITE.city}, Chiloé, dedicada a la venta de equipos de cardiología, monitoreo e
              insumos clínicos. Atendemos a profesionales, centros médicos e instituciones de salud de todo el país.
            </p>
            <p>
              Antes de despachar revisamos que cables, electrodos y accesorios sean compatibles con el equipo que usas.
            </p>
            <Link href="/nosotros" className="link-arrow">
              Más sobre nosotros
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
