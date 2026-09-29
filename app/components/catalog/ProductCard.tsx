import Image from 'next/image';
import Link from 'next/link';
import AddToQuoteButton from './AddToQuoteButton';
import { getFamily, type ProductLine } from '@/lib/catalog';

export default function ProductCard({ line }: { line: ProductLine }) {
  const href = `/productos/${line.slug}`;
  return (
    <article className="product-card">
      <Link href={href} className="product-card-media" tabIndex={-1} aria-hidden="true">
        <Image
          src={line.image}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
          className={`fit-${line.imageFit}`}
          style={line.imagePosition ? { objectPosition: line.imagePosition } : undefined}
        />
      </Link>
      <div className="product-card-body">
        <p className="product-card-cat">{getFamily(line.family).name}</p>
        <h3>
          <Link href={href}>{line.name}</Link>
        </h3>
        <p className="product-card-summary">{line.summary}</p>
        <p className="product-card-price">Precio a cotizar</p>
        <AddToQuoteButton slug={line.slug} name={line.name} variant="compact" />
      </div>
    </article>
  );
}
