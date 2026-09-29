'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '../site/BrandIcons';
import { SITE, whatsappUrl } from '@/lib/site';

interface Slide {
  kicker: string;
  title: string;
  text: string;
  cta: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  tone: 'navy' | 'blue' | 'deep' | 'green';
}

const SLIDES: Slide[] = [
  {
    kicker: 'Equipos médicos',
    title: 'Electrocardiógrafos, Holter y monitores de paciente',
    text: 'Equipamiento para consultas, centros médicos, clínicas y hospitales. Te enviamos las opciones disponibles con su ficha técnica.',
    cta: { label: 'Ver equipos', href: '/productos?familia=equipos' },
    secondary: { label: 'Solicitar cotización', href: '/cotizar' },
    tone: 'navy',
  },
  {
    kicker: 'Insumos y accesorios',
    title: 'Insumos compatibles con tu equipo',
    text: 'Electrodos, cables paciente, manguitos, sensores, papel de registro y consumibles. Indícanos la marca y modelo de tu equipo.',
    cta: { label: 'Ver insumos', href: '/productos?familia=insumos' },
    tone: 'blue',
  },
  {
    kicker: 'Despacho nacional',
    title: `Despachamos a todo Chile desde ${SITE.city}`,
    text: 'Arma tu cotización en línea y te respondemos por correo con valores, disponibilidad y plazo de entrega.',
    cta: { label: 'Armar mi cotización', href: '/cotizar' },
    tone: 'deep',
  },
  {
    kicker: 'Atención directa',
    title: 'Cotiza por WhatsApp',
    text: `Escríbenos al ${SITE.phoneDisplay} y te atendemos directamente.`,
    cta: { label: 'Escribir por WhatsApp', href: whatsappUrl(), external: true },
    tone: 'green',
  },
];

const INTERVAL = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = SLIDES.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  return (
    <section
      className="hero-carousel"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(index - 1);
        if (event.key === 'ArrowRight') go(index + 1);
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            className={`hero-slide hero-slide--${slide.tone}`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${count}`}
            aria-hidden={i !== index}
            inert={i !== index ? true : undefined}
          >
            <div className="shell hero-slide-inner">
              <p className="hero-kicker">{slide.kicker}</p>
              {i === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
              <p className="hero-text">{slide.text}</p>
              <div className="hero-actions">
                {slide.cta.external ? (
                  <a className="button button-light" href={slide.cta.href} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon aria-hidden="true" /> {slide.cta.label}
                  </a>
                ) : (
                  <Link className="button button-light" href={slide.cta.href}>
                    {slide.cta.label}
                  </Link>
                )}
                {slide.secondary && (
                  <Link className="button button-outline-light" href={slide.secondary.href}>
                    {slide.secondary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="hero-arrow hero-arrow--prev" onClick={() => go(index - 1)} aria-label="Anterior">
        <ChevronLeft aria-hidden="true" />
      </button>
      <button type="button" className="hero-arrow hero-arrow--next" onClick={() => go(index + 1)} aria-label="Siguiente">
        <ChevronRight aria-hidden="true" />
      </button>

      <div className="hero-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            className={i === index ? 'is-active' : undefined}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
