'use client';

import type { SyntheticEvent } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MedicalDigitalExperience from './MedicalDigitalExperience';
import EquipmentShowcase from './EquipmentShowcase';
import SupplyDelivery from './SupplyDelivery';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Electrocardiógrafos',
    description:
      'Registro ECG para consulta, urgencia y evaluación preventiva.',
    application: 'Registro electrocardiográfico',
    code: 'ECG',
  },
  {
    name: 'Holter ECG',
    description:
      'Registro prolongado de la actividad cardíaca durante la rutina del paciente.',
    application: 'Monitoreo ambulatorio',
    code: 'H-ECG',
  },
  {
    name: 'Holter de presión',
    description:
      'Medición ambulatoria de presión arterial para revisión clínica.',
    application: 'Presión arterial',
    code: 'MAPA',
  },
  {
    name: 'Monitores',
    description:
      'Visualización continua de parámetros en entornos de atención.',
    application: 'Seguimiento clínico',
    code: 'MON',
  },
  {
    name: 'Electrodos y cables paciente',
    description: 'Conexión y adquisición estable de señal ECG.',
    application: 'Conexión ECG',
    code: 'ECG+',
  },
  {
    name: 'Manguitos y sensores',
    description: 'Accesorios para medición, control y monitoreo de pacientes.',
    application: 'Accesorios de medición',
    code: 'NIBP',
  },
  {
    name: 'Accesorios ECG y consumibles',
    description: 'Insumos para mantener la continuidad del trabajo clínico.',
    application: 'Continuidad operativa',
    code: 'SUP',
  },
];

const navLinks = [
  ['Productos', '#productos'],
  ['Cardiología', '#cardiologia'],
  ['Nosotros', '#nosotros'],
  ['Contacto', '#cotizar'],
];

