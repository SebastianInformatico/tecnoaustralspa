'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Mail, Menu, MessageCircle, Truck, X } from 'lucide-react';
import Brand from './Brand';
import { NAV_LINKS, SITE, whatsappUrl } from '@/lib/site';
import { useQuoteList } from '@/lib/quote-list';

export default function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const quote = useQuoteList();
  const count = quote.reduce((total, line) => total + line.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="topbar">
        <div className="shell topbar-inner">
          <p>
            <Truck aria-hidden="true" />
            Despacho a todo Chile desde {SITE.city}, Chiloé
          </p>
          <div className="topbar-links">
            <a href={`mailto:${SITE.email}`}>
              <Mail aria-hidden="true" />
              {SITE.email}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="shell header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? 'is-active' : undefined}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              href="/cotizar"
              className={`quote-pill${count > 0 ? ' has-items' : ''}`}
              aria-label={`Lista de cotización: ${count} ${count === 1 ? 'producto' : 'productos'}`}
            >
              <ClipboardList aria-hidden="true" />
              <span className="quote-pill-label">Mi cotización</span>
              <span className="quote-pill-count" suppressHydrationWarning>
                {count}
              </span>
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
          <nav className="shell" aria-label="Menú móvil">
            <Link href="/">Inicio</Link>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
                {link.label}
              </Link>
            ))}
            <Link href="/cotizar" className="button button-primary">
              Ver mi cotización ({count})
            </Link>
            <a className="button button-ghost" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" /> Escribir por WhatsApp
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
