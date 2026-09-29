import Link from 'next/link';
import AddToQuoteButton from './AddToQuoteButton';
import { getFamily, type ProductLine } from '@/lib/catalog';

export default function ProductCard({ line, showFamily = true }: { line: ProductLine; showFamily?: boolean }) {
  const href = `/productos/${line.slug}`;
  return (
    <article className="product-card">
      {showFamily && <p className="product-card-cat">{getFamily(line.family).name}</p>}
      <h3>
        <Link href={href}>{line.name}</Link>
      </h3>
      <p className="product-card-summary">{line.summary}</p>
      <div className="product-card-foot">
        <p className="product-card-price">Precio a cotizar</p>
        <Link href={href} className="product-card-more">
          Ver detalle
        </Link>
      </div>
      <AddToQuoteButton slug={line.slug} name={line.name} variant="compact" />
    </article>
  );
}
