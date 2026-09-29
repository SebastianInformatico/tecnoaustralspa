import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AddToQuoteButton from './AddToQuoteButton';
import { getFamily, type ProductLine } from '@/lib/catalog';

export default function ProductCard({ line }: { line: ProductLine }) {
  return (
    <article className="product-card">
      <Link href={`/productos/${line.slug}`} className="product-card-media" tabIndex={-1} aria-hidden="true">
        <Image
          src={line.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className={`fit-${line.imageFit}`}
          style={line.imagePosition ? { objectPosition: line.imagePosition } : undefined}
        />
        <span className="product-card-code">{line.code}</span>
      </Link>
      <div className="product-card-body">
        <p className="product-card-family">{getFamily(line.family).name}</p>
        <h3>
          <Link href={`/productos/${line.slug}`}>{line.name}</Link>
        </h3>
        <p className="product-card-summary">{line.summary}</p>
        <div className="product-card-actions">
          <AddToQuoteButton slug={line.slug} name={line.name} variant="compact" />
          <Link href={`/productos/${line.slug}`} className="text-link">
            Ver ficha <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
