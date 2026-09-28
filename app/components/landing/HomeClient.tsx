'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Truck,
  PhoneCall,
  X,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MedicalDigitalExperience from './MedicalDigitalExperience';
import EquipmentShowcase from './EquipmentShowcase';
import CardiologyInteractive from './CardiologyInteractive';
import MiniSupplyCarousel from './MiniSupplyCarousel';
import SupplyDelivery from './SupplyDelivery';
import { COMPANY_INFO } from '@/lib/constants';

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

const navLinks: [string, string][] = [
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
  const [activeSection, setActiveSection] = useState('#inicio');

  useEffect(() => {
    const updateHeader = () => {
      document.documentElement.classList.toggle(
        'scrolled',
        window.scrollY > 24,
      );

      // ScrollSpy: detectar sección visible
      const sections = ['inicio', 'productos', 'cardiologia', 'nosotros', 'cotizar'];
      const scrollPos = window.scrollY + 140;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

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
            <a
              key={name}
              href={link}
              className={activeSection === link ? 'active' : ''}
            >
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
          <a
            key={name}
            href={link}
            onClick={() => setOpen(false)}
            className={activeSection === link ? 'active' : ''}
          >
            {name}
          </a>
        ))}
        <a href="#cotizar" className="mobile-cta-button" onClick={() => setOpen(false)}>
          Solicitar cotización <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

export default function HomeClient() {
  const root = useRef<HTMLElement>(null);
  const loadedAt = useRef(Date.now());
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-reveal', {
            opacity: 0,
            x: -46,
            y: 8,
            stagger: 0.11,
            duration: 0.78,
            ease: 'power4.out',
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

        gsap.utils.toArray<HTMLElement>('[data-mask-reveal]').forEach((element) => {
          gsap.from(element.querySelectorAll<HTMLElement>('.quote-mask > *'), {
            yPercent: 110,
            opacity: 0,
            stagger: 0.12,
            duration: 0.78,
            ease: 'power4.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          });
        });

        gsap.fromTo(
          '.about-transform-arrow',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.about-transformation', start: 'top 78%', once: true },
          },
        );

        gsap.from('.about-transform-step', {
          opacity: 0,
          y: 16,
          stagger: 0.18,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-transformation', start: 'top 78%', once: true },
        });
      });
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  const submit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    setSending(true);
    setError('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error || 'No fue posible enviar la solicitud.');
      setSent(true);
      form.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'No fue posible enviar la solicitud.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main ref={root}>
      <Header />

      <section id="inicio" className="hero">
        <div className="shell hero-layout">
          <div className="hero-copygroup">
            <p className="eyebrow hero-reveal">TECNO SALUD AUSTRAL · CHILE</p>
            <h1 className="hero-reveal">Su socio estratégico de abastecimiento médico.</h1>
            <p className="hero-copy hero-reveal">
              Electrocardiógrafos, monitoreo ambulatorio e insumos para
              profesionales e instituciones de salud.
            </p>
            <div className="hero-actions hero-reveal">
              <a className="button button-primary" href="#productos">
                Ver productos <ArrowDown />
              </a>
              <a className="text-button" href="#cotizar">
                Hablar con ventas <ArrowUpRight />
              </a>
            </div>
            <p className="hero-footnote hero-reveal">
              Orientación comercial según el uso, el entorno y la necesidad de
              cada equipo clínico.
            </p>
          </div>
          <figure className="hero-media">
            <div className="hero-carousel" aria-label="Imágenes de Tecno Salud Austral">
              <Image src="/images/clinical-professional.png" alt="Profesional de salud revisando información en un notebook" fill priority sizes="(max-width: 860px) 100vw, 48vw" />
              <Image src="/images/medical-supplies-general.png" alt="Insumos médicos organizados" fill sizes="(max-width: 860px) 100vw, 48vw" />
            <div className="hero-carousel-dots" aria-hidden="true"><i /><i /></div>
            </div>
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
            <div className="hero-product-carousel" aria-label="Nuestros productos destacados">
              <div className="hero-product-carousel-head">
                <strong>Nuestros productos</strong>
                <a href="#productos">Ver todo <ArrowUpRight aria-hidden="true" /></a>
              </div>
              <div className="hero-product-track">
                <a href="#cotizar" className="hero-product-card">
                  <span><Image src="/images/electrocardiograph.webp" alt="" width={90} height={70} /></span>
                  <b>Electrocardiógrafos</b>
                  <small>Ver más <ArrowUpRight aria-hidden="true" /></small>
                </a>
                <a href="#cotizar" className="hero-product-card">
                  <span><Image src="/images/holter-kit.webp" alt="" width={90} height={70} /></span>
                  <b>Monitoreo ambulatorio</b>
                  <small>Ver más <ArrowUpRight aria-hidden="true" /></small>
                </a>
                <a href="#cotizar" className="hero-product-card">
                  <span><Image src="/images/medical-supplies-general.png" alt="" width={90} height={70} /></span>
                  <b>Insumos médicos</b>
                  <small>Ver más <ArrowUpRight aria-hidden="true" /></small>
                </a>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <MiniSupplyCarousel />

      <section id="productos" className="products section">
        <div className="shell products-layout">
          <header className="products-intro" data-reveal>
            <p className="eyebrow">PRODUCTOS</p>
            <h2>Siete líneas para cubrir el trabajo cardiológico.</h2>
            <p>
              Si no tienes definido un modelo, indícanos el uso previsto.
              Revisaremos contigo la categoría adecuada.
            </p>
            <a className="products-availability-button" href="#cotizar">
              Consultar disponibilidad <ArrowUpRight />
            </a>
            <figure className="products-intro-image" data-reveal>
              <Image
                src="/images/clinical-supplies.png"
                alt="Insumos médicos para evaluación clínica"
                fill
                sizes="(max-width: 760px) 100vw, 300px"
              />
            </figure>
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

      <CardiologyInteractive />
      <section className="cardiology legacy-cardiology">
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

      <section id="nosotros" className="about about-van section" aria-label="Tecno Salud Austral en ruta">
        <div className="shell about-van-shell">
          <figure className="about-van-frame" data-reveal>
            <Image
              src="/images/medical-delivery-handoff.png"
              alt="Profesional de salud recibiendo un pedido médico"
              fill
              sizes="(max-width: 760px) 100vw, 1180px"
            />
            <div className="about-van-shade" />
            <div className="about-delivery-badge">ENTREGA EN CONTEXTO CLÍNICO</div>
            <div className="about-delivery-card" data-reveal>
              <span>SUMINISTRO MÉDICO</span>
              <strong>Del pedido a la atención, con respaldo en cada entrega.</strong>
              <div className="about-delivery-meta">
                <i />
                <small>Coordinación · Compatibilidad · Seguimiento</small>
              </div>
            </div>
          </figure>
          <div className="about-service-strip" aria-label="Servicios de Tecno Salud Austral">
            <article data-reveal>
              <Truck aria-hidden="true" />
              <div><strong>Despachamos a todo Chile</strong><span>Coordinación clara y seguimiento</span></div>
            </article>
            <article data-reveal>
              <PackageCheck aria-hidden="true" />
              <div><strong>Insumos compatibles</strong><span>Equipos y accesorios en un mismo flujo</span></div>
            </article>
            <article data-reveal>
              <MessageCircle aria-hidden="true" />
              <div><strong>Orientación especializada</strong><span>Te ayudamos a elegir lo necesario</span></div>
            </article>
          </div>
        </div>
      </section>

      <section id="cotizar" className="quote">
        <div className="shell quote-grid">
          <div className="quote-heading" data-mask-reveal>
            <div className="quote-mask">
              <p className="eyebrow">SOLICITAR COTIZACIÓN</p>
            </div>
            <div className="quote-mask">
              <h2>Cuéntanos qué necesitas.</h2>
            </div>
            <div className="quote-mask">
              <p>
                Con la categoría y el contexto de uso es suficiente para iniciar
                la conversación.
              </p>
            </div>
            <a
              className="whatsapp-inline"
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PhoneCall /> Consultar por WhatsApp <ArrowUpRight />
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
                <input type="hidden" name="ts" value={loadedAt.current} readOnly />
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                  }}
                >
                  <label>
                    No completar este campo
                    <input
                      type="text"
                      name="sitio_web"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>
                <div className="form-split">
                  <label>
                    Nombre
                    <input
                      required
                      name="nombre"
                      autoComplete="name"
                      maxLength={100}
                      placeholder="Tu nombre completo"
                    />
                  </label>
                  <label>
                    Empresa o institución
                    <input
                      required
                      name="empresa"
                      autoComplete="organization"
                      maxLength={120}
                      placeholder="Centro médico, clínica, etc."
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
                      maxLength={20}
                      pattern="[+]?[0-9\s\-()]{7,20}"
                      title="Ingresa un número telefónico válido (ej: +56 9 1234 5678)"
                      placeholder="+56 9 1234 5678"
                    />
                  </label>
                  <label>
                    Correo
                    <input
                      required
                      name="correo"
                      type="email"
                      autoComplete="email"
                      maxLength={100}
                      placeholder="nombre@ejemplo.cl"
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
                    maxLength={1000}
                    placeholder="Uso previsto, cantidad u otra información relevante"
                  />
                </label>
                {error && <p role="alert" className="form-error">{error}</p>}
                <button className="button button-dark" type="submit" disabled={sending}>
                  {sending ? 'Enviando…' : 'Enviar solicitud'} <ArrowUpRight />
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <footer id="contacto" className="footer">
        <div className="shell footer-main">
          <div className="footer-ecg-brand" aria-label="Suministro clínico activo">
            <svg viewBox="0 0 320 72" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 38h72l14-1 15-20 17 39 18-55 21 58 18-28 14 8h64l14-1 15-17 17 35 18-24 16 7h7" />
            </svg>
          </div>
          <div className="footer-nav">
            <p>Secciones</p>
            <a href="#productos">Productos</a>
            <a href="#cardiologia">Cardiología</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#cotizar">Contacto</a>
          </div>
          <div className="footer-contact">
            <p>Contacto y cotizaciones</p>
            <a className="footer-contact-email" href="mailto:ramonmaldonado@tecnosalud.cl">
              <Mail aria-hidden="true" />
              <span>ramonmaldonado@tecnosalud.cl</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="footer-address">
              <MapPin aria-hidden="true" />
              <span>Pje Canal Trinidad 2 Villa Guarello, Castro</span>
            </div>
          </div>
        </div>
        <div className="shell footer-medical-strip">
          <div className="footer-medical-copy">
            <span>Cardiología · Suministro clínico</span>
            <strong>Equipamiento que sigue el ritmo de tu atención.</strong>
          </div>
          <div className="footer-ecg" aria-hidden="true">
            <i />
            <svg viewBox="0 0 520 72" preserveAspectRatio="none">
              <path d="M0 37h92l18-1 13-24 18 50 19-77 23 77 17-34 13 9h82l17-1 14-16 18 34 18-24 17 7h81" />
            </svg>
            <span>ECG / READY</span>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>© Tecno Salud Austral SPA · Todos los derechos reservados</p>
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
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle />
      </a>
    </main>
  );
}
