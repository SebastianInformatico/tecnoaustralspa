import type { Metadata } from 'next';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de privacidad',
};

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <PageIntro title="Política de privacidad" crumbs={[{ label: 'Política de privacidad' }]} />
      <section className="section section--tight">
        <div className="shell prose">
          <h2>Uso de datos de contacto</h2>
          <p>
            Los datos entregados en las solicitudes de cotización y contacto se utilizan para responder consultas
            comerciales y gestionar el contacto solicitado.
          </p>
          <h2>Datos enviados</h2>
          <p>
            El usuario entrega sus datos de forma voluntaria. La lista de cotización se guarda solo en tu navegador
            hasta que envías la solicitud.
          </p>
          <h2>Consultas</h2>
          <p>
            Para consultas sobre el tratamiento de tu información escríbenos a{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </section>
    </SiteFrame>
  );
}
