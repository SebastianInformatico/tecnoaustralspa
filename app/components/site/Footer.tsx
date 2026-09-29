import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import Brand from './Brand';
import EcgLine from './EcgLine';
import { FAMILIES, PRODUCT_LINES } from '@/lib/catalog';
import { SITE, whatsappUrl } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Brand inverted />
          <p>
            Equipos cardiológicos, monitoreo e insumos clínicos para profesionales e instituciones de salud.
            Atendemos desde {SITE.city} con despacho a todo Chile.
          </p>
          <EcgLine className="footer-ecg" />
        </div>
        <div>
          <p className="footer-title">Productos</p>
          <ul>
            {FAMILIES.map((family) => (
              <li key={family.id}>
                <Link href={`/productos?familia=${family.id}`}>{family.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/productos">Catálogo completo</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Líneas</p>
          <ul>
            {PRODUCT_LINES.slice(0, 5).map((line) => (
              <li key={line.slug}>
                <Link href={`/productos/${line.slug}`}>{line.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Contacto</p>
          <ul className="footer-contact">
            <li>
              <a href={`mailto:${SITE.email}`}>
                <Mail aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                WhatsApp comercial
              </a>
            </li>
            <li>
              <span>
                <MapPin aria-hidden="true" />
                {SITE.address}
              </span>
            </li>
          </ul>
          <Link href="/cotizar" className="footer-cta">
            Solicitar cotización <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <nav aria-label="Enlaces legales">
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/terminos-y-condiciones">Términos y condiciones</Link>
          <Link href="/politica-de-privacidad">Política de privacidad</Link>
          <Link href="/pellet">Venta de pellet</Link>
        </nav>
      </div>
    </footer>
  );
}
