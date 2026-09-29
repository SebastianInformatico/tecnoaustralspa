import Link from 'next/link';
import { Building2, FileText, Truck } from 'lucide-react';
import SiteFrame from './components/site/SiteFrame';
import HeroCarousel from './components/home/HeroCarousel';
import SectionTitle from './components/site/SectionTitle';
import IconBoxes from './components/site/IconBoxes';
import CtaBand from './components/site/CtaBand';
import { WhatsAppIcon } from './components/site/BrandIcons';
import ProductCard from './components/catalog/ProductCard';
import { linesByFamily } from '@/lib/catalog';
import { SITE } from '@/lib/site';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phoneDisplay,
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

const SERVICES = [
  { icon: Truck, title: 'Despacho a todo Chile', text: `Enviamos desde ${SITE.city} a cualquier región del país.` },
  { icon: FileText, title: 'Cotización formal', text: 'Te respondemos por correo con valores y disponibilidad.' },
  { icon: Building2, title: 'Compras institucionales', text: 'Atendemos clínicas, CESFAM y hospitales.' },
  { icon: WhatsAppIcon, title: 'Atención por WhatsApp', text: `Escríbenos al ${SITE.phoneDisplay}.` },
];

const STEPS = [
  { title: 'Elige tus productos', text: 'Agrega a tu cotización los equipos e insumos que necesitas.' },
  { title: 'Envía tus datos', text: 'Indica tu institución, la ciudad de despacho y cualquier detalle útil.' },
  { title: 'Recibe tu cotización', text: 'Te enviamos por correo valores, disponibilidad y plazo de entrega.' },
];

export default function HomePage() {
  const equipos = linesByFamily('equipos');
  const insumos = linesByFamily('insumos');

  return (
    <SiteFrame cta={false}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <HeroCarousel />

      <section className="section">
        <div className="shell">
          <IconBoxes items={SERVICES} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle
            title="Equipos médicos"
            subtitle="Equipos para registro electrocardiográfico, monitoreo ambulatorio y vigilancia de pacientes."
          />
          <div className="product-grid product-grid--4 reveal">
            {equipos.map((line) => (
              <ProductCard key={line.slug} line={line} showFamily={false} />
            ))}
          </div>
          <div className="section-more">
            <Link href="/productos?familia=equipos" className="button button-ghost">
              Ver todos los equipos
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Compras para una clínica o institución?"
        text="Enviamos cotización formal por correo con valores, disponibilidad y plazo de despacho."
        buttonLabel="Solicitar cotización"
        buttonHref="/cotizar"
      />

      <section className="section section--soft">
        <div className="shell">
          <SectionTitle
            title="Insumos y accesorios"
            subtitle="Consumibles y repuestos para que tus equipos sigan funcionando. Indícanos la marca y el modelo."
          />
          <div className="product-grid product-grid--4 reveal">
            {insumos.map((line) => (
              <ProductCard key={line.slug} line={line} showFamily={false} />
            ))}
            <Link href="/cotizar" className="product-help-card">
              <strong>¿No encuentras lo que buscas?</strong>
              <span>
                Trabajamos más productos de los que aparecen en el catálogo. Indícanos marca y modelo de tu equipo y lo
                buscamos.
              </span>
              <em>Solicitar cotización</em>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionTitle title="¿Cómo cotizar?" subtitle="Tres pasos, sin registrarte y sin compromiso de compra." />
          <ol className="steps-row">
            {STEPS.map((step, index) => (
              <li key={step.title} className="step reveal" style={{ transitionDelay: `${index * 120}ms` }}>
                <span className="step-num">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="section-more">
            <Link href="/cotizar" className="button button-primary">
              Ir a mi cotización
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell split">
          <div className="split-text reveal">
            <SectionTitle title={`Sobre ${SITE.shortName}`} align="left" />
            <p>
              Somos una empresa de {SITE.city}, Chiloé, dedicada a la venta de equipos de cardiología, monitoreo e
              insumos clínicos. Atendemos a profesionales, centros médicos e instituciones de salud de todo el país.
            </p>
            <p>
              Antes de despachar revisamos que cables, electrodos y accesorios sean compatibles con el equipo que usas.
            </p>
            <Link href="/nosotros" className="button button-primary">
              Conoce más
            </Link>
          </div>
          <ul className="check-list reveal">
            <li>Despacho a todas las regiones</li>
            <li>Compatibilidad revisada con tu equipo</li>
            <li>Cotización formal por correo</li>
            <li>Atención directa por WhatsApp</li>
          </ul>
        </div>
      </section>
    </SiteFrame>
  );
}
