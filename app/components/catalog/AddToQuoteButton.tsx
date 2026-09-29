'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { addToQuote, useQuoteList } from '@/lib/quote-list';

interface Props {
  slug: string;
  name: string;
  /** Cantidad a agregar (ficha de producto). */
  qty?: number;
  variant?: 'solid' | 'compact';
}

export default function AddToQuoteButton({ slug, name, qty = 1, variant = 'solid' }: Props) {
  const list = useQuoteList();
  const inList = list.some((line) => line.slug === slug);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (inList && !justAdded && variant === 'compact') {
    return (
      <Link href="/cotizar" className="add-quote add-quote--compact is-added">
        <Check aria-hidden="true" /> En tu cotización
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`add-quote add-quote--${variant}${justAdded ? ' is-added' : ''}`}
      aria-label={`Agregar ${name} a la cotización`}
      onClick={() => {
        addToQuote(slug, qty);
        setJustAdded(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setJustAdded(false), 1800);
      }}
    >
      {justAdded && <Check aria-hidden="true" />}
      <span aria-live="polite">{justAdded ? 'Agregado' : 'Agregar a cotización'}</span>
    </button>
  );
}
