import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import EcgLine from './EcgLine';
import { whatsappUrl } from '@/lib/site';

interface Props {
  title?: string;
  text?: string;
}

/** Cierre de página: “¿No encuentras lo que buscas?” */
export default function ClosingCta({
  title = '¿No encuentras lo que buscas?',
  text = 'Cuéntanos el equipo o insumo que necesitas, el modelo que usas o la marca de tu equipo. Buscamos la alternativa y te respondemos con disponibilidad y valores.',
}: Props) {
  return (
    <section className="closing-cta">
      <div className="shell closing-cta-inner">
        <EcgLine className="closing-cta-ecg" />
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="closing-cta-actions">
          <Link href="/cotizar" className="button button-light">
            Solicitar cotización <ArrowRight aria-hidden="true" />
          </Link>
          <a className="button button-outline-light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
