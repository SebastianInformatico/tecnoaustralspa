import Image from 'next/image';
import Link from 'next/link';

export default function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className={`brand${inverted ? ' brand--inverted' : ''}`} aria-label="Tecno Salud Austral, ir al inicio">
      <Image src="/images/brand-mark.png" alt="" width={44} height={40} priority />
      <span className="brand-word">
        <b>
          Tecno<em>Salud</em>
        </b>
        <small>Austral SpA</small>
      </span>
    </Link>
  );
}
