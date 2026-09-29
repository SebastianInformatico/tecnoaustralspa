import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/** Encabezado de páginas interiores, con migas de pan. */
export default function PageIntro({ eyebrow, title, lead, crumbs = [], children }: Props) {
  return (
    <section className="page-intro">
      <div className="shell">
        {crumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Ruta de navegación">
            <ol>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label}>
                  <ChevronRight aria-hidden="true" />
                  {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
