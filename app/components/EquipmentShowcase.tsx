'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredEquipment = [
  {
    code: '01 / ECG',
    title: 'Captura de 12 derivaciones',
    description: 'Registro clínico con impresión y conexión de paciente.',
    image: '/images/electrocardiograph.webp',
    imageWidth: 1024,
    imageHeight: 1536,
    className: 'equipment-card-tall',
  },
  {
    code: '02 / HOLTER',
    title: 'Monitoreo ambulatorio',
    description: 'Registro compacto para acompañar la rutina del paciente.',
    image: '/images/holter-kit.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    className: 'equipment-card-wide',
  },
  {
    code: '03 / MONITOR',
    title: 'Seguimiento multiparámetro',
    description: 'Lectura continua para entornos de atención clínica.',
    image: '/images/patient-monitor.webp',
    imageWidth: 1024,
    imageHeight: 1536,
    className: 'equipment-card-tall',
  },
];

export default function EquipmentShowcase() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!section.current) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.equipment-card', {
          scrollTrigger: {
            trigger: '.equipment-track',
            start: 'top 84%',
            once: true,
          },
          opacity: 0,
          y: 34,
          stagger: 0.12,
          duration: 0.72,
          ease: 'power3.out',
        });

        media.add('(min-width: 761px)', () => {
          gsap.fromTo(
            '.equipment-track',
            { xPercent: 2.5 },
            {
              xPercent: -2.5,
              ease: 'none',
              scrollTrigger: {
                trigger: section.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          );
        });

        gsap.fromTo(
          '.signal-path',
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.equipment-signal',
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    }, section);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      className="equipment-showcase"
      ref={section}
      aria-labelledby="equipment-showcase-title"
    >
      <header className="shell equipment-showcase-heading">
        <div data-reveal>
          <p className="eyebrow">EQUIPAMIENTO EN CONTEXTO</p>
          <h2 id="equipment-showcase-title">
            Tecnología clínica que se entiende a primera vista.
          </h2>
        </div>
        <p data-reveal>
          Tres formatos de trabajo: captura, registro ambulatorio y seguimiento
          continuo.
        </p>
      </header>

      <div className="equipment-viewport">
        <div className="equipment-track">
          {featuredEquipment.map((equipment) => (
            <article
              className={`equipment-card ${equipment.className}`}
              key={equipment.code}
            >
              <div className="equipment-card-media">
                <Image
                  src={equipment.image}
                  alt=""
                  width={equipment.imageWidth}
                  height={equipment.imageHeight}
                  sizes="(max-width: 760px) 76vw, 34vw"
                />
              </div>
              <div className="equipment-card-copy">
                <span>{equipment.code}</span>
                <div>
                  <h3>{equipment.title}</h3>
                  <p>{equipment.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell equipment-signal" aria-hidden="true">
        <span>SEÑAL CARDÍACA</span>
        <svg viewBox="0 0 1000 72" preserveAspectRatio="none">
          <path
            className="signal-path"
            pathLength="1"
            d="M0 38H118L140 36L154 39L169 37H264L279 34L292 40L309 38H394L414 37L426 12L440 62L456 25L472 38H584L603 35L618 40L634 37H729L746 36L758 17L773 58L790 29L807 38H1000"
          />
        </svg>
        <span>CAPTURA · MONITOREO · CONTINUIDAD</span>
      </div>
    </section>
  );
}
