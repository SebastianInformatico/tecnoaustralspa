'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
            trigger: '.delivery-scene',
            start: 'top 82%',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        });

        timeline
          .from('.delivery-background', { scale: 1.035, duration: 1.4 })
          .from('.delivery-van', { x: '-72vw', duration: 1.2 }, '-=1.1')
          .from(
            '.delivery-status',
            { opacity: 0, y: 12, duration: 0.45 },
            '-=0.15',
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

      <div className="delivery-scene" aria-hidden="true">
        <Image
          className="delivery-background"
          src="/images/medical-center-delivery.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="delivery-shade" />
        <div className="delivery-van">
          <Image
            className="delivery-van-image"
            src="/images/medical-delivery-van-final.png"
            alt=""
            width={1668}
            height={942}
            sizes="(max-width: 760px) 540px, 58vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
