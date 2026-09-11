'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  ClipboardList,
  MapPin,
  Package,
  Truck,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SupplyDelivery() {
  const section = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (!section.current) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.delivery-process',
            start: 'top 82%',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        });

        timeline
          .from('.delivery-process-step', { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 });
      });
    }, section);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      id="abastecimiento"
      className="supply-delivery"
      ref={section}
      aria-labelledby="delivery-title"
    >
      <div className="shell delivery-heading">
        <div data-reveal>
          <p className="eyebrow">ABASTECIMIENTO MÉDICO</p>
          <h2 id="delivery-title">Del requerimiento a la entrega.</h2>
        </div>
        <div data-reveal>
          <p className="supply-slogan">
            Su socio estratégico de abastecimiento médico
          </p>
          <p>
            Coordinamos equipamiento e insumos para que cada solicitud avance
            con información clara.
          </p>
          <a className="text-button" href="#cotizar">
            Coordinar una cotización <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="shell delivery-process" aria-label="Etapas del abastecimiento médico">
        <div className="delivery-process-step">
          <span className="delivery-process-icon"><ClipboardList /></span>
          <span><b>01</b><strong>Solicitud recibida</strong><small>Entendemos tu necesidad</small></span>
        </div>
        <div className="delivery-process-line" aria-hidden="true" />
        <div className="delivery-process-step">
          <span className="delivery-process-icon"><Package /></span>
          <span><b>02</b><strong>Preparación de pedido</strong><small>Ordenamos la solución</small></span>
        </div>
        <div className="delivery-process-line" aria-hidden="true" />
        <div className="delivery-process-step">
          <span className="delivery-process-icon"><Truck /></span>
          <span><b>03</b><strong>Despacho en ruta</strong><small>Coordinamos la entrega</small></span>
        </div>
        <div className="delivery-process-line" aria-hidden="true" />
        <div className="delivery-process-step">
          <span className="delivery-process-icon"><MapPin /></span>
          <span><b>04</b><strong>Entrega confirmada</strong><small>Continuidad para tu equipo</small></span>
        </div>
      </div>

      <div className="shell delivery-support" data-reveal>
        <div className="delivery-support-copy">
          <p className="eyebrow">PREPARACIÓN CON CONTEXTO</p>
          <h3>Detrás de cada entrega hay una revisión precisa.</h3>
          <p>
            Revisamos disponibilidad, compatibilidad y escenario de uso para
            que el equipamiento llegue listo para acompañar el trabajo clínico.
          </p>
        </div>
        <div className="delivery-support-media">
          <Image
            src="/images/medical-supply-specialist.png"
            alt="Especialista revisando insumos médicos en una bodega"
            width={1024}
            height={1536}
            sizes="(max-width: 760px) 100vw, 360px"
          />
          <span>CONTROL DE INVENTARIO · EN CURSO</span>
        </div>
      </div>

      <div className="supply-transition" aria-label="Estado del abastecimiento">
        <div className="supply-transition-track">
          <span>DISPONIBILIDAD CONFIRMADA</span>
          <i />
          <span>COMPATIBILIDAD REVISADA</span>
          <i />
          <span>ENTREGA COORDINADA</span>
          <i />
          <span>DISPONIBILIDAD CONFIRMADA</span>
          <i />
          <span>COMPATIBILIDAD REVISADA</span>
        </div>
        <svg viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 38H160l18-1 16-22 20 45 20-68 22 68 18-31 16 9h190l18-1 16-19 19 37 19-25 18 8h190l20-1 17-21 20 39 18-27 20 9h180l18-1 18-20 19 38 18-25 18 8h180" />
        </svg>
      </div>

    </section>
  );
}
