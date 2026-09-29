/**
 * Datos de la empresa. Es la única fuente: header, footer, contacto,
 * formularios y el documento de cotización leen desde aquí.
 */
export const SITE = {
  name: 'Tecno Salud Austral SPA',
  shortName: 'Tecno Salud Austral',
  tagline: 'Su socio estratégico de abastecimiento médico',
  url: 'https://tecnosaludaustral.cl',
  city: 'Castro',
  region: 'Chiloé, Región de Los Lagos',
  address: 'Pje. Canal Trinidad 2, Villa Guarello, Castro',
  email: 'ramonmaldonado@tecnosalud.cl',
  // TODO: reemplazar por el número real (formato internacional sin +).
  whatsappNumber: '56900000000',
  phoneDisplay: '+56 9 0000 0000',
} as const;

export const hasRealPhone = !/^569?0+$/.test(SITE.whatsappNumber);

export function whatsappUrl(
  message = 'Hola, me gustaría solicitar información y cotización sobre sus equipos e insumos.',
) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: '/productos', label: 'Productos' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
] as const;
