'use client';

import Link from 'next/link';
import { Download, Printer } from 'lucide-react';

interface QuoteToolbarProps {
  onPrint: (download?: boolean) => void;
}

export default function QuoteToolbar({ onPrint }: QuoteToolbarProps) {
  return (
    <div className="quote-toolbar">
      <Link href="/">Volver al sitio</Link>
      <div className="quote-actions">
        <button type="button" onClick={() => onPrint()}>
          <Printer aria-hidden="true" /> Imprimir
        </button>
        <button type="button" onClick={() => onPrint(true)}>
          <Download aria-hidden="true" /> Descargar PDF
        </button>
      </div>
    </div>
  );
}
