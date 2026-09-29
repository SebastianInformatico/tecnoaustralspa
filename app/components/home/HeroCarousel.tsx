'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from '../site/BrandIcons';
import { SITE, whatsappUrl } from '@/lib/site';

interface AsideItem {
  title: string;
  text: string;
  href?: string;
}

interface Slide {
  kicker: string;
  title: [string, string, string?]; // [antes, destacado, después]
  text: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  aside: AsideItem[];
  tone?: 'green';
}

const SLIDES: Slide[] = [
  {
    kicker: 'Equipos médicos',
    title: ['Equipos de ', 'cardiología', ' y monitoreo'],
    text: 'Electrocardiógrafos, Holter y monitores de paciente para consultas, centros médicos, clínicas y hospitales.',
    primary: { label: 'Ver equipos', href: '/productos?familia=equipos' },
    secondary: { label: 'Cotizar', href: '/cotizar' },
    aside: [
      { title: 'Electrocardiógrafos', text: 'Registro ECG en reposo', href: '/productos/electrocardiografos' },
      { title: 'Holter ECG', text: 'Monitoreo ambulatorio', href: '/productos/holter-ecg' },
      { title: 'Monitores de paciente', text: 'Signos vitales en tiempo real', href: '/productos/monitores' },
    ],
  },
  {
    kicker: 'Insumos y accesorios',
    title: ['Insumos ', 'compatibles', ' con tu equipo'],
    text: 'Electrodos, cables paciente, manguitos, sensores y papel de registro. Indícanos la marca y el modelo de tu equipo.',
    primary: { label: 'Ver insumos', href: '/productos?familia=insumos' },
    secondary: { label: 'Cotizar', href: '/cotizar' },
    aside: [
      { title: 'Electrodos y cables', text: 'Para ECG, Holter y monitores', href: '/productos/electrodos-y-cables' },
      { title: 'Manguitos y sensores', text: 'Presión, SpO₂ y temperatura', href: '/productos/manguitos-y-sensores' },
      { title: 'Accesorios y consumibles', text: 'Papel, gel y baterías', href: '/productos/accesorios-ecg' },
    ],
  },
  {
    kicker: 'Despacho nacional',
    title: ['Desde ', SITE.city, ' a todo Chile'],
    text: 'Cotiza en línea y te respondemos por correo con valores, disponibilidad y plazo de entrega a tu región.',
    primary: { label: 'Armar mi cotización', href: '/cotizar' },
    secondary: { label: 'Contacto', href: '/contacto' },
    aside: [
      { title: 'Casa matriz en Castro', text: 'Chiloé, Región de Los Lagos' },
      { title: 'Despacho coordinado', text: 'A cualquier región del país' },
      { title: 'Cotización formal', text: 'Respuesta por correo' },
    ],
  },
  {
    kicker: 'Atención directa',
    title: ['Cotiza por ', 'WhatsApp'],
    text: `Escríbenos al ${SITE.phoneDisplay} y te atendemos directamente, sin formularios.`,
    primary: { label: 'Escribir por WhatsApp', href: whatsappUrl(), external: true },
    secondary: { label: 'Ver productos', href: '/productos' },
    aside: [
      { title: SITE.phoneDisplay, text: 'Ventas y cotizaciones' },
      { title: 'Consultas de compatibilidad', text: 'Envíanos marca y modelo' },
      { title: 'Seguimiento de pedidos', text: 'Te avisamos del despacho' },
    ],
    tone: 'green',
  },
];

const INTERVAL = 7000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = SLIDES.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, go]);

  return (
    <section
      className={`hero-carousel${paused ? ' is-paused' : ''}`}
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
      <div className="hero-slides">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          const [before, highlight, after] = slide.title;
          const Heading = i === 0 ? 'h1' : 'h2';
          return (
            <div
              key={slide.kicker}
              className={`hero-slide${active ? ' is-active' : ''}${slide.tone ? ` hero-slide--${slide.tone}` : ''}`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${count}`}
              aria-hidden={!active}
              inert={!active ? true : undefined}
            >
              <div className="hero-bg" aria-hidden="true">
                <span className="hero-bg-mark" />
              </div>
              <div className="shell hero-slide-inner">
                <div className="hero-copy">
                  <p className="hero-kicker anim" style={{ '--d': '0.1s' } as React.CSSProperties}>
                    {slide.kicker}
                  </p>
                  <Heading className="anim" style={{ '--d': '0.22s' } as React.CSSProperties}>
                    {before}
                    <em>{highlight}</em>
                    {after}
                  </Heading>
                  <p className="hero-text anim" style={{ '--d': '0.36s' } as React.CSSProperties}>
                    {slide.text}
                  </p>
                  <div className="hero-actions anim" style={{ '--d': '0.5s' } as React.CSSProperties}>
                    {slide.primary.external ? (
                      <a className="hero-btn hero-btn--primary" href={slide.primary.href} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon aria-hidden="true" /> {slide.primary.label}
                      </a>
                    ) : (
                      <Link className="hero-btn hero-btn--primary" href={slide.primary.href}>
                        {slide.primary.label}
                      </Link>
                    )}
                    {slide.secondary && (
                      <Link className="hero-btn hero-btn--dark" href={slide.secondary.href}>
                        {slide.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>

                <ul className="hero-aside" aria-label="Destacados de esta sección">
                  {slide.aside.map((item, n) => {
                    const body = (
                      <>
                        <span className="hero-aside-icon">
                          <Check aria-hidden="true" />
                        </span>
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.text}</small>
                        </span>
                      </>
                    );
                    return (
                      <li key={item.title} className="anim-side" style={{ ['--d' as string]: `${0.35 + n * 0.14}s` }}>
                        {item.href ? <Link href={item.href}>{body}</Link> : <div>{body}</div>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shell hero-controls">
        <span className="hero-counter" aria-hidden="true">
          <b>{String(index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
        </span>
        <div className="hero-dots">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.kicker}
              type="button"
              className={i === index ? 'is-active' : undefined}
              aria-label={`Ir a la diapositiva ${i + 1}: ${slide.kicker}`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="hero-arrows">
          <button type="button" onClick={() => go(index - 1)} aria-label="Anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Siguiente">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      {!reduced && (
        <div className="hero-progress" aria-hidden="true">
          <span key={index} style={{ animationDuration: `${INTERVAL}ms` }} />
        </div>
      )}
    </section>
  );
}
