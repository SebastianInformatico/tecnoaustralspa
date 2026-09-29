import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: `${SITE.name}: venta de equipos de cardiología, monitoreo e insumos clínicos desde ${SITE.city}, Chiloé.`,
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <PageIntro title="Nosotros" crumbs={[{ label: 'Nosotros' }]} />
      <div className="shell page-body">
        <div className="about-layout">
          <div className="prose">
            <p className="prose-lead">
              {SITE.name} es una empresa de {SITE.city}, Chiloé, dedicada a la venta de equipos de cardiología,
              monitoreo de pacientes e insumos clínicos.
            </p>
            <h2>Qué vendemos</h2>
            <p>
              Electrocardiógrafos, Holter ECG, Holter de presión, monitores de paciente y los insumos que estos equipos
              necesitan en el día a día: electrodos, cables paciente, manguitos, sensores, papel de registro y otros
              consumibles.
            </p>
            <h2>A quién atendemos</h2>
            <p>
              Consultas particulares, centros médicos, clínicas, centros de salud primaria y hospitales. Para compras
              institucionales enviamos cotización formal por correo.
            </p>
            <h2>Cómo trabajamos</h2>
            <p>
              Vendemos por cotización. Revisamos cada solicitud, confirmamos compatibilidad con el equipo del cliente y
              enviamos valores, disponibilidad y plazo de despacho. Despachamos a todas las regiones del país.
            </p>
          </div>

          <aside className="about-card">
            <h2>Datos de la empresa</h2>
            <dl>
              <dt>Razón social</dt>
              <dd>{SITE.name}</dd>
              <dt>Dirección</dt>
              <dd>{SITE.address}</dd>
              <dt>Región</dt>
              <dd>{SITE.region}</dd>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </dd>
            </dl>
            <Link href="/contacto" className="button button-primary button-block">
              Contactar
            </Link>
          </aside>
        </div>
      </div>
    </SiteFrame>
  );
}
