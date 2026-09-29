'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import { addToQuote, useQuoteList } from '@/lib/quote-list';

interface Props {
  slug: string;
  name: string;
  variant?: 'solid' | 'compact';
}

export default function AddToQuoteButton({ slug, name, variant = 'solid' }: Props) {
  const list = useQuoteList();
  const inList = list.some((line) => line.slug === slug);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (inList && !justAdded) {
    return (
      <Link href="/cotizar" className={`add-quote is-added add-quote--${variant}`}>
        <Check aria-hidden="true" />
        <span>En tu cotización</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`add-quote add-quote--${variant}${justAdded ? ' is-added' : ''}`}
      aria-label={`Agregar ${name} a la cotización`}
      onClick={() => {
        addToQuote(slug);
        setJustAdded(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setJustAdded(false), 1600);
      }}
    >
      {justAdded ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
      <span aria-live="polite">{justAdded ? 'Agregado' : 'Agregar a cotización'}</span>
    </button>
  );
}
