import Link from 'next/link';
import Brand from './Brand';
import ServiceBar from './ServiceBar';
import { PRODUCT_LINES } from '@/lib/catalog';
import { SITE, whatsappUrl } from '@/lib/site';

export default function Footer() {
  return (
    <>
      <ServiceBar />
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-col footer-about">
            <Brand inverted />
            <p>
              Venta de equipos de cardiología, monitoreo e insumos clínicos para profesionales, clínicas e instituciones
              de salud.
            </p>
          </div>
          <div className="footer-col">
            <h2>Productos</h2>
            <ul>
              {PRODUCT_LINES.map((line) => (
                <li key={line.slug}>
                  <Link href={`/productos/${line.slug}`}>{line.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h2>Información</h2>
            <ul>
              <li>
                <Link href="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link href="/cotizar">Solicitar cotización</Link>
              </li>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones">Términos y condiciones</Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad">Política de privacidad</Link>
              </li>
              <li>
                <Link href="/pellet">Venta de pellet</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Contacto</h2>
            <dl className="footer-contact">
              <dt>Dirección</dt>
              <dd>
                {SITE.address}
                <br />
                {SITE.region}
              </dd>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </dd>
              <dt>WhatsApp</dt>
              <dd>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  Escribir a ventas
                </a>
              </dd>
            </dl>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="shell">
            © {new Date().getFullYear()} {SITE.name}. Imágenes referenciales.
          </div>
        </div>
      </footer>
    </>
  );
}
