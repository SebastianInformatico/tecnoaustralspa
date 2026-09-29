import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CircleCheck, MapPin, MessageCircle, Truck } from 'lucide-react';
import SiteFrame from '../../components/site/SiteFrame';
import PageIntro from '../../components/site/PageIntro';
import ClosingCta from '../../components/site/ClosingCta';
import ProductCard from '../../components/catalog/ProductCard';
import AddToQuoteButton from '../../components/catalog/AddToQuoteButton';
import { PRODUCT_LINES, getFamily, getLine } from '@/lib/catalog';
import { whatsappUrl } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCT_LINES.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) return { title: 'Producto no encontrado' };
  return { title: line.name, description: line.summary };
}

export default async function ProductLinePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const line = getLine(slug);
  if (!line) notFound();

  const family = getFamily(line.family);
  const related = line.related.flatMap((relatedSlug) => {
    const item = getLine(relatedSlug);
    return item ? [item] : [];
  });

  return (
    <SiteFrame>
      <PageIntro
        title={line.name}
        crumbs={[
          { href: '/productos', label: 'Productos' },
          { href: `/productos?familia=${family.id}`, label: family.name },
          { label: line.name },
        ]}
      />

      <section className="section section--tight">
        <div className="shell line-layout">
          <figure className={`line-media line-media--${line.imageFit}`}>
            <Image
              src={line.image}
              alt={line.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 560px"
              className={`fit-${line.imageFit}`}
              style={line.imagePosition ? { objectPosition: line.imagePosition } : undefined}
            />
            <span className="line-media-code">{line.code}</span>
          </figure>

          <div className="line-info">
            <p className="eyebrow">{family.name}</p>
            <p className="line-lead">{line.description}</p>

            <div className="line-actions">
              <AddToQuoteButton slug={line.slug} name={line.name} />
              <a
                className="button button-ghost"
                href={whatsappUrl(`Hola, quiero cotizar ${line.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" /> Consultar por WhatsApp
              </a>
            </div>

            <ul className="line-assurances">
              <li>
                <CircleCheck aria-hidden="true" /> Modelos y valores confirmados al cotizar
              </li>
              <li>
                <Truck aria-hidden="true" /> Despacho a todo Chile
              </li>
              <li>
                <MapPin aria-hidden="true" /> Atención desde Castro, Chiloé
              </li>
            </ul>

            <div className="line-block">
              <h2>Dónde se usa</h2>
              <ul className="tag-list">
                {line.settings.map((setting) => (
                  <li key={setting}>{setting}</li>
                ))}
              </ul>
            </div>

            <div className="line-block">
              <h2>Para cotizar mejor, cuéntanos</h2>
              <ol className="consider-list">
                {line.considerations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--paper">
          <div className="shell">
            <header className="section-head section-head--row">
              <div>
                <p className="eyebrow">Se cotiza junto con</p>
                <h2>Complementa tu pedido</h2>
              </div>
              <Link href="/productos" className="text-link">
                Ver catálogo completo
              </Link>
            </header>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} line={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta />
    </SiteFrame>
  );
}
