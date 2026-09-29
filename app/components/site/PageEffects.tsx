'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, X } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappUrl } from '@/lib/site';

const BUBBLE_KEY = 'tsa-wa-bubble-closed';

/**
 * Efectos globales de la página:
 * - Animación de entrada (fade-in-up) de los elementos con clase .reveal.
 * - Botón "volver arriba".
 * - Botón flotante de WhatsApp con globo de ayuda.
 */
export default function PageEffects() {
  const [showTop, setShowTop] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let closed = false;
    try {
      closed = window.sessionStorage.getItem(BUBBLE_KEY) === '1';
    } catch {
      /* sin almacenamiento: se muestra igual */
    }
    if (closed) return;
    const id = window.setTimeout(() => setBubble(true), 4000);
    return () => window.clearTimeout(id);
  }, []);

  const closeBubble = () => {
    setBubble(false);
    try {
      window.sessionStorage.setItem(BUBBLE_KEY, '1');
    } catch {
      /* ignorar */
    }
  };

  return (
    <>
      <button
        type="button"
        className={`scroll-top${showTop && !bubble ? ' is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        tabIndex={showTop && !bubble ? 0 : -1}
      >
        <ArrowUp aria-hidden="true" />
      </button>

      <div className="wa-widget">
        {bubble && (
          <div className="wa-bubble" role="status">
            <button type="button" className="wa-bubble-close" onClick={closeBubble} aria-label="Cerrar mensaje">
              <X aria-hidden="true" />
            </button>
            <strong>¿Necesitas ayuda?</strong>
            <span>Escríbenos y te ayudamos con tu cotización.</span>
          </div>
        )}
        <a
          className="whatsapp-float"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          onClick={closeBubble}
        >
          <WhatsAppIcon aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
