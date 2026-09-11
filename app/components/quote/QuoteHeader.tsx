import Image from 'next/image';

interface QuoteHeaderProps {
  quoteNumber: string;
  date: string;
  validity: string;
}

export default function QuoteHeader({
  quoteNumber,
  date,
  validity,
}: QuoteHeaderProps) {
  return (
    <header className="quote-document-header">
      <div className="quote-company">
        <Image
          src="/images/logo-tecno-salud-austral.png"
          alt="Tecno Salud Austral SPA"
          width={180}
          height={180}
        />
        <div>
          <p className="quote-kicker">PROPUESTA COMERCIAL</p>
          <p>Equipamiento cardiológico para una atención bien resuelta.</p>
        </div>
      </div>
      <div className="quote-meta">
        <span>COTIZACION</span>
        <strong>N° {quoteNumber}</strong>
        <p>{date}</p>
        <p>Vigencia: {validity}</p>
      </div>
    </header>
  );
}
