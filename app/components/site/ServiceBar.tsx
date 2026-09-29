import { Building2, FileText, Truck } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { SITE } from '@/lib/site';

const SERVICES = [
  { icon: Truck, title: 'Despacho a todo Chile', text: 'Envío coordinado desde Castro' },
  { icon: FileText, title: 'Cotización formal', text: 'Respuesta por correo con valores' },
  { icon: Building2, title: 'Compras institucionales', text: 'Clínicas, CESFAM y hospitales' },
  { icon: WhatsAppIcon, title: 'Atención por WhatsApp', text: SITE.phoneDisplay },
];

export default function ServiceBar() {
  return (
    <section className="service-bar" aria-label="Servicios">
      <div className="shell service-bar-grid">
        {SERVICES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="service-item">
            <Icon aria-hidden="true" />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
