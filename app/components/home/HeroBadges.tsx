import { Building2, FileText, Truck } from 'lucide-react';
import { WhatsAppIcon } from '../site/BrandIcons';
import { SITE } from '@/lib/site';

const BADGES = [
  { icon: Truck, title: 'Despacho a todo Chile', text: `Enviamos desde ${SITE.city} a cualquier región.` },
  { icon: FileText, title: 'Cotización formal', text: 'Valores y disponibilidad por correo.' },
  { icon: Building2, title: 'Compras institucionales', text: 'Clínicas, CESFAM y hospitales.' },
  { icon: WhatsAppIcon, title: 'Atención por WhatsApp', text: SITE.phoneDisplay },
];

/** Franja de beneficios bajo el carrusel. */
export default function HeroBadges() {
  return (
    <section className="hero-badges" aria-label="Beneficios">
      <div className="shell hero-badges-grid">
        {BADGES.map(({ icon: Icon, title, text }, index) => (
          <div key={title} className="hero-badge reveal" style={{ transitionDelay: `${index * 80}ms` }}>
            <span className="hero-badge-icon">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
