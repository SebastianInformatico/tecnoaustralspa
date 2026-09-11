'use client';

import QuoteToolbar from '@/app/components/quote/QuoteToolbar';
import QuoteHeader from '@/app/components/quote/QuoteHeader';
import QuoteTable from '@/app/components/quote/QuoteTable';
import type { QuoteItem } from '@/app/components/quote/types';
import { COMPANY_INFO } from '@/lib/constants';

const items: QuoteItem[] = [
  {
    code: 'ECG-120',
    name: 'Electrocardiografo digital',
    detail: 'Registro ECG de 12 derivaciones para consulta clinica.',
    quantity: 1,
    price: 890000,
  },
  {
    code: 'ACC-ECG',
    name: 'Set de electrodos y cables paciente',
    detail: 'Kit compatible para continuidad de uso.',
    quantity: 2,
    price: 42000,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);

export default function QuotePage() {
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;

  const printDocument = (download = false) => {
    const previousTitle = document.title;
    document.title = 'Cotizacion-TecnoSalud-Austral-TSA-2026-001';
    window.print();
    if (!download) document.title = previousTitle;
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 1000);
  };

  return (
    <main className="quote-document">
      <QuoteToolbar onPrint={printDocument} />

      <article className="quote-paper">
        <QuoteHeader
          quoteNumber="TSA-2026-001"
          date="08 de septiembre de 2026"
          validity="15 dias"
        />

        <section className="quote-intro">
          <div>
            <p className="quote-label">PARA NUESTRO CLIENTE</p>
            <h1>Centro Medico Austral</h1>
            <p>Atencion: Departamento de adquisiciones</p>
            <p>Puerto Montt, Chile</p>
          </div>
          <div className="quote-reference">
            <p className="quote-label">SOBRE ESTA PROPUESTA</p>
            <p>Una selección pensada para apoyar el trabajo de consulta y monitoreo.</p>
            <p className="quote-status">● Disponible para revisar</p>
          </div>
        </section>

        <QuoteTable items={items} formatCurrency={formatCurrency} />

        <section className="quote-summary">
          <div className="quote-note">
            <p className="quote-label">UN MENSAJE PARA TI</p>
            <p>Armamos esta propuesta pensando en el uso diario. Si necesitas ajustar cantidades, accesorios o alternativas, conversemos.</p>
          </div>
          <dl>
            <div><dt>Subtotal neto</dt><dd>{formatCurrency(subtotal)}</dd></div>
            <div><dt>IVA (19%)</dt><dd>{formatCurrency(tax)}</dd></div>
            <div className="quote-total"><dt>Total</dt><dd>{formatCurrency(total)}</dd></div>
          </dl>
        </section>

        <section className="quote-terms">
          <div>
            <p className="quote-label">CONDICIONES</p>
            <p>Valores expresados en pesos chilenos. Despacho y plazos se coordinan segun disponibilidad y ubicacion.</p>
          </div>
          <div>
            <p className="quote-label">CONTACTO COMERCIAL</p>
            <p>{COMPANY_INFO.name}</p>
            <p>{COMPANY_INFO.location}</p>
            <p>{COMPANY_INFO.email} · {COMPANY_INFO.phoneDisplay}</p>
          </div>
        </section>

        <footer className="quote-document-footer">
          <span>Gracias por considerar a Tecno Salud Austral.</span>
          <span>www.tecnosaludaustral.cl</span>
        </footer>
      </article>
    </main>
  );
}
