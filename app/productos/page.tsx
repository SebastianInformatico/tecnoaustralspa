import type { Metadata } from 'next';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import ClosingCta from '../components/site/ClosingCta';
import CatalogBrowser from '../components/catalog/CatalogBrowser';

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Catálogo de electrocardiógrafos, Holter ECG, Holter de presión, monitores de paciente, electrodos, cables, manguitos, sensores y consumibles.',
};

export default function ProductsPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Catálogo"
        title="Productos"
        lead="Agrega a tu cotización las líneas que necesitas. Te respondemos con modelos disponibles, alternativas y valores según tu uso."
        crumbs={[{ label: 'Productos' }]}
      />
      <section className="section section--tight">
        <div className="shell">
          <CatalogBrowser />
        </div>
      </section>
      <ClosingCta />
    </SiteFrame>
  );
}
