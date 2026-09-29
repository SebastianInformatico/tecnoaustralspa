import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import SiteFrame from '../../components/site/SiteFrame';
import PageIntro from '../../components/site/PageIntro';
import ProductCard from '../../components/catalog/ProductCard';
import ProductBuyBox from '../../components/catalog/ProductBuyBox';
import ProductTabs from '../../components/catalog/ProductTabs';
import { PRODUCT_LINES, getFamily, getLine } from '@/lib/catalog';

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

      <div className="shell page-body">
        <div className="product-detail">
          <div className="product-detail-media">
            <Image
              src={line.image}
              alt={line.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 520px"
              className={`fit-${line.imageFit}`}
              style={line.imagePosition ? { objectPosition: line.imagePosition } : undefined}
            />
          </div>

          <div className="product-detail-info">
            <p className="product-detail-meta">
              Categoría: <strong>{family.name}</strong>
            </p>
            <p className="product-detail-summary">{line.summary}</p>
            <ul className="product-detail-uses">
              {line.settings.map((setting) => (
                <li key={setting}>{setting}</li>
              ))}
            </ul>
            <ProductBuyBox slug={line.slug} name={line.name} />
          </div>
        </div>

        <ProductTabs
          tabs={[
            {
              id: 'descripcion',
              label: 'Descripción',
              content: (
                <>
                  <p>{line.description}</p>
                  <p>
                    Trabajamos con distintos modelos y marcas según disponibilidad. Indícanos tu necesidad y te enviamos
                    las opciones con su ficha técnica.
                  </p>
                </>
              ),
            },
            {
              id: 'cotizar',
              label: 'Datos para cotizar',
              content: (
                <>
                  <p>Para enviarte una cotización precisa, incluye en tu solicitud:</p>
                  <ul className="bullet-list">
                    {line.considerations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ),
            },
          ]}
        />

        {related.length > 0 && (
          <section className="block">
            <div className="block-head">
              <h2>Productos relacionados</h2>
            </div>
            <div className="product-grid product-grid--4">
              {related.map((item) => (
                <ProductCard key={item.slug} line={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteFrame>
  );
}
