'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Minus, Plus } from 'lucide-react';
import AddToQuoteButton from './AddToQuoteButton';
import { useQuoteList } from '@/lib/quote-list';
import { whatsappUrl } from '@/lib/site';

export default function ProductBuyBox({ slug, name }: { slug: string; name: string }) {
  const [qty, setQty] = useState(1);
  const inList = useQuoteList().find((line) => line.slug === slug);

  return (
    <div className="buy-box">
      <p className="buy-box-price">
        Precio: <strong>a cotizar</strong>
      </p>
      <p className="buy-box-note">El valor depende del modelo y la cantidad. Te lo enviamos por correo.</p>
      <div className="buy-box-row">
        <div className="qty" role="group" aria-label="Cantidad">
          <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} disabled={qty <= 1} aria-label="Restar uno">
            <Minus aria-hidden="true" />
          </button>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={999}
            value={qty}
            aria-label="Cantidad"
            onChange={(event) => {
              const value = Number(event.target.value);
              if (Number.isFinite(value) && value > 0) setQty(Math.min(999, Math.round(value)));
            }}
          />
          <button type="button" onClick={() => setQty((value) => Math.min(999, value + 1))} aria-label="Sumar uno">
            <Plus aria-hidden="true" />
          </button>
        </div>
        <AddToQuoteButton slug={slug} name={name} qty={qty} />
      </div>
      {inList && (
        <p className="buy-box-in-list">
          Tienes {inList.qty} en tu cotización. <Link href="/cotizar">Ver cotización</Link>
        </p>
      )}
      <a
        className="button button-whatsapp button-block"
        href={whatsappUrl(`Hola, quiero cotizar ${name}.`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle aria-hidden="true" /> Consultar por WhatsApp
      </a>
    </div>
  );
}
