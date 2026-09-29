import Image from 'next/image';
import Link from 'next/link';

export default function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Tecno Salud Austral, ir al inicio">
      <Image
        src={inverted ? '/images/logo-horizontal-white.png' : '/images/logo-horizontal.png'}
        alt="Tecno Salud Austral SpA"
        width={720}
        height={149}
        priority
      />
    </Link>
  );
}
