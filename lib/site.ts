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
  whatsappNumber: '56933583057',
  phoneDisplay: '+56 9 3358 3057',
} as const;

export const hasRealPhone = !/^569?0+$/.test(SITE.whatsappNumber);

/**
 * Redes sociales. Mientras la URL esté vacía el logo se muestra sin enlace.
 * Al crear las cuentas, pega aquí la dirección del perfil.
 */
export const SOCIAL = {
  instagram: '',
  facebook: '',
} as const;

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
