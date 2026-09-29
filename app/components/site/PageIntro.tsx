import Link from 'next/link';

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/** Migas de pan y título de páginas interiores. */
export default function PageIntro({ title, lead, crumbs = [], children }: Props) {
  return (
    <div className="page-intro">
      <div className="shell">
        {crumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Ruta de navegación">
            <ol>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label}>
                  {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1>{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
