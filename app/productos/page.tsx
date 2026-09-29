import type { Metadata } from 'next';
import SiteFrame from '../components/site/SiteFrame';
import PageIntro from '../components/site/PageIntro';
import CatalogBrowser from '../components/catalog/CatalogBrowser';

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Electrocardiógrafos, Holter ECG, Holter de presión, monitores de paciente, electrodos, cables, manguitos, sensores y consumibles.',
};

export default function ProductsPage() {
  return (
    <SiteFrame>
      <PageIntro title="Productos" crumbs={[{ label: 'Productos' }]} />
      <div className="shell page-body">
        <CatalogBrowser />
      </div>
    </SiteFrame>
  );
}
