import Link from 'next/link';
import SiteFrame from './components/site/SiteFrame';
import PageIntro from './components/site/PageIntro';

export default function NotFound() {
  return (
    <SiteFrame>
      <PageIntro
        title="No encontramos esta página"
        lead="Puede que el enlace haya cambiado con la nueva versión del sitio."
      >
        <div className="page-intro-actions">
          <Link href="/productos" className="button button-primary">
            Ir al catálogo
          </Link>
          <Link href="/" className="button button-ghost">
            Volver al inicio
          </Link>
        </div>
      </PageIntro>
    </SiteFrame>
  );
}
