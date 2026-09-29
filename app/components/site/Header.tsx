'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Menu, Search, X } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import Brand from './Brand';
import SocialLinks from './SocialLinks';
import { PRODUCT_LINES } from '@/lib/catalog';
import { SITE, whatsappUrl } from '@/lib/site';
import { useQuoteList } from '@/lib/quote-list';

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const quote = useQuoteList();
  const count = quote.reduce((total, line) => total + line.qty, 0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="shell topbar-inner">
          <span>Despacho a todo Chile · Casa matriz en {SITE.city}, Chiloé</span>
          <nav aria-label="Enlaces de ayuda">
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/contacto">Contacto</Link>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <SocialLinks className="social-links--topbar" />
          </nav>
        </div>
      </div>

      <div className="shell header-main">
        <button
          type="button"
          className="icon-button menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <Brand />

        <form className="header-search" action="/productos" role="search">
          <label className="sr-only" htmlFor="header-q">
            Buscar productos
          </label>
          <input id="header-q" name="q" type="search" placeholder="Buscar productos" autoComplete="off" />
          <button type="submit" aria-label="Buscar">
            <Search aria-hidden="true" />
          </button>
        </form>

        <div className="header-actions">
          <a className="header-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon aria-hidden="true" />
            <span>
              <small>Ventas por WhatsApp</small>
              {SITE.phoneDisplay}
            </span>
          </a>
          <Link href="/cotizar" className="header-quote" aria-label={`Mi cotización, ${count} productos`}>
            <span className="header-quote-icon">
              <ClipboardList aria-hidden="true" />
              {count > 0 && (
                <b className="header-quote-count" suppressHydrationWarning>
                  {count}
                </b>
              )}
            </span>
            <span className="header-quote-label">Mi cotización</span>
          </Link>
        </div>
      </div>

      <nav className="category-bar" aria-label="Categorías">
        <div className="shell">
          <ul>
            <li>
              <Link href="/productos" className={pathname === '/productos' ? 'is-active' : undefined}>
                Todos los productos
              </Link>
            </li>
            {PRODUCT_LINES.map((line) => (
              <li key={line.slug}>
                <Link
                  href={`/productos/${line.slug}`}
                  className={pathname === `/productos/${line.slug}` ? 'is-active' : undefined}
                >
                  {line.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          <div className="shell">
            <p className="mobile-menu-title">Productos</p>
            <ul>
              <li>
                <Link href="/productos">Todos los productos</Link>
              </li>
              {PRODUCT_LINES.map((line) => (
                <li key={line.slug}>
                  <Link href={`/productos/${line.slug}`}>{line.name}</Link>
                </li>
              ))}
            </ul>
            <p className="mobile-menu-title">Empresa</p>
            <ul>
              <li>
                <Link href="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
              <li>
                <Link href="/pellet">Venta de pellet</Link>
              </li>
            </ul>
            <a className="button button-whatsapp button-block" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon aria-hidden="true" /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
