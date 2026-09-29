import type { Metadata } from 'next';
import Image from 'next/image';
import { Handshake, PackageCheck, Truck, Wrench } from 'lucide-react';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import ClosingCta from '../components/site/ClosingCta';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `Tecno Salud Austral SPA: abastecimiento de equipos cardiológicos e insumos clínicos desde ${SITE.city}, Chiloé.`,
};

const PILLARS = [
  {
    icon: Handshake,
    title: 'Asesoría antes de vender',
    text: 'Preguntamos cómo trabajas antes de recomendar un equipo. Si lo que tienes sirve, te lo decimos.',
  },
  {
    icon: PackageCheck,
    title: 'Equipo e insumo juntos',
    text: 'Cotizamos el equipo con los consumibles que va a necesitar, para que no se detenga por un cable o un rollo de papel.',
  },
  {
    icon: Truck,
    title: 'Logística desde el sur',
    text: 'Coordinamos despachos a Chiloé, la Región de Los Lagos y el resto del país.',
  },
  {
    icon: Wrench,
    title: 'Seguimiento',
    text: 'Después de la entrega seguimos disponibles para reposiciones, dudas de uso y compatibilidad.',
  },
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Nosotros"
        title="Abastecimiento médico con base en Chiloé"
        lead={`${SITE.name} provee equipos cardiológicos, monitoreo e insumos clínicos a profesionales e instituciones de salud. Trabajamos desde ${SITE.city} y despachamos a todo Chile.`}
        crumbs={[{ label: 'Nosotros' }]}
      />

      <section className="section section--tight">
        <div className="shell about-grid">
          <figure className="about-media">
            <Image
              src="/images/medical-delivery-handoff.png"
              alt="Entrega de insumos médicos en un centro de salud"
              fill
              sizes="(max-width: 900px) 100vw, 560px"
            />
          </figure>
          <div className="about-copy">
            <h2>Un proveedor que conoce la realidad del sur.</h2>
            <p>
              Abastecer una consulta en Castro, una posta rural o un hospital regional no es lo mismo que hacerlo en
              Santiago. Los tiempos de despacho, la continuidad de insumos y la compatibilidad con los equipos que ya
              existen importan tanto como el precio.
            </p>
            <p>
              Por eso trabajamos por cotización: revisamos cada pedido, proponemos alternativas cuando algo no está
              disponible y coordinamos la entrega directamente contigo.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <header className="section-head">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2>Cuatro compromisos con cada cliente.</h2>
          </header>
          <div className="pillar-grid">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <article key={title} className="pillar">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta title="¿Conversamos sobre tu próximo pedido?" />
    </SiteFrame>
  );
}
