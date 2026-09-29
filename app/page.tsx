import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ClipboardList,
  HeartPulse,
  Hospital,
  MessageCircle,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  Truck,
} from 'lucide-react';
import SiteFrame from './components/site/SiteFrame';
import EcgLine from './components/site/EcgLine';
import ClosingCta from './components/site/ClosingCta';
import ProductCard from './components/catalog/ProductCard';
import { FAMILIES, PRODUCT_LINES, linesByFamily, getLine } from '@/lib/catalog';
import { SITE } from '@/lib/site';

const FEATURED = ['electrocardiografos', 'holter-ecg', 'monitores', 'electrodos-y-cables'];

const STEPS = [
  {
    title: 'Arma tu lista',
    text: 'Agrega desde el catálogo las líneas que necesitas y la cantidad. Si no está publicado, escríbelo igual.',
  },
  {
    title: 'Te cotizamos',
    text: 'Revisamos compatibilidad con tus equipos y te respondemos con alternativas, disponibilidad y valores.',
  },
  {
    title: 'Despachamos',
    text: 'Coordinamos la entrega según tu ubicación, en Chiloé o en cualquier región del país.',
  },
];

const AUDIENCE = [
  { icon: Stethoscope, title: 'Consultas y especialistas', text: 'Cardiología, medicina interna y medicina general.' },
  { icon: Building2, title: 'Centros médicos y clínicas', text: 'Equipamiento para box, procedimientos y urgencia.' },
  { icon: HeartPulse, title: 'Atención primaria', text: 'CESFAM, CECOSF y postas rurales.' },
  { icon: Hospital, title: 'Hospitales e instituciones', text: 'Compras institucionales y reposición programada.' },
];

export default function HomePage() {
  const ecg = getLine('electrocardiografos')!;
  const holter = getLine('holter-ecg')!;
  const monitor = getLine('monitores')!;

  return (
    <SiteFrame>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Equipamiento cardiológico · Insumos clínicos</p>
            <h1>
              Equipos cardiológicos e insumos clínicos, <span>desde el sur de Chile.</span>
            </h1>
            <p className="hero-lead">
              Electrocardiógrafos, Holter, monitores de paciente y los consumibles que los mantienen funcionando. Arma
              tu lista, te cotizamos y despachamos a todo el país desde {SITE.city}.
            </p>
            <div className="hero-actions">
              <Link href="/productos" className="button button-primary">
                Ver catálogo <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/cotizar" className="button button-ghost">
                <ClipboardList aria-hidden="true" /> Solicitar cotización
              </Link>
            </div>
            <ul className="hero-facts">
              <li>
                <Truck aria-hidden="true" /> Despacho a todo Chile
              </li>
              <li>
                <ShieldCheck aria-hidden="true" /> Compatibilidad verificada
              </li>
              <li>
                <MessageCircle aria-hidden="true" /> Atención directa
              </li>
            </ul>
          </div>

          <div className="hero-stage" aria-label="Productos destacados">
            <Link href={`/productos/${ecg.slug}`} className="stage-card stage-card--main">
              <Image src={ecg.image} alt={ecg.name} fill priority sizes="(max-width: 900px) 90vw, 420px" className="fit-contain" />
              <span className="stage-label">
                <small>{ecg.code}</small>
                {ecg.name}
                <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
            <Link href={`/productos/${holter.slug}`} className="stage-card stage-card--a">
              <Image src={holter.image} alt={holter.name} fill sizes="240px" className="fit-contain" />
              <span className="stage-label">
                <small>{holter.code}</small>
                {holter.name}
              </span>
            </Link>
            <Link href={`/productos/${monitor.slug}`} className="stage-card stage-card--b">
              <Image src={monitor.image} alt={monitor.name} fill sizes="240px" className="fit-contain" />
              <span className="stage-label">
                <small>{monitor.code}</small>
                Monitores
              </span>
            </Link>
            <div className="stage-signal" aria-hidden="true">
              <span className="stage-signal-dot" />
              <EcgLine className="stage-signal-line" />
            </div>
          </div>
        </div>
      </section>

      <section className="section families">
        <div className="shell">
          <header className="section-head">
            <p className="eyebrow">Catálogo</p>
            <h2>Tres familias, un solo proveedor.</h2>
            <p>Del equipo al consumible: cotiza en un mismo pedido lo que se usa junto en tu box.</p>
          </header>
          <div className="family-grid">
            {FAMILIES.map((family, index) => (
              <article key={family.id} className="family-card">
                <span className="family-index">0{index + 1}</span>
                <h3>{family.name}</h3>
                <p>{family.description}</p>
                <ul>
                  {linesByFamily(family.id).map((line) => (
                    <li key={line.slug}>
                      <Link href={`/productos/${line.slug}`}>
                        {line.name}
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/productos?familia=${family.id}`} className="text-link">
                  Ver {family.short.toLowerCase()} <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <header className="section-head section-head--row">
            <div>
              <p className="eyebrow">Más cotizados</p>
              <h2>Líneas destacadas</h2>
            </div>
            <Link href="/productos" className="text-link">
              Ver las {PRODUCT_LINES.length} líneas <ArrowRight aria-hidden="true" />
            </Link>
          </header>
          <div className="product-grid product-grid--four">
            {FEATURED.map((slug) => {
              const line = getLine(slug);
              return line ? <ProductCard key={slug} line={line} /> : null;
            })}
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="shell process-grid">
          <header className="section-head">
            <p className="eyebrow">Cómo cotizar</p>
            <h2>Sin carrito ni pago en línea: conversamos antes de vender.</h2>
            <p>
              Cada equipo y cada insumo depende de cómo trabajas. Por eso cotizamos contigo y confirmamos compatibilidad
              antes de despachar.
            </p>
            <Link href="/cotizar" className="button button-primary">
              Empezar mi cotización <ArrowRight aria-hidden="true" />
            </Link>
          </header>
          <ol className="steps">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="step-number">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <header className="section-head">
            <p className="eyebrow">A quién atendemos</p>
            <h2>Equipamos desde una consulta particular hasta un hospital.</h2>
          </header>
          <div className="audience-grid">
            {AUDIENCE.map(({ icon: Icon, title, text }) => (
              <article key={title} className="audience-card">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section delivery">
        <div className="shell delivery-grid">
          <figure className="delivery-media">
            <Image
              src="/images/medical-delivery-van-tecno-salud.png"
              alt="Furgón de Tecno Salud Austral"
              fill
              sizes="(max-width: 900px) 100vw, 620px"
            />
          </figure>
          <div className="delivery-copy">
            <p className="eyebrow">Despacho y continuidad</p>
            <h2>Desde Chiloé a todo Chile.</h2>
            <p>
              Estamos en {SITE.city}. Conocemos lo que significa abastecer centros de salud lejos de Santiago, y
              coordinamos cada entrega para que el insumo llegue cuando se necesita.
            </p>
            <ul className="check-list">
              <li>
                <Truck aria-hidden="true" />
                <span>
                  <strong>Despacho coordinado</strong> según tu ubicación y urgencia.
                </span>
              </li>
              <li>
                <PackageCheck aria-hidden="true" />
                <span>
                  <strong>Compatibilidad revisada</strong> con la marca y modelo de tu equipo.
                </span>
              </li>
              <li>
                <RefreshCw aria-hidden="true" />
                <span>
                  <strong>Reposición programada</strong> de electrodos, papel y consumibles.
                </span>
              </li>
            </ul>
            <Link href="/nosotros" className="text-link">
              Conoce Tecno Salud Austral <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </SiteFrame>
  );
}
