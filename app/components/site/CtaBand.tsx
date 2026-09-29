import Link from 'next/link';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappUrl } from '@/lib/site';

interface Props {
  title: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
}

/** Franja de llamada a la acción de ancho completo. */
export default function CtaBand({ title, text, buttonLabel, buttonHref }: Props) {
  return (
    <section className="cta-band">
      <div className="shell cta-band-inner reveal">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <Link href={buttonHref} className="button button-light">
            {buttonLabel}
          </Link>
          <a className="button button-outline-light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