function Brand() {
  return (
    <a
      href="#inicio"
      className="brand"
      aria-label="Tecno Salud Austral, inicio"
    >
      <Image
        className="brand-logo"
        src="/images/logo-tecno-salud-austral.png"
        alt="Tecno Salud Austral SPA"
        width={180}
        height={82}
        priority
      />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () =>
      document.documentElement.classList.toggle(
        'scrolled',
        window.scrollY > 18,
      );
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Brand />
        <nav aria-label="Navegación principal">
          {navLinks.map(([name, link]) => (
            <a key={name} href={link}>
              {name}
            </a>
          ))}
        </nav>
        <a href="#cotizar" className="header-cta">
          Solicitar cotización <ArrowUpRight aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-menu ${open ? 'open' : ''}`}
      >
        {navLinks.map(([name, link]) => (
          <a key={name} href={link} onClick={() => setOpen(false)}>
            {name}
          </a>
        ))}
        <a href="#cotizar" onClick={() => setOpen(false)}>
          Solicitar cotización
        </a>
      </div>
    </header>
  );
}

export default function HomeClient() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-copygroup > *', {
            opacity: 0,
            y: 18,
            stagger: 0.08,
            duration: 0.55,
          })
          .from(
            '.hero-media',
            { opacity: 0, clipPath: 'inset(0 0 0 14%)', x: 24, duration: 0.75 },
            '-=0.4',
          );

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
              immediateRender: false,
            opacity: 0,
            y: 18,
            duration: 0.58,
            ease: 'power3.out',
          });
        });
      });
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  const submit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main ref={root}>
      <Header />

      <section id="inicio" className="hero">
        <div className="shell hero-layout">
          <div className="hero-copygroup">
            <p className="eyebrow">TECNO SALUD AUSTRAL · CHILE</p>
            <h1>Equipamiento para una cardiología bien resuelta.</h1>
            <p className="hero-copy">
              Electrocardiógrafos, monitoreo ambulatorio e insumos para
              profesionales e instituciones de salud.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#productos">
                Ver productos <ArrowDown />
              </a>
              <a className="text-button" href="#cotizar">
                Hablar con ventas <ArrowUpRight />
              </a>
            </div>
            <p className="hero-footnote">
              Orientación comercial según el uso, el entorno y la necesidad de
              cada equipo clínico.
            </p>
          </div>
          <figure className="hero-media">
            <Image
              src="/images/clinical-professional.png"
              alt="Profesional de salud revisando información en un notebook"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 48vw"
            />
            <figcaption>
              <span>Equipamiento cardiológico</span>
              <b>Consulta e instituciones</b>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="productos" className="products section">
        <div className="shell products-layout">
          <header className="products-intro" data-reveal>
            <p className="eyebrow">PRODUCTOS</p>
            <h2>Siete líneas para cubrir el trabajo cardiológico.</h2>
            <p>
              Si no tienes definido un modelo, indícanos el uso previsto.
              Revisaremos contigo la categoría adecuada.
            </p>
            <a className="text-button dark" href="#cotizar">
              Consultar disponibilidad <ArrowUpRight />
            </a>
          </header>
          <div className="catalog-list">
            {products.map((product) => (
              <article className="catalog-row" key={product.name} data-reveal>
                <span className="product-code">{product.code}</span>
                <div>
                  <p>{product.application}</p>
                  <h3>{product.name}</h3>
                </div>
                <p className="product-description">{product.description}</p>
                <a href="#cotizar" aria-label={`Consultar por ${product.name}`}>
                  <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EquipmentShowcase />

      <MedicalDigitalExperience />

      <section id="cardiologia" className="cardiology">
        <div className="shell cardiology-grid">
          <div data-reveal>
            <p className="eyebrow">CARDIOLOGÍA</p>
            <h2>Desde la captura hasta la continuidad de uso.</h2>
          </div>
          <p className="cardiology-intro" data-reveal>
            La compra no termina en el equipo. Cables, sensores, electrodos y
            consumibles forman parte del mismo flujo de trabajo.
          </p>
          <div className="clinical-areas" data-reveal>
            <p>
              <b>Registro ECG</b>
              <span>Equipos y conexión de paciente</span>
            </p>
            <p>
              <b>Monitoreo</b>
              <span>ECG y presión ambulatoria</span>
            </p>
            <p>
              <b>Operación diaria</b>
              <span>Accesorios e insumos recurrentes</span>
            </p>
          </div>
        </div>
      </section>

      <SupplyDelivery />

      <section id="nosotros" className="about section">
        <div className="shell about-grid">
          <div className="about-label" data-reveal>
            <p className="eyebrow">TECNO SALUD AUSTRAL SPA</p>
            <span>Puerto Montt · Chile</span>
          </div>
          <div className="about-copy" data-reveal>
            <h2>Una conversación comercial con contexto clínico.</h2>
            <p>
              Trabajamos con consultas e instituciones que necesitan
              equipamiento cardiológico, insumos compatibles y una respuesta
              clara sobre disponibilidad.
            </p>
            <p>
              Antes de cotizar, revisamos el escenario de uso, la frecuencia y
              el tipo de atención para orientar mejor la solicitud.
            </p>
            <a className="text-button dark" href="#cotizar">
              Conversemos sobre tu requerimiento <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section id="cotizar" className="quote">
        <div className="shell quote-grid">
          <div className="quote-heading" data-reveal>
            <p className="eyebrow">SOLICITAR COTIZACIÓN</p>
            <h2>Cuéntanos qué necesitas.</h2>
            <p>
              Con la categoría y el contexto de uso es suficiente para iniciar
              la conversación.
            </p>
            <a
              className="whatsapp-inline"
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle /> Consultar por WhatsApp <ArrowUpRight />
            </a>
          </div>
          <form className="quote-form" onSubmit={submit} data-reveal>
            {sent ? (
              <output className="form-success">
                <span>
                  <Check />
                </span>
                <h3>Solicitud recibida</h3>
                <p>
                  Gracias. Te contactaremos a través de los datos entregados.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-button dark"
                >
                  Enviar otra consulta
                </button>
              </output>
            ) : (
              <>
                <div className="form-split">
                  <label>
                    Nombre
                    <input required name="nombre" autoComplete="name" />
                  </label>
                  <label>
                    Empresa o institución
                    <input
                      required
                      name="empresa"
                      autoComplete="organization"
                    />
                  </label>
                </div>
                <div className="form-split">
                  <label>
                    Teléfono
                    <input
                      required
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                    />
                  </label>
                  <label>
                    Correo
                    <input
                      required
                      name="correo"
                      type="email"
                      autoComplete="email"
                    />
                  </label>
                </div>
                <label>
                  Producto de interés
                  <select required name="producto" defaultValue="">
                    <option value="" disabled>
                      Selecciona una categoría
                    </option>
                    {products.map(({ name }) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Mensaje
                  <textarea
                    name="mensaje"
                    rows={3}
                    placeholder="Uso previsto, cantidad u otra información relevante"
                  />
                </label>
                <button className="button button-dark" type="submit">
                  Enviar solicitud <ArrowUpRight />
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <footer id="contacto" className="footer">
        <div className="shell footer-main">
          <div>
            <Brand />
          </div>
          <div className="footer-nav">
            <p>Secciones</p>
            <a href="#productos">Productos</a>
            <a href="#cardiologia">Cardiología</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#cotizar">Contacto</a>
          </div>
          <div className="footer-contact">
            <p>Ventas y cotizaciones</p>
            <a href="#cotizar">
              Escríbenos <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>© Tecno Salud Austral SPA</p>
          <div>
            <Link href="/terminos-y-condiciones">Términos y condiciones</Link>
            <Link href="/politica-de-privacidad">Política de privacidad</Link>
            <Link className="pellet-link" href="/pellet">
              Venta de Pellet
            </Link>
          </div>
        </div>
      </footer>
      <a
        className="whatsapp-float"
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle />
      </a>
    </main>
  );
}
