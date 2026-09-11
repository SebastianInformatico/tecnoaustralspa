import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Venta de Pellet | Tecno Salud Austral SPA',
  description: 'Consulta disponibilidad, formatos y opciones de despacho de pellet.',
};

export default function PelletPage() {
  return (
    <main className="pellet-page">
      <header className="pellet-header">
        <Link href="/" className="pellet-brand">
          <Image
            src="/images/logo-tecno-salud-austral.png"
            alt="Tecno Salud Austral SPA"
            width={160}
            height={50}
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
        <Link href="/" className="pellet-back">
          ← Volver a cardiología
        </Link>
      </header>

      <section className="pellet-hero">
        <div>
          <p>VENTA DE PELLET</p>
          <h1>
            Pellet para<br />
            <em>calefacción</em>
          </h1>
          <h2>Consulta disponibilidad, formatos y opciones de despacho.</h2>
          <div>
            <a href="#contacto-pellet">Consultar stock</a>
            <a
              href={COMPANY_INFO.pelletWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar por WhatsApp ↗
            </a>
          </div>
        </div>
        <aside aria-label="Imagen referencial de pellet">
          <span>
            Imagen referencial<br />
            de pellet
          </span>
          <i />
          <b />
        </aside>
      </section>

      <section className="pellet-details">
        <article>
          <span>01</span>
          <h2>Producto</h2>
          <p>Pellet para calefacción. Consulta las alternativas disponibles antes de realizar tu compra.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Formatos</h2>
          <p>Solicita información sobre formatos y presentación según disponibilidad.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Disponibilidad</h2>
          <p>Confirma stock actualizado a través de nuestro canal comercial.</p>
        </article>
        <article>
          <span>04</span>
          <h2>Despacho</h2>
          <p>Revisa las opciones de despacho y cobertura al momento de cotizar.</p>
        </article>
      </section>

      <section id="contacto-pellet" className="pellet-contact">
        <p>CONTACTO</p>
        <h2>¿Buscas pellet para calefacción?</h2>
        <a
          href={COMPANY_INFO.pelletWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar por WhatsApp ↗
        </a>
      </section>

      <footer className="pellet-footer">
        <span>© Tecno Salud Austral SPA</span>
        <Link href="/">Unidad cardiológica</Link>
      </footer>
    </main>
  );
}
